import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const { t } = useTranslation();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ];

  return (
    <div>
      <p className='text-gray-600'>{t('doctors.browseText')}</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#00B8BA] text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>{t('doctors.filterButton')}</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialities.map((item, index) => (
            <p key={index} onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === item ? 'bg-indigo-100 text-black' : ''}`}
            >{t(`doctors.specialities.${item}`, { defaultValue: item })}</p>
          ))}
        </div>

        <div className='w-full gap-4 gap-y-6' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {filterDoc.map((item, index) => (
            <div className='border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img onClick={() => navigate(`/appointment/${item._id}`)} className='bg-[#00B8BA10]' src={item.image} alt=''/>
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                  <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                  <p>
                    {item.available ? t('doctors.available') : t('doctors.unavailable')}
                  </p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{t(`speciality.list.${item.speciality}`, { defaultValue: item.speciality })}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;