import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { RootState } from '~/store'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const Navbar = () => {
    const token = useSelector((state: RootState) => state.employeeAuth.token)
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
        window.location.reload()
    }

    return (
        <nav className='py-4 flex justify-between items-center'>
            <div className='flex items-center gap-12'>
                <h1 className='text-xl text-cyan-600 font-bold font-serif'>ITJobHunter</h1>
                <Button variant='ghost' className='text-md  text-gray-500 hover:text-gray-900 hover:bg-white'>
                    Jobs
                </Button>
                <Button variant='ghost' className='text-md text-gray-500 hover:text-gray-900 hover:bg-white'>
                    Companies
                </Button>
            </div>
            <div className='flex items-center gap-4'>
                {!token && (
                    <Link to='auth/login'>
                        <Button
                            variant='outline'
                            className='px-6 text-md rounded-full border-[#275df5] text-[#275df5] hover:text-[#275df5]'
                        >
                            Login
                        </Button>
                    </Link>
                )}
                {!token && (
                    <Link to='auth/register'>
                        <Button
                            variant='default'
                            className='px-6 text-md rounded-full bg-[#f05537] hover:bg-[#f05537dd]'
                        >
                            Register
                        </Button>
                    </Link>
                )}
                {token && (
                    <Avatar>
                        <AvatarImage src={employee?.avatar} alt='Profile Picture' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                )}
                {token && (
                    <Button
                        variant='outline'
                        className='px-6 text-md rounded-full border-[#275df5] text-[#275df5] hover:text-[#275df5]'
                        onClick={logout}
                    >
                        Logout
                    </Button>
                )}
                {!token && <Separator orientation='vertical' className='w-2' />}
                {!token && (
                    <Link to='employer/auth/login'>
                        <Button variant='ghost' className='px-6 text-md text-gray-500 rounded-full'>
                            For employers
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar
