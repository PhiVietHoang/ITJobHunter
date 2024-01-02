import { Outlet } from 'react-router-dom'
import Sidebar from '../AdminSidebar'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'
import AdminLoginForm from '../AdminLoginForm'

const AdminLayout = () => {
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)

    console.log(employee)

    if (!employee || !employee.isAdmin) {
        return (
            <div className='bg-red-900'>
                <div className='mx-auto w-fit h-screen flex flex-col justify-center items-center'>
                    <h1 className='text-9xl font-bold'>Unauthorized</h1>
                    <AdminLoginForm />
                </div>
            </div>
        )
    }

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
