import { Outlet } from 'react-router-dom'

import Navbar from './components/layout/Navbar'

const App = () => {
    return (
        <div>
            <div className='bg-white'>
                <div className='mx-auto w-2/3'>
                    <Navbar />
                </div>
            </div>
            <div className='mx-auto w-2/3'>
                <Outlet />
            </div>
        </div>
    )
}

export default App
