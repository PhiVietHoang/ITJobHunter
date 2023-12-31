import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AxiosResponse } from 'axios'

import CompanyNavbar from './components/layout/CompanyNavbar'
import { setToken, setCompany } from './features/auth/employerAuthSlice'
import { getCurrentCompany } from '~/services/companyApi'

const CompanyApp = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('employerToken')
        console.log('Get token', token)
        if (token) {
            dispatch(setToken(token))
            getCurrentCompany(token).then((response: AxiosResponse<unknown, unknown> | undefined) => {
                if (response) {
                    dispatch(setCompany(response.data))
                }
            })
        }
    }, [dispatch])

    return (
        <div>
            <div className='bg-white'>
                <div className='mx-auto w-2/3'>
                    <CompanyNavbar />
                </div>
            </div>
            <div className='mx-auto w-2/3'>
                <Outlet />
            </div>
        </div>
    )
}

export default CompanyApp
