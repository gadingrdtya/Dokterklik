import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ChatContext } from '../context/ChatContext'

const PrescriptionForm = ({ appointmentId, userId, onSuccess }) => {
  const { socket } = useContext(ChatContext)
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", instructions: "" }]);
  const [notes, setNotes] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleAdd = () => {
    setMedicines([...medicines, { name: "", dosage: "", instructions: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/doctor/prescriptions', {appointmentId, userId, medicines,notes}, {
        headers: { dToken: localStorage.getItem("dToken") },
      });

      const prescriptionMessage = `Resep: ${medicines.map(m => `${m.name} (${m.dosage})`).join(', ')} ${notes ? `- Catatan: ${notes}` : ''}`;

      const msg = {
        appointmentId,
        sender: 'doctor',
        message: prescriptionMessage,
      };
      socket.emit('sendMessage', msg);

      toast.success("Resep berhasil dikirim ke pasien!");
      setMedicines([{ name: "", dosage: "", instructions: "" }]);
      setNotes("");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Gagal mengirim resep.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {medicines.map((med, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <input className="border p-2" placeholder="Nama Obat" value={med.name} onChange={(e) => handleChange(i, "name", e.target.value)} />
          <input className="border p-2" placeholder="Dosis" value={med.dosage} onChange={(e) => handleChange(i, "dosage", e.target.value)} />
          <input className="border p-2" placeholder="Instruksi" value={med.instructions} onChange={(e) => handleChange(i, "instructions", e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={handleAdd} className="text-blue-500">+ Tambah Obat</button>
      <textarea className="w-full border p-2" placeholder="Catatan Tambahan" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit" className="bg-green-500 px-4 py-2 text-white rounded">Kirim Resep</button>
    </form>
  );
};

export default PrescriptionForm