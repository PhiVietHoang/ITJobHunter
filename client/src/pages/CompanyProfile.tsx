import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '~/store'
import { Button } from '~/components/ui/button'

const CompanyProfile = () => {
    const navigate = useNavigate()
    const company = useSelector((state: RootState) => state.employerAuth.company)

    if (!company) return null

    return (
        <div className='my-8 p-4 flex flex-col bg-white rounded-lg'>
            <div className='relative grid grid-cols-[20%_70%] gap-x-8 items-start'>
                <Button
                    variant='secondary'
                    className='absolute top-0 right-0'
                    onClick={() => navigate('/employer/profile/edit')}
                >
                    Edit profile
                </Button>
                <div className='aspect-square flex justify-center items-center overflow-hidden border rounded-lg'>
                    {company.companyLogo && (
                        <img src={company.companyLogo} alt='Company Logo' className='w-full object-cover' />
                    )}
                </div>
                <div className='text-md'>
                    <h1 className='text-2xl font-semibold'>{company.companyName}</h1>
                    <div className='my-2 grid grid-cols-2'>
                        <p>Email: {company.email}</p>
                        <p>Phone: {company.phoneNumber}</p>
                        <ul className='list-disc'>
                            <h2>Websites:</h2>
                            {company.companyWebsites.map((website, index) => (
                                <li className='ml-4' key={index}>
                                    {website}
                                </li>
                            ))}
                        </ul>
                        <ul className='list-disc'>
                            <h2>Locations:</h2>
                            {company.companyLocations.map((location, index) => (
                                <li className='ml-4' key={index}>
                                    {location}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className='my-4'>{company.description}</p>
                </div>
            </div>
            <div className='my-4 flex justify-center items-center'>
                <Link to='/employer/jobs'>
                    <Button variant='outline'>Manage jobs</Button>
                </Link>
                <Link to='/employer/jobApplications'>
                    <Button variant='outline'>Manage job applications</Button>
                </Link>
            </div>
            <h1 className='my-4 text-center text-xl font-semibold'>Company Insight</h1>
            <div className='my-4 p-4 grid grid-cols-[1fr_2fr_2fr_2fr] border rounded-lg'>
                <p className='font-semibold'></p>
                <p className='font-semibold'>My jobs</p>
                <p className='font-semibold'>Received applications</p>
                <p className='font-semibold'>Unhandled applications</p>

                <p className='font-semibold'>Count</p>
                <p>12</p>
                <p>875</p>
                <p>143</p>
            </div>
            <ul className='text-center'>
                <p className='my-2 font-semibold'>Best performance jobs</p>
                <li>
                    <span className='font-semibold italic'>Job 1</span> with{' '}
                    <span className='font-semibold italic'>125</span> applications
                </li>
                <li>
                    <span className='font-semibold italic'>Job 2</span> with{' '}
                    <span className='font-semibold italic'>109</span> applications
                </li>
                <li>
                    <span className='font-semibold italic'>Job 2</span> with{' '}
                    <span className='font-semibold italic'>71</span> applications
                </li>
            </ul>
        </div>
    )
}

export default CompanyProfile
