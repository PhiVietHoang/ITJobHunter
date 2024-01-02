import { FaWhatsapp } from 'react-icons/fa'

const DummyChatCard = () => {
    return (
        <div className={`w-full h-full hidden bg-white   text-black lg:flex items-center justify-center  flex-col`}>
            <FaWhatsapp className='text-4xl mb-4' />
            <h1 className='text-xl font-semibold tracking-wider'>Web Chat Application</h1>
            <p className='text-xs  my-1'>Explore, chat, connect, and conquer conversations!</p>
        </div>
    )
}

export default DummyChatCard
