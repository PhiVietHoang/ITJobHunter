import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AxiosResponse } from 'axios'
import { getCurrentEmployee } from './services/api'
import { setToken, setEmployee } from '~/features/auth/employeeAuthSlice'
import Navbar from './components/layout/Navbar'
import { io } from 'socket.io-client'
import { RootState } from './store'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export const socket = io(import.meta.env.VITE_API_URL)

const App = () => {
    const location = useLocation()
    const isEmployeeCompanyDetail = location.pathname.includes('/companyAllDetail')
    const isHome = location.pathname === '/'
    const user = useSelector((state: RootState) => state.employeeAuth.employee || state.employerAuth.company)

    useEffect(() => {
        socket.emit('userOnline', user?._id)
    }, [user])

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
            <div className={`mx-auto ${isEmployeeCompanyDetail ? 'w-full' : 'w-2/3'} ${isHome ? 'w-full' : 'w-2/3'}`}>
                <Outlet />
            </div>
        </div>
    )
}

export default App
