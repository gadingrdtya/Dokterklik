import React from 'react'
import { assets } from '../assets/assets'
import { useTranslation } from 'react-i18next'

const Header = () => {

    const { t } = useTranslation()

  return (
    <div className='bg-[#00B8BA] flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20'>
        {/* -------- Left Side -------- */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                {t('header.title1')} <br /> {t('header.title2')}
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img className='w-28' src={assets.group_profiles} alt="" />
                <p>{t('header.subtitle')} <br className='hidden sm:block'/></p>
            </div>
            <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                {t('header.button')} <img className='w-3' src={assets.arrow_icon} alt="" />
            </a>
        </div>

        {/* -------- Right Side -------- */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header
