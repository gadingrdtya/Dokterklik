import React, { useState, useContext } from 'react';
import axios from 'axios';
import { DoctorContext } from '../context/DoctorContext';
import { toast } from 'react-toastify';

const PrescriptionForm = ({ appointmentId, onPrescriptionCreated }) => {
  const { doctor } = useContext(DoctorContext);
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', instructions: '' }]);

  const handleChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', instructions: '' }]);
  };

  const removeMedicine = (index) => {
    const updated = [...medicines];
    updated.splice(index, 1);
    setMedicines(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/prescriptions/create', {
        appointmentId,
        doctorId: doctor._id,
        medicines,
      });

      toast.success('Resep berhasil dibuat!');
      if (onPrescriptionCreated) onPrescriptionCreated(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Gagal membuat resep');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Buat Resep</h2>

      {medicines.map((med, index) => (
        <div key={index} className="mb-4 border-b pb-3">
          <input
            type="text"
            placeholder="Nama Obat"
            className="input input-bordered w-full mb-2"
            value={med.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Dosis"
            className="input input-bordered w-full mb-2"
            value={med.dosage}
            onChange={(e) => handleChange(index, 'dosage', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Aturan Pakai"
            className="input input-bordered w-full"
            value={med.instructions}
            onChange={(e) => handleChange(index, 'instructions', e.target.value)}
            required
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => removeMedicine(index)}
              className="text-red-500 mt-2"
            >
              Hapus
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addMedicine} className="btn btn-sm btn-outline mb-4">
        Tambah Obat
      </button>

      <button type="submit" className="btn btn-primary w-full">
        Simpan Resep
      </button>
    </form>
  );
};

export default PrescriptionForm