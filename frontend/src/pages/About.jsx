import React from 'react';
import { useTranslation } from 'react-i18next';
import { assets } from '../assets/assets';

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>{t('about.title')} <span className='text-gray-700 font-medium'>{t('about.us')}</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>{t('about.description1')}</p>
          <p>{t('about.description2')}</p>
          <b className='text-gray-800'>{t('about.vision_title')}</b>
          <p>{t('about.vision_text')}</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>{t('about.why')} <span className='text-gray-700 font-semibold'>{t('about.choose_us')}</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#00B8BA] hover:text-white transition-all duration-500 text-gray-600 cursor-pointer'>
          <b>{t('about.efficiency_title')}</b>
          <p>{t('about.efficiency_text')}</p>
        </div>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#00B8BA] hover:text-white transition-all duration-500 text-gray-600 cursor-pointer'>
          <b>{t('about.convenience_title')}</b>
          <p>{t('about.convenience_text')}</p>
        </div>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#00B8BA] hover:text-white transition-all duration-500 text-gray-600 cursor-pointer'>
          <b>{t('about.personalization_title')}</b>
          <p>{t('about.personalization_text')}</p>
        </div>
      </div>
    </div>
  );
};

export default About;