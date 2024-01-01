import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../AdminSidebar'

const AdminLayout = () => {
    const navigate = useNavigate()
    const employeeToken = localStorage.getItem('employeeToken')

    useEffect(() => {
        if (!employeeToken) {
            navigate('/auth/admin/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeToken])

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full pl-64 ml-4 bg-gray-100'>
                <Outlet />
            </div>
        </div>
    )
}
export default AdminLayout