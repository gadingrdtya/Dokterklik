import React, { useEffect, useState } from "react";
import axios from "axios";

const PrescriptionCard = ({ prescription }) => {
  return (
    <div className="border rounded-lg p-4 shadow">
      {prescription.medicines.map((med, index) => (
        <div key={index} className="mb-2">
          <p className="text-zinc-700 font-medium">Nama Obat: {med.name}</p>
          <p className="text-zinc-700 font-medium">Dosis: {med.dosage}</p>
          <p className="text-zinc-700 font-medium">Instruksi: {med.instructions}</p>
        </div>
      ))}
      {prescription.notes && <p className="text-sm text-neutral-600 italic">Catatan: {prescription.notes}</p>}
    </div>
  );
}

export default PrescriptionCard