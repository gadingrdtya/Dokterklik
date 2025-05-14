import React, { useState } from 'react';
import axios from 'axios';

const PrescriptionForm = ({ appointmentId, onSuccess }) => {
  const [medicines, setMedicines] = useState([{ name: '', dosage: '' }]);
  const [notes, setNotes] = useState('');

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/prescriptions', {
        appointmentId,
        medicines,
        notes,
      });
      onSuccess()
    } catch (err) {
      console.error('Gagal membuat resep:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {medicines.map((med, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            placeholder="Nama Obat"
            value={med.name}
            onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            placeholder="Dosis"
            value={med.dosage}
            onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
      ))}
      <button type="button" onClick={addMedicine} className="btn btn-sm btn-secondary">
        Tambah Obat
      </button>
      <textarea
        placeholder="Catatan Dokter"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="textarea textarea-bordered w-full"
      />
      <button type="submit" className="btn btn-primary">
        Simpan Resep
      </button>
    </form>
  );
};

export default PrescriptionForm