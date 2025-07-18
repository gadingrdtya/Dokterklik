import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const RelatedDoctors = ({ speciality, docId }) => {

    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()
    const { t } = useTranslation()

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id != docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>{t('relatedDoctors.title')}</h1>
            <p className='sm:w-1/3 text-center text-sm'>{t('relatedDoctors.subtitle')}</p>
            <div className='w-full gap-4 pt-5 gap-y-6 px-3 sm:px-0' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div className='border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='bg-[#00B8BA10]' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{item.available ? t('relatedDoctors.available') : t('relatedDoctors.unavailable')}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{t(`speciality.list.${item.speciality}`, { defaultValue: item.speciality })}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-green-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer'>{t('relatedDoctors.more')}</button>
        </div>
    )
}

export default RelatedDoctors
