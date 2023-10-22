import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

const Navbar = () => {
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
                <Button
                    variant='outline'
                    className='px-6 text-md rounded-full border-[#275df5] text-[#275df5] hover:text-[#275df5]'
                >
                    Login
                </Button>
                <Button variant='default' className='px-6 text-md rounded-full bg-[#f05537] hover:bg-[#f05537dd]'>
                    Register
                </Button>
                <Separator orientation='vertical' className='w-2' />
                <Button variant='ghost' className='px-6 text-md text-gray-500 rounded-full'>
                    For employers
                </Button>
            </div>
        </nav>
    )
}

export default Navbar
