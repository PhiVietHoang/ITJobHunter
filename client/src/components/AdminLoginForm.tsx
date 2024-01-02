import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { employeeLoginSuccess } from '~/features/auth/employeeAuthSlice'
import { login } from '~/services/api'

const AdminLoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [formMessage, setFormMessage] = useState({ type: '', message: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await login(formData)
            if (response?.status === 200) {
                dispatch(employeeLoginSuccess({ employeeToken: response.data.token, employee: response.data.employee }))
                localStorage.setItem('employeeToken', response.data.token)
                navigate('/admin/dashboard')
            } else if (response) {
                setFormMessage({ type: 'error', message: 'Wrong password' })
            } else {
                setFormMessage({ type: 'error', message: 'Something went wrong' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className='flex flex-col gap-6 px-16 py-12 bg-white rounded-lg' onSubmit={onSubmit}>
            <div className='mx-auto'>
                <h1 className='font-serif text-4xl font-bold text-cyan-600'>ITJobHunter</h1>
                <p className='font-semibold text-center text-md text-cyan-600'>Right place for admin!</p>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='font-semibold'>
                    Email
                </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    placeholder='Enter your email'
                    className='py-3 px-4 rounded-2xl border-black border focus:outline-[#275df5]'
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='password' className='font-semibold'>
                    Password
                </label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    required
                    placeholder='Enter your password'
                    className='py-3 px-4 rounded-2xl border-black border focus:outline-[#275df5]'
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            {formMessage && (
                <p
                    className={`${
                        formMessage.type === 'error' ? 'text-red-500' : 'text-green-700'
                    } font-semibold text-lg`}
                >
                    {formMessage.message}
                </p>
            )}
            <button
                type='submit'
                className='py-4 w-full text-xl text-semibold text-white bg-[#275df5] hover:bg-[#275df5cc] rounded-[60px]'
            >
                Login
            </button>
        </form>
    )
}

export default AdminLoginForm
