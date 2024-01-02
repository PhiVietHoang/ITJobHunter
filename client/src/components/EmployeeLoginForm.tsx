import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { employeeLoginSuccess } from '~/features/auth/employeeAuthSlice'
import { login } from '~/services/api'

const EmployeeLoginForm = () => {
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
                navigate('/')
            } else if (response) {
                setFormMessage({ type: 'error', message: response.data.message })
            } else {
                setFormMessage({ type: 'error', message: 'Something went wrong' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className='px-16 py-12 flex flex-col gap-6 bg-white rounded-lg' onSubmit={onSubmit}>
            <div className='mx-auto text-3xl font-bold text-cyan-600'>ITJobHunter</div>
            <div className='flex justify-between items-end'>
                <span className='text-2xl font-semibold'>Login</span>
                <span className='text-xl font-semibold text-[#275df5] hover:underline cursor-pointer'>
                    <Link to='../register'>Register for free</Link>
                </span>
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
                className='my-6 py-4 w-full text-xl text-semibold text-white bg-[#275df5] hover:bg-[#275df5cc] rounded-[60px]'
            >
                Login
            </button>
        </form>
    )
}

export default EmployeeLoginForm
