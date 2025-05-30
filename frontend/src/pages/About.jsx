import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

    <div className='text-center text-2xl pt-10 text-gray-500'>
      <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
    </div>

    <div className='my-10 flex flex-col md:flex-row gap-12'>
      <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
        <p>Welcome to DokterKlik, your trusted partner in managing your healthcare needs easily and efficiently. At DokterKlik, we understand the challenges that individuals face when it comes to scheduling appointments with doctors and conducting online medical consultations via chat.</p>
        <p>DokterKlik is committed to providing excellence in healthcare technology. We continuously strive to improve our platform, integrating the latest advancements to enhance user experience and deliver superior service. Whether you are booking your first appointment or conducting an online medical consultation via chat, DokterKlik is here to support you every step of the way.</p>
        <b className='text-gray-800'>Our Vision</b>
        <p>Our vision at DokterKlik is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
      </div>
    </div>

    <div className='text-xl my-4'>
      <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
    </div>

    <div className='flex flex-col md:flex-row mb-20'>
      <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#00B8BA] hover:text-white transition-all duration-500 text-gray-600 cursor-pointer'>
        <b>EFFICIENCY:</b>
        <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
      </div>
      <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#00B8BA] hover:text-white transition-all duration-500 text-gray-600 cursor-pointer'>
        <b>CONVENIENCE:</b>
        <p>Access to a network of trusted healthcare professionals in your area.</p>
      </div>
      <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#00B8BA] hover:text-white transition-all duration-500 text-gray-600 cursor-pointer'>
        <b>PERSONALIZATION:</b>
        <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
      </div>
    </div>

    </div>
  )
}

export default About