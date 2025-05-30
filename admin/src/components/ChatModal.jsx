import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ChatContext } from '../context/ChatContext';
import PrescriptionForm from './PrescriptionForm';

const ChatModal = ({ appointment, onClose, isDoctor }) => {
  const { socket, messages, setMessages } = useContext(ChatContext);
  const [input, setInput] = useState('');
  const [prescription, setPrescription] = useState(null);

  const getQuickReplies = () => {
    const speciality = appointment?.docData?.speciality;
    switch (speciality) {
      case 'General physician':
        return [
          'Silakan minum obat ini 3 kali sehari setelah makan.',
          'Apakah Anda mengalami demam atau kelelahan?',
          'Jangan lupa istirahat cukup dan minum air putih ya.',
          'Saya akan buatkan resep, mohon tunggu sebentar.',
        ];
      case 'Gynecologist':
        return [
          'Apakah Anda sedang haid atau hamil saat ini?',
          'Apakah mengalami nyeri saat menstruasi?',
          'Sudah pernah periksa PAP smear?',
          'Saya akan buatkan resep, mohon tunggu sebentar.',
        ];
      case 'Dermatologist':
        return [
          'Apakah kulit terasa gatal, perih, atau kering?',
          'Apakah pernah menggunakan krim tertentu sebelumnya?',
          'Hindari paparan sinar matahari langsung dulu ya.',
          'Saya akan buatkan resep, mohon tunggu sebentar.',
        ];
      case 'Pediatricians':
        return [
          'Bagaimana suhu tubuh anak saat ini?',
          'Sudah lengkap imunisasi anaknya?',
          'Apakah anak mengalami batuk/pilek?',
          'Mohon ceritakan riwayat alergi anak.',
          'Saya akan buatkan resep, mohon tunggu sebentar.',
        ];
      case 'Neurologist':
        return [
          'Apakah sering sakit kepala atau pusing?',
          'Apakah ada keluhan kesemutan/kebas di anggota tubuh?',
          'Sudah pernah melakukan CT scan atau MRI?',
          'Bagaimana pola tidur Anda?',
          'Saya akan buatkan resep, mohon tunggu sebentar.',
        ];
      case 'Gastroenterologist':
        return [
          'Apakah sering merasa kembung atau mual?',
          'Sudah periksa endoskopi atau USG perut?',
          'Bagaimana pola makan sehari-hari Anda?',
          'Silakan hindari makanan pedas dan berlemak dulu.',
          'Saya akan buatkan resep, mohon tunggu sebentar.',
        ];
      default:
        return [
          'Saya akan buatkan resep, mohon tunggu sebentar.',
          'Terima kasih telah berkonsultasi.',
        ];
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = {
      appointmentId: appointment._id,
      sender: isDoctor ? 'doctor' : 'user',
      message: input,
    };
    socket.emit('sendMessage', msg);
    setInput('');
  };

  useEffect(() => {
    if (appointment?._id) {
      socket.emit('joinRoom', appointment._id);
      fetchPrescription();
    }
  }, [appointment]);

  const fetchPrescription = async () => {
    try {
      const dToken = localStorage.getItem('dToken');
      const res = await axios.get(`/api/prescriptions/appointment/${appointment._id}`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      setPrescription(res.data);
    } catch (error) {
      console.error('Fetch Prescription Error:', error);
      setPrescription(null);
    }
  }

  const filteredMessages = messages.filter(
    (msg) => msg.appointmentId === appointment._id
  )

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl p-4 rounded shadow-lg flex gap-4">
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">
              Chat with {isDoctor ? appointment.userData.name : appointment.docData.name}
            </h2>
            <button onClick={onClose}>X</button>
          </div>


          {/* Chat Section */}
          <div className="flex-1 overflow-y-auto border p-2 rounded mb-2 min-h-[180px] max-h-[200px]">
            {filteredMessages.map((msg, idx) => (
              <p key={idx} className={`mb-2 ${msg.sender === (isDoctor ? 'doctor' : 'user') ? 'text-right' : 'text-left'}`}>
                <span className="inline-block px-2 py-1 rounded bg-blue-100 text-sm break-words max-w-[100%]">{msg.message}</span>
              </p>
            ))}
          </div>

          {/* Quick Replies */}
          {isDoctor && (
            <div className="flex flex-wrap gap-2 mb-2">
              {getQuickReplies().map((text, index) => (
                <button key={index} onClick={() => setInput(text)} className="text-sm px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                  {text}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <div className="flex gap-2 mb-4">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 border px-2 py-1 rounded" />
            <button onClick={sendMessage} className="bg-[#00B8BA] text-white px-3 py-1 rounded">Send</button>
          </div>
        </div>

        {/* Prescription Form */}
        <div className="w-[45%] border p-4 rounded bg-gray-50">
          {(!prescription || !prescription.medicines || prescription.medicines.length === 0) && (
            <PrescriptionForm
              appointmentId={appointment._id}
              userId={appointment.userData._id}
              onSuccess={() => {
                fetchPrescription();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatModal