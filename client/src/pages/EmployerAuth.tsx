import { Outlet } from 'react-router-dom'

import bgImage from '/employer-auth-bg.jpg'

const EmployerAuth = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='absolute left-0 top-0 h-full overflow-hidden'>
                <img src={bgImage} alt='background' className='w-[1920px] h-[1080px] object-cover' />
            </div>
            <div className='z-10 w-full flex justify-center items-center'>
                <div className='w-1/3'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default EmployerAuth
