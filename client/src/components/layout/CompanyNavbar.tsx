import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { RootState } from '~/store'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { setChatSelected } from '~/features/chatSlice'

const CompanyNavbar = () => {
    const token = useSelector((state: RootState) => state.employerAuth.employerToken)
    const company = useSelector((state: RootState) => state.employerAuth.company)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem('employerToken')
        navigate('/')
        window.location.reload()
    }

    const solveOnClick = () => {
        navigate('/employer/chat')
        dispatch(setChatSelected(false))
    }

    return (
        <nav className='py-4 flex justify-between items-center'>
            <div className='flex items-center gap-12'>
                <Link to='/employer'>
                    <h1 className='text-xl text-cyan-600 font-bold font-serif'>ITJobHunter</h1>
                </Link>
                <Link to='/employer/jobs'>
                    <Button variant='ghost' className='text-md text-gray-500 hover:text-gray-900 hover:bg-white'>
                        Jobs
                    </Button>
                </Link>
                <Link to='/employer/jobApplications'>
                    <Button variant='ghost' className='text-md  text-gray-500 hover:text-gray-900 hover:bg-white'>
                        Job Applications
                    </Button>
                </Link>
                {company && (
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
                    <Link to={`profile/${company?._id}`}>
                        <Avatar>
                            <AvatarImage src={company?.companyLogo} alt='Profile Picture' />
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

export default CompanyNavbar
