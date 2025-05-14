import React from 'react';

const PrescriptionCard = ({ prescription, user }) => {
  const { medicines, instructions, totalPrice, isPaid, createdAt } = prescription;

  return (
    <div className="border p-4 rounded shadow-sm bg-white mb-4">
      <div className="mb-2">
        <strong>Pasien:</strong> {user?.name}
      </div>
      <div className="mb-2">
        <strong>Tanggal Resep:</strong> {new Date(createdAt).toLocaleDateString()}
      </div>
      <div className="mb-2">
        <strong>Obat-obatan:</strong>
        <ul className="list-disc ml-6">
          {medicines.map((med, index) => (
            <li key={index}>
              {med.name} - {med.dosage}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <strong>Instruksi:</strong>
        <p>{instructions}</p>
      </div>
      <div className="mb-2">
        <strong>Total Biaya:</strong> Rp{totalPrice.toLocaleString()}
      </div>
      <div className={`p-2 rounded text-sm ${isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        Status Pembayaran: {isPaid ? 'Lunas' : 'Belum Dibayar'}
      </div>
    </div>
  );
};

export default PrescriptionCard