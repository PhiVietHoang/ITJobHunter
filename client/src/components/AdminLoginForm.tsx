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
    const [formMessage, setFormMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await login(formData)
            if (response?.status === 200) {
                if (!response.data.employee.isAdmin) {
                    setFormMessage('Oops! You are in the wrong place.')
                    return
                }
                dispatch(employeeLoginSuccess({ employeeToken: response.data.token, employee: response.data.employee }))
                localStorage.setItem('employeeToken', response.data.token)
                navigate('/admin/dashboard')
            } else if (response) {
                setFormMessage('Wrong password')
            } else {
                setFormMessage('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className='w-1/2 flex flex-col gap-6 px-16 py-12 bg-transparent rounded-lg' onSubmit={onSubmit}>
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
                    className='py-1 px-2 rounded-sm border-black border-2 placeholder:text-black bg-transparent focus:outline-none'
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
                    className='py-1 px-2 rounded-sm border-black border-2 placeholder:text-black bg-transparent focus:outline-none'
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            {formMessage && <p className='text-center font-semibold'>{formMessage}</p>}
            <button
                type='submit'
                className='py-4 w-full text-xl text-semibold rounded-sm border-black border-2 hover:bg-black hover:text-red-900'
            >
                Login
            </button>
        </form>
    )
}

export default AdminLoginForm
