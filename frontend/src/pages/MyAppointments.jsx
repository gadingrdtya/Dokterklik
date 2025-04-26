import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format tanggal slot
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
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
        toast.success(data.message);
        getUserAppointments(); // Update daftar janji temu setelah dibatalkan
        getDoctorsData(); // Update data dokter jika diperlukan
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
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment/midtrans`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
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
              getUserAppointments(); // 🔁 Fetch data appointment terbaru
            },
            onPending: function (result) {
              console.log("Payment Pending:", result);
              toast.info('Payment is pending.');
              getUserAppointments(); // 🔁 Refresh juga walau pending
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
  
        // Load Snap.js jika belum ada
        if (!window.snap) {
          const script = document.createElement('script');
          script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
          script.setAttribute('data-client-key', process.env.REACT_APP_MIDTRANS_CLIENT_KEY);
          script.onload = startSnap; // 🧠 Jalankan Snap setelah script dimuat
          document.body.appendChild(script);
        } else {
          startSnap();
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  

  // Menjalankan getUserAppointments setelah token tersedia
  useEffect(() => {
    if (token) {
      getUserAppointments(); // Ambil daftar janji temu jika token ada
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
      <div>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((item, index) => (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
              <div>
                <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-sm mt-1">
                  <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button onClick={() => handlePayment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#00B8BA] hover:text-white transition-all duration-300">Pay Online</button>
                )}

                {item.payment && !item.isCompleted && (
                  <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border bg-indigo-50 rounded cursor-not-allowed" disabled>Paid</button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">Cancel appointment</button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment cancelled</button>
                )}
                
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;