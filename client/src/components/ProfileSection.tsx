import { ReactNode } from 'react'

interface ProfileSectionProps {
    title: string
    description: string
    children?: ReactNode
}

const ProfileSection = ({ title, description, children }: ProfileSectionProps) => {
    return (
        <div className='relative w-full p-8 bg-white rounded-3xl shadow-sm'>
            <button className='absolute right-8 text-[#275df5] font-semibold hover:underline'>Edit</button>
            <h3 className='font-semibold'>{title}</h3>
            <div className='mt-4'>
                {!children && <p className='text-sm text-gray-600'>{description}</p>}
                {children}
            </div>
        </div>
    )
}

export default ProfileSection
