import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AxiosResponse } from 'axios'

import { getCurrentEmployee } from './services/api'
import { setToken, setEmployee } from '~/features/auth/employeeAuthSlice'
import Navbar from './components/layout/Navbar'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('employeeToken')
        console.log('Get token', token)
        if (token) {
            dispatch(setToken(token))
            getCurrentEmployee(token).then((response: AxiosResponse<unknown, unknown> | undefined) => {
                if (response) {
                    dispatch(setEmployee(response.data))
                }
            })
        }
    }, [dispatch])

    return (
        <div>
            <div className='bg-white'>
                <div className='mx-auto w-2/3'>
                    <Navbar />
                </div>
            </div>
            <div className='mx-auto w-2/3'>
                <Outlet />
            </div>
        </div>
    )
}

export default App
