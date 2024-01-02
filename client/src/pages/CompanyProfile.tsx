import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '~/store'
import { Button } from '~/components/ui/button'
import { useEffect, useState } from 'react'
import { getCompanyInsight } from '~/services/companyApi'

interface JobPerformance {
    jobTitle: string
    totalApplications: number
}

interface CompanyInsight {
    totalJobs: number
    totalApplications: number
    unhandledApplications: number
    acceptedApplications: number
    bestPerformanceJobs: JobPerformance[]
}

const CompanyProfile = () => {
    const navigate = useNavigate()
    const company = useSelector((state: RootState) => state.employerAuth.company)
    const [insight, setInsight] = useState<CompanyInsight>({
        totalJobs: 0,
        totalApplications: 0,
        unhandledApplications: 0,
        acceptedApplications: 0,
        bestPerformanceJobs: []
    })

    useEffect(() => {
        if (!company) return
        const fetchInsight = async () => {
            const res = await getCompanyInsight(company._id)
            if (res?.status === 200) {
                console.log(res.data)
                setInsight(res.data)
            }
        }
        fetchInsight()
    }, [company])

    if (!company) return null

    return (
        <div className='my-8 py-6 px-8 flex flex-col bg-white rounded-lg'>
            <div className='relative grid grid-cols-[20%_70%] gap-x-8 items-start'>
                <Button
                    variant='secondary'
                    className='absolute top-0 right-0 shadow-md'
                    onClick={() => navigate('/employer/profile/edit')}
                >
                    Edit profile
                </Button>
                <div className='aspect-square flex justify-center items-center overflow-hidden border rounded-lg shadow-md'>
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
            <div className='my-4 flex justify-center items-center gap-4'>
                <Link to='/employer/jobs'>
                    <Button variant='outline' className='shadow-md'>
                        Manage jobs
                    </Button>
                </Link>
                <Link to='/employer/jobApplications'>
                    <Button variant='outline' className='shadow-md'>
                        Manage job applications
                    </Button>
                </Link>
            </div>
            <h1 className='my-4 text-center text-xl font-semibold'>Company Insight</h1>
            <div className='my-4 p-4 grid grid-cols-[1fr_2fr_2fr_2fr_2fr] border rounded-lg shadow-md'>
                <p className='font-semibold'></p>
                <p className='font-semibold'>My jobs</p>
                <p className='font-semibold'>Received applications</p>
                <p className='font-semibold'>Accepted applications</p>
                <p className='font-semibold'>Unhandled applications</p>

                <p className='font-semibold'>Count</p>
                <p>{insight.totalJobs}</p>
                <p>{insight.totalApplications}</p>
                <p>{insight.acceptedApplications}</p>
                <p>{insight.unhandledApplications}</p>
            </div>
            <ul className='py-4 text-center border rounded-lg shadow-md'>
                <p className='font-semibold'>Best performance jobs</p>
                {insight.bestPerformanceJobs.map((job, index) => (
                    <li key={index}>
                        <span>{`${index + 1}. `}</span>
                        <span className='font-semibold italic'>{job.jobTitle}</span> with{' '}
                        <span className='font-semibold italic'>{job.totalApplications}</span> applications
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CompanyProfile
