import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {

    const navigate = useNavigate();
    const { t } = useTranslation()

    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* -------- Left Section -------- */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>{t('footer.description')}</p>
                </div>

                {/* -------- Center Section -------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>{t('footer.company_title')}</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li className='cursor-pointer' onClick={() => navigate('/')}>{t('footer.home')}</li>
                        <li className='cursor-pointer' onClick={() => navigate('about')}>{t('footer.about')}</li>
                        <li className='cursor-pointer' onClick={() => navigate('contact')}>{t('footer.contact')}</li>
                        <li className='cursor-pointer' onClick={() => navigate('/doctors')}>{t('footer.doctors')}</li>
                    </ul>
                </div>

                {/* -------- Right Section -------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>{t('footer.contact_title')}</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>(021) 9080-7050</li>
                        <li>dokterklik@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* -------- Copyright Text -------- */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>{t('footer.copyright')}</p>
            </div>
        </div>
    )
}

export default Footer
