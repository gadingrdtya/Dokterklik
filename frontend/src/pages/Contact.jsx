import React from 'react'
import { assets } from '../assets/assets'
import { useTranslation } from 'react-i18next'

const Contact = () => {

  const { t } = useTranslation()

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>{t('contact.title')} <span className='text-gray-700 font-semibold'>{t('contact.us')}</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-20 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>{t('contact.office_title')}</p>
          <p className='text-gray-500'>{t('contact.office_address1')} <br /> {t('contact.office_address2')}</p>
          <p className='text-gray-500'>{t('contact.contact_info1')} <br /> {t('contact.contact_info2')}</p>
          <p className='font-semibold text-lg text-gray-600'>{t('contact.careers_title')}</p>
          <p className='text-gray-500'>{t('contact.careers_text')}</p>
          <button className='border border-black px-8 py-4 text-sm bg-white text-black hover:bg-black hover:text-white transition-all duration-500'>{t('contact.explore_jobs')}</button>

        </div>
      </div>
    </div>
  )
}

export default Contact
