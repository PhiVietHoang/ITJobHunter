import { FaChartPie } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { MdDashboard, MdPeopleAlt } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'

interface IAdminSidebar {
    name: string
    icon: React.ReactNode
    href: string
}

const links: IAdminSidebar[] = [
    {
        name: 'Dashboard',
        href: '/admin/dashboard',
        icon: <FaChartPie />
    },
    {
        name: 'Company',
        href: '/admin/company',
        icon: <MdDashboard />
    },
    {
        name: 'Employee',
        href: '/admin/employee',
        icon: <MdPeopleAlt />
    }
]

const Sidebar = () => {
    const navigate = useNavigate()

    const logout = (): void => {
        localStorage.removeItem('employeeToken')
        navigate('/admin')
        window.location.reload()
    }
    return (
        <div className='fixed inset-y-0 left-0 w-64 p-4 shadow-2xl lg:block'>
            <div className='flex flex-col justify-between h-full'>
                <div>
                    <h1 className='text-3xl font-bold tracking-wider text-center mb-7'>Welcome</h1>
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className={({ isActive }) =>
                                `flex px-2 py-3 items-center gap-3 mb-0 ${isActive && 'bg-gray-200 rounded-xl'}`
                            }
                        >
                            <i className='text-2xl font-bold'>{link.icon}</i>
                            <p className='font-medium '>{link.name}</p>
                        </NavLink>
                    ))}
                </div>
                <button
                    onClick={logout}
                    className='px-4 py-2 rounded-xl flex text-left text-lg gap-4 bg-rose-500 text-white hover:bg-[#275df5]'
                >
                    <IoIosLogOut className='mr-6 text-3xl' />
                    Logout
                </button>
            </div>
        </div>
    )
}
export default Sidebar
