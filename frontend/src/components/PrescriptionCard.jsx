import React, { useEffect, useState } from "react";
import axios from "axios";

const PrescriptionCard = ({ prescription: propPrescription, appointmentId, user, isDoctor = false }) => {
  const [prescription, setPrescription] = useState(propPrescription || null);

  useEffect(() => {
    if (!propPrescription && appointmentId) {
      const fetchPrescription = async () => {
        try {
          const res = await axios.get(`/api/prescriptions/${appointmentId}`);
          setPrescription(res.data);
        } catch (err) {
          console.error("Gagal fetch prescription:", err);
        }
      };
      fetchPrescription();
    }
  }, [appointmentId, propPrescription]);

  const handlePayment = async () => {
    try {
      const res = await axios.post("/api/prescriptions/pay", {
        prescriptionId: prescription._id,
      });
      const snapToken = res.data.snapToken;

      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          console.log("Pembayaran berhasil", result);
        },
        onPending: function (result) {
          console.log("Menunggu pembayaran", result);
        },
        onError: function (result) {
          console.log("Pembayaran gagal", result);
        },
      });
    } catch (err) {
      console.error("Gagal membuat pembayaran:", err);
    }
  };

  if (!prescription || !Array.isArray(prescription.medicines)) {
    return <p className="text-gray-500 italic text-sm">Resep belum tersedia</p>;
  }

  return (
    <div className="mt-4 border p-3 rounded bg-green-50 shadow">
      <h3 className="font-semibold text-[#00B8BA]">Resep Elektronik</h3>

      {user && (
        <p className="text-sm mb-2 text-gray-600">Untuk: <strong>{user.name}</strong></p>
      )}

      <ul className="list-disc ml-5 text-sm">
        {prescription.medicines.map((med, index) => (
          <li key={index} className="mb-2">
            <p><strong>Obat:</strong> {med.name}</p>
            <p><strong>Dosis:</strong> {med.dosage}</p>
            <p><strong>Aturan Pakai:</strong> {med.instructions}</p>
          </li>
        ))}
      </ul>

      <div className="mt-2 text-sm">
        <p>Status Pembayaran:{" "}
          {prescription.isPaid ? (
            <span className="text-green-600 font-semibold">Paid</span>
          ) : (
            <span className="text-red-500 font-semibold">Unpaid</span>
          )}
        </p>
      </div>

      {/* Tombol Bayar (hanya untuk pasien dan resep belum lunas) */}
      {!isDoctor && !prescription.isPaid && (
        <button onClick={handlePayment} className="mt-3 px-3 py-1 bg-[#00B8BA] text-white rounded hover:bg-[#009da3]">
          Bayar Resep
        </button>
      )}
    </div>
  );
};

export default PrescriptionCard