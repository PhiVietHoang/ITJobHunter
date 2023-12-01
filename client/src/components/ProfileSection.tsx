import { ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'

interface ProfileSectionProps {
    title: string
    description: string
    editLink?: string
    children?: ReactNode
}

const ProfileSection = ({ title, description, editLink, children }: ProfileSectionProps) => {
    const navigate = useNavigate()
    return (
        <div
            className='relative w-full p-8 bg-white rounded-3xl shadow-sm'
            onClick={() => {
                if (editLink) navigate(editLink)
            }}
        >
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
