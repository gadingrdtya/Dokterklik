import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const Appointment = () => {
  const { t, i18n } = useTranslation()
  const { docId } = useParams()
  const { userData, doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toLocaleDateString(i18n.language, { weekday: 'short' }).toUpperCase()
  })

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = () => {
    const doc = doctors.find(doc => doc._id === docId)
    setDocInfo(doc)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString(i18n.language, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: i18n.language !== 'id'
        })
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = `${day}_${month}_${year}`
        const slotTime = formattedTime

        const isSlotAvailable = !(docInfo.slots_booked[slotDate]?.includes(slotTime))

        if (isSlotAvailable) {
          timeSlots.push({ dateTime: new Date(currentDate), time: formattedTime })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn(t('appointment.login_required'))
      return navigate('/login')
    }

    if (!userData || !userData._id) {
      toast.error(t('appointment.userdata_missing'))
      return
    }

    try {
      const date = docSlots[slotIndex][0].dateTime
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {
        docId, slotDate, slotTime, userId: userData._id,
        userData: { name: userData.name, email: userData.email }
      }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) getAvailableSlots()
  }, [docInfo, i18n.language])

  return docInfo && (
    <div>
      {/* -------- Doctor Details -------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='w-full sm:max-w-72 rounded-lg bg-[#00B8BA]' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>
              {docInfo.degree?.[i18n.language] || docInfo.degree?.id || docInfo.degree} - {t(`speciality.list.${docInfo.speciality}`, { defaultValue: docInfo.speciality })}
            </p>
            <button className='py-0.5 px-2 border text-xs rounded-full cursor-pointer'>{docInfo.experience?.[i18n.language] || docInfo.experience?.id || docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              {t('appointment.about')} <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about?.[i18n.language] || docInfo.about?.id || docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            {t('appointment.fee')}: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* -------- Booking Slots -------- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>{t('appointment.booking_slots')}</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#00B8BA] text-white' : 'border border-gray-200'}`}>
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} key={index}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#00B8BA] text-white' : 'text-gray-400 border border-gray-300'}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='text-white text-sm font-light px-20 py-3 rounded-full my-6 cursor-pointer bg-[#00B8BA]'>
          {t('appointment.book_now')}
        </button>
      </div>

      {/* -------- Related Doctors -------- */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment