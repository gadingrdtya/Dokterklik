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
        ];
      case 'Dermatologist':
        return [
          'Apakah kulit terasa gatal, perih, atau kering?',
          'Apakah pernah menggunakan krim tertentu sebelumnya?',
          'Hindari paparan sinar matahari langsung dulu ya.',
        ];
      case 'Pediatricians':
        return [
          'Bagaimana suhu tubuh anak saat ini?',
          'Sudah lengkap imunisasi anaknya?',
          'Apakah anak mengalami batuk/pilek?',
          'Mohon ceritakan riwayat alergi anak.',
        ];
      case 'Neurologist':
        return [
          'Apakah sering sakit kepala atau pusing?',
          'Apakah ada keluhan kesemutan/kebas di anggota tubuh?',
          'Sudah pernah melakukan CT scan atau MRI?',
          'Bagaimana pola tidur Anda?',
        ];
      case 'Gastroenterologist':
        return [
          'Apakah sering merasa kembung atau mual?',
          'Sudah periksa endoskopi atau USG perut?',
          'Bagaimana pola makan sehari-hari Anda?',
          'Silakan hindari makanan pedas dan berlemak dulu.',
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
      const res = await axios.get(`/api/prescriptions/appointment/${appointment._id}`);
      setPrescription(res.data);
    } catch {
      setPrescription(null);
    }
  };

  const filteredMessages = messages.filter(
    (msg) => msg.appointmentId === appointment._id
  );

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">
            Chat with {isDoctor ? appointment.userData.name : appointment.docData.name}
          </h2>
          <button onClick={onClose}>X</button>
        </div>

        {/* Chat Section */}
        <div className="h-64 overflow-y-auto border p-2 rounded mb-2">
          {filteredMessages.map((msg, idx) => (
            <p key={idx} className={`mb-2 ${msg.sender === (isDoctor ? 'doctor' : 'user') ? 'text-right' : 'text-left'}`}>
              <span className="inline-block px-2 py-1 rounded bg-blue-100 text-sm">{msg.message}</span>
            </p>
          ))}
        </div>

        {/* Quick Replies */}
        {isDoctor && (
          <div className="flex flex-wrap gap-2 mb-2">
            {getQuickReplies().map((text, index) => (
              <button
                key={index}
                onClick={() => setInput(text)}
                className="text-sm px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
              >
                {text}
              </button>
            ))}
          </div>
        )}

        {/* Chat Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border px-2 py-1 rounded"
          />
          <button
            onClick={sendMessage}
            className="bg-[#00B8BA] text-white px-3 py-1 rounded"
          >
            Send
          </button>
        </div>

        {/* Prescription Form */}
        {isDoctor && appointment?.status === 'consulted' && !prescription && (
          <div className="border-t pt-3">
            <h4 className="text-md font-semibold mb-2">Buat Resep</h4>
            <PrescriptionForm
              appointmentId={appointment._id}
              onSuccess={() => {
                setPrescription({ done: true });
              }}
            />
          </div>
        )}

        {/* Notification if prescription already exists */}
        {prescription && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-sm">
            Resep telah dibuat untuk appointment ini.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatModal