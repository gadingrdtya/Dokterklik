import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-gray-200 rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? t('login.create_account') : t('login.login')}</p>
        <p>{t('login.please')} {state === 'Sign Up' ? t('login.signup_action') : t('login.login_action')} </p>
        {
          state == 'Sign Up' && <div className='w-full'>
            <p>{t('login.full_name')}</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }
        <div className='w-full'>
          <p>{t('login.email')}</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full'>
          <p>{t('login.password')}</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>
        <button type='submit' className='bg-[#00B8BA] text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? t('login.create_account') : t('login.login')}</button>
        {
          state == "Sign Up"
            ? <p>{t('login.already_have_account')} <span onClick={() => setState('Login')} className='text-[#00B8BA] underline cursor-pointer'>{t('login.login_here')}</span></p>
            : <p>{t('login.new_account')} <span onClick={() => setState('Sign Up')} className='text-[#00B8BA] underline cursor-pointer'>{t('login.click_here')}</span></p>
        }
      </div>
    </form>
  )
}

export default Login
