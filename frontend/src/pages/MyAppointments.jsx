import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import ChatModal from '../components/ChatModal'
import PrescriptionCard from '../components/PrescriptionCard'
import { ChatContext } from '../context/ChatContext'
import { useTranslation } from 'react-i18next'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [chatAppointment, setChatAppointment] = useState(null)
  const { messages, setMessages } = useContext(ChatContext)
  const [appointments, setAppointments] = useState([])
  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const [orderDetails, setOrderDetails] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const { t, i18n } = useTranslation()

  // Format tanggal slot
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    const date = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`)
    return date.toLocaleDateString(i18n.language, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  // Ambil daftar janji temu pengguna
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Membatalkan janji temu
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Menangani pembayaran
  const handlePayment = async (appointmentId) => {
    try {
      console.log("Current token:", token);
      console.log("Attempting payment for appointmentId:", appointmentId);
      const resCalc = await axios.get(`${backendUrl}/api/user/payment/calculate/${appointmentId}`, {
        headers: { token },
      })
      if (resCalc.data.success) {
        const total = resCalc.data.details.total;
        const response = await axios.post(
          `${backendUrl}/api/user/payment/midtrans`,
          { appointmentId, total },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const data = response.data;

        if (data.success) {
          const snapToken = data.snapToken;

          if (!snapToken) {
            toast.error("Snap token not received");
            return;
          }

          const startSnap = () => {
            window.snap.pay(snapToken, {
              onSuccess: function (result) {
                console.log("Payment Success:", result);
                toast.success('Payment Successful!');
                getUserAppointments();
              },
              onPending: function (result) {
                console.log("Payment Pending:", result);
                toast.info('Payment is pending.');
                getUserAppointments();
              },
              onError: function (result) {
                console.log("Payment Error:", result);
                toast.error('Payment failed.');
              },
              onClose: function () {
                console.log("Snap closed without finishing the payment.");
              }
            });
          };

          if (!window.snap) {
            const script = document.createElement('script');
            script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
            script.setAttribute('data-client-key', process.env.REACT_APP_MIDTRANS_CLIENT_KEY);
            script.onload = startSnap;
            document.body.appendChild(script);
          } else {
            startSnap();
          }
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Failed to calculate payment details: " + (resCalc.data.message || "No message"));
      }
    } catch (error) {
      console.error("Error in handlePayment:", error);
      toast.error(error.message);
    }
  }

  const openPrescriptionModal = async (appointment) => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/payment/calculate/${appointment._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setSelectedPrescription({ ...appointment.prescription, appointment })
        setOrderDetails(res.data.details)
        setShowModal(true)
      } else {
        toast.error("Failed to fetch order details.")
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  const openChatModal = (appointment) => {
    setChatAppointment(appointment)
  }

  // Menjalankan getUserAppointments setelah token tersedia
  useEffect(() => {
    if (token) {
      getUserAppointments(); // Ambil daftar janji temu jika token ada
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">{t('myappointments.title')}</p>
      <div>
        {appointments.length === 0 ? (
          <p>{t('myappointments.empty')}</p>
        ) : (
          appointments.map((item, index) => (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
              <div>
                <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                <p>{t(`speciality.list.${item.docData.speciality}`, { defaultValue: item.docData.speciality })}</p>
                <p className="text-zinc-700 font-medium mt-1">{t('myappointments.address')}</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-sm mt-1">
                  <span className="text-sm text-neutral-700 font-medium">{t('myappointments.datetime')}:</span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
<<<<<<< HEAD
                <button onClick={() => openChatModal(item)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#00B8BA] hover:text-white transition-all duration-300'>{t('myappointments.online_consult')}</button>
=======
                <button onClick={() => openChatModal(item)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#00B8BA] hover:text-white transition-all duration-300'>Online Consultant</button>
>>>>>>> 29e40e6757e32b8c24ca861f973121bdacbc2b25

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button onClick={() => handlePayment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#00B8BA] hover:text-white transition-all duration-300'>{t('myappointments.pay_online')}</button>
                )}

                {item.isCompleted && item.prescription && (
<<<<<<< HEAD
                  <button onClick={() => openPrescriptionModal(item)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#00B8BA] hover:text-white transition-all duration-300'>{t('myappointments.prescription')}</button>
=======
                  <button onClick={() => openPrescriptionModal(item)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#00B8BA] hover:text-white transition-all duration-300'>Prescription</button>
>>>>>>> 29e40e6757e32b8c24ca861f973121bdacbc2b25
                )}

                {item.payment && !item.isCompleted && (
                  <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border bg-indigo-50 rounded cursor-not-allowed' disabled>{t('myappointments.paid')}</button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>{t('myappointments.cancel')}</button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>{t('myappointments.cancelled')}</button>
                )}

                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>{t('myappointments.completed')}</button>}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Tampilkan ChatModal jika appointment dipilih */}
      {chatAppointment && (
        <ChatModal appointment={chatAppointment} onClose={() => setChatAppointment(null)} />
      )}

      {showModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-[90%]">
            <PrescriptionCard
              prescription={selectedPrescription}
              user={selectedPrescription.appointment.userData}
              isDoctor={false}
              orderDetails={orderDetails}
            />
<<<<<<< HEAD
            <button onClick={() => setShowModal(false)} className="mt-4 bg-[#00B8BA] text-white px-4 py-2 rounded w-full">{t('common.close')}</button>
=======
            <button onClick={() => setShowModal(false)} className="mt-4 bg-[#00B8BA] text-white px-4 py-2 rounded w-full">Close</button>
>>>>>>> 29e40e6757e32b8c24ca861f973121bdacbc2b25
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments
