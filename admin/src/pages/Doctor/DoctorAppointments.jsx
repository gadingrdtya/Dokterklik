import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import ChatModal from '../../components/ChatModal'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const calculateFees = (item) => {
    const doctorFee = item.docData?.fees || 0;
    const consultationFee = 30000;
    const prescriptionFee = item.prescription && item.prescription.medicines && item.prescription.medicines.length > 0 ? item.prescription.medicines.length * 10000 : 0;
    return doctorFee + consultationFee + prescriptionFee;
  }

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1.5fr] gap-1 py-3 px-6 border-b border-b-gray-400'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
          <p>Chat With Patient</p>
        </div>

        {[...appointments].reverse().map((item, index) => (
          <div key={item._id} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1.5fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-b-gray-400 hover:bg-gray-100'>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
            </div>
            <div>
              <p className='text-xs inline border border-[#00B8BA] px-2 rounded-full'>
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{currency}{calculateFees(item)}</p>
            {
              item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <div className='flex'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
            }
            <button onClick={() => setSelectedAppointment(item)} className='text-white text-xs bg-[#00B8BA] px-4 py-1 rounded-full cursor-pointer'>
              Chat
            </button>
          </div>
        ))}
      </div>

      {selectedAppointment && (
        <ChatModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          isDoctor={true}
        />
      )}
    </div>
  );
};

export default DoctorAppointments