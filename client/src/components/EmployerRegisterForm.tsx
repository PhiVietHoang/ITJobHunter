import { Link } from 'react-router-dom'

const EmployerRegisterForm = () => {
    return (
        <form className='px-16 py-12 flex flex-col gap-6 bg-white rounded-lg'>
            <div className='mx-auto '>
                <h1 className='font-serif text-4xl font-bold text-cyan-600'>ITJobHunter</h1>
                <p className='text-center text-md font-semibold text-cyan-600'>Right place for employers!</p>
            </div>
            <div className='flex justify-between items-end'>
                <span className='text-2xl font-semibold'>Register</span>
                <span className='text-xl font-semibold text-[#275df5] hover:underline cursor-pointer'>
                    <Link to='../login'>Already have an account?</Link>
                </span>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='font-semibold'>
                    Email
                </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    placeholder='Enter your email'
                    className='py-3 px-4 rounded-2xl border-black border focus:outline-[#275df5]'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='password' className='font-semibold'>
                    Password
                </label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    required
                    placeholder='Enter your password'
                    className='py-3 px-4 rounded-2xl border-black border focus:outline-[#275df5]'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='password' className='font-semibold'>
                    Confirm password
                </label>
                <input
                    type='password'
                    id='passwordConfirm'
                    name='passwordConfirm'
                    required
                    placeholder='Confirm your password'
                    className='py-3 px-4 rounded-2xl border-black border focus:outline-[#275df5]'
                />
            </div>
            <button
                type='submit'
                className='my-6 py-4 w-full text-xl text-semibold text-white bg-[#275df5] hover:bg-[#275df5cc] rounded-[60px]'
            >
                Register
            </button>
        </form>
    )
}

export default EmployerRegisterForm
