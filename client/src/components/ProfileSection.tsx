const ProfileSection = (props: { title: string; description: string }) => {
    return (
        <div className='relative w-full p-8 bg-white rounded-3xl shadow-sm'>
            <button className='absolute right-8 text-[#275df5] font-semibold hover:underline'>Edit</button>
            <h3 className='font-semibold'>{props.title}</h3>
            <p className='mt-4 text-sm text-gray-600'>{props.description}</p>
        </div>
    )
}

export default ProfileSection
