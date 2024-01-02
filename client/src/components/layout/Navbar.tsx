import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { RootState } from '~/store'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { searchJobs } from '~/services/api'
import { setChatSelected } from '~/features/chatSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const token = useSelector((state: RootState) => state.employeeAuth.employeeToken)
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('employeeToken')
        navigate('/')
        window.location.reload()
    }

    const searchTitle = ''

    const handleSearch = async () => {
        const response = await searchJobs({ title: searchTitle, page: 0 })
        if (response?.status === 200) {
            const data = response.data
            const state = { ...data, searchTitle }
            navigate('/search', { state })
        } else {
            console.log(response)
        }
    }

    const solveOnClick = () => {
        navigate('/employee/chat')
        dispatch(setChatSelected(false))
    }

    return (
        <nav className='py-4 flex justify-between items-center'>
            <div className='flex items-center gap-12'>
                <Link to='/'>
                    <h1 className='text-xl text-cyan-600 font-bold font-serif'>ITJobHunter</h1>
                </Link>
                <Button
                    variant='ghost'
                    className='text-md  text-gray-500 hover:text-gray-900 hover:bg-white'
                    onClick={handleSearch}
                >
                    Jobs
                </Button>
                <Link to='/companyAll'>
                    <Button variant='ghost' className='text-md text-gray-500 hover:text-gray-900 hover:bg-white'>
                        Companies
                    </Button>
                </Link>
                {employee && (
                    <Button
                        variant='ghost'
                        className='text-md text-gray-500 hover:text-gray-900 hover:bg-white'
                        onClick={solveOnClick}
                    >
                        Chat
                    </Button>
                )}
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
                    <Link to={`profile/${employee?._id}`}>
                        <Avatar>
                            <AvatarImage src={employee?.avatar} alt='Profile Picture' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Link>
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
