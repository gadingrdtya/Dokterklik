import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate();

    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* -------- Left Section -------- */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>DokterKlik is proud to be a trusted healthcare platform that connects patients with quality doctors across Indonesia. With innovative online consultation services and an integrated network of doctors, we ensure easy access to healthcare even in remote locations, making us the preferred choice for your healthcare needs anywhere.</p>
                </div>

                {/* -------- Center Section -------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li className='cursor-pointer' onClick={() => navigate('/')}>Home</li>
                        <li className='cursor-pointer' onClick={() => navigate('about')}>About us</li>
                        <li className='cursor-pointer' onClick={() => navigate('contact')}>Contact us</li>
                        <li className='cursor-pointer' onClick={() => navigate('/doctors')}>All Doctors</li>
                    </ul>
                </div>

                {/* -------- Right Section -------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>(021) 9080-7050</li>
                        <li>dokterklik@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* -------- Copyright Text -------- */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright © 2025 DokterKlik - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
