import { Link } from 'react-router-dom'
import { useGetAdminTotal } from '~/lib/useGetAdmin'

interface ILink {
    href: string
    name: string
    quantity: number
}

const AdminDashboard = () => {
    const { totalCompany, totalEmployee, totalJob, totalJobApply } = useGetAdminTotal()

    const data: ILink[] = [
        {
            name: 'Company',
            quantity: totalCompany,
            href: '/admin/company'
        },
        {
            name: 'Employee',
            quantity: totalEmployee,
            href: '/admin/employee'
        },
        {
            name: 'Job',
            quantity: totalJob,
            href: '/admin/dashboard'
        },
        {
            name: 'Job Application',
            quantity: totalJobApply,
            href: '/admin/dashboard'
        }
    ]

    return (
        <div className='overflow-auto z-[2] h-[calc(100vh-4rem)]'>
            <div className='pr-64 mt-12'>
                <h1 className='inline p-3 text-2xl font-bold bg-white border border-black shadow-xl rounded-xl'>
                    Dashboard
                </h1>
                <div className='grid grid-cols-2 gap-5 mt-10'>
                    {data.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className='flex justify-between px-4 py-6 bg-white shadow-xl rounded-xl'
                        >
                            <h1 className='text-xl font-bold'>{item.name}</h1>
                            <p className='text-2xl font-bold'>{item.quantity}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard