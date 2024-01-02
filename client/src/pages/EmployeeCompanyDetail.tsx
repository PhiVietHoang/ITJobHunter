import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { MapPin, Phone, Mail, Link2 } from 'lucide-react'
import { getJobByCompany } from '~/services/api'
import SearchJobCard from '~/components/SearchJobCard'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setChatSelected, setReceiverSelected } from '../features/chatSlice'
import { useDispatch } from 'react-redux'
import { RootState } from '~/store'
import { useSelector } from 'react-redux/es/hooks/useSelector'

interface JobData {
    _id: string
    title: string
    categories: string[]
    workingTime: string
    location: string
    yearsOfExp: string
    description: string
    startDate: string
    endDate: string
    maxPositions: number
    offerSalary: string
    requiredSkills: string[]
    companyID: {
        _id: string
        companyLogo: string
        companyName: string
        companyLocations: string[]
    }
    jobApplicationCount: number
}

const EmployeeCompanyDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('overview')
    const { state } = useLocation()
    const [jobByCompany, setJobByCompany] = useState<JobData[]>()
    const token = useSelector((state: RootState) => state.employeeAuth.employeeToken)

    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }

    const getJobByCompanyId = async (companyID: string) => {
        const response = await getJobByCompany(companyID)
        if (response?.status === 200) {
            setJobByCompany(response.data)
        } else {
            console.log(response)
        }
    }

    const handleClick = async () => {
        if (!token) {
            navigate('/auth/login')
        } else {
            navigate('/employee/chat')
            dispatch(setChatSelected('basic'))
            dispatch(setReceiverSelected(state))
        }
    }

    useEffect(() => {
        getJobByCompanyId(state._id)
    })

    return (
        <div className='bg-gray-50 relative p-0'>
            <div className='relative z-10 w-full h-32 bg-indigo-100 bg-opacity-80 m-0'></div>
            <div className='rounded-t-lg z-20 w-full bg-gray-50 relative m-0 min-h-screen'>
                <div className='w-2/3 mx-auto relative flex'>
                    <div className='absolute -top-10 relative'>
                        <div className='h-40 w-40 overflow-hidden rounded-2xl bg-white'>
                            {state.companyLogo && (
                                <img
                                    src={state.companyLogo}
                                    alt='companylogo'
                                    className='w-full h-full object-contain object-center'
                                />
                            )}
                            {!state.companyLogo && (
                                <div className='w-full h-full flex items-center justify-center'>
                                    <span> Avatar </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='relative pt-4 pl-7 w-full pr-3'>
                        <div className='flex-row'>
                            <h1 className='text-3xl font-black'>{state.companyName}</h1>
                            <div className='text-base leading-snug pt-3 text-gray-900'>{state.description}</div>
                        </div>
                    </div>
                    <div className='abosolute -right-0'>
                        <button
                            className='bg-[#275df5] hover:bg-[#275df5ee] font-semibold text-white text-md px-6 py-2 rounded-full mt-4 mr-2'
                            onClick={handleClick}
                        >
                            Contact
                        </button>
                    </div>
                </div>
                <div className='w-2/3 mx-auto mt-5'>
                    <div className='flex flex-col'>
                        <div className='h-3'></div>
                        <div className='h-12 pt-2 mb-0'>
                            <div className='flex justify-start mr-30'>
                                <div
                                    className={`pr-8 pl-10 text-2xl font-bold cursor-pointer hover:text-blue-500 transition duration-300 ${
                                        activeTab === 'overview' ? 'text-black' : 'text-gray-400'
                                    }`}
                                    onClick={() => handleTabClick('overview')}
                                >
                                    Overview
                                </div>
                                <div
                                    className={`px-8 text-2xl font-bold cursor-pointer hover:text-blue-500 transition duration-300 ${
                                        activeTab === 'jobs' ? 'text-black' : 'text-gray-400'
                                    }`}
                                    onClick={() => handleTabClick('jobs')}
                                >
                                    Jobs
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='w-full border-1 text-gray-500 bg-gray-500 h-px m-0' />
                    {/* Content for Overview */}
                    {activeTab === 'overview' && (
                        <div className='mt-6 p-2 pl-10 pt-6 rounded-2xl w-full bg-white relative'>
                            <h2 className='text-xl font-bold text-black mb-4 pb-3 pt-2'>More information</h2>
                            <div className='mt-2 relative grid grid-cols-2 gap-x-8'>
                                <div className='mb-4'>
                                    <div className='flex items-center'>
                                        <div className='relative pr-4'>
                                            <MapPin />
                                        </div>
                                        <div className='relative text-lg font-semibold text-black text-opacity-80'>
                                            Location
                                        </div>
                                    </div>
                                    <div className='pt-4 pl-6'>
                                        {state.companyLocations?.map((str: string, index: number) => (
                                            <div key={index} className='pb-3'>
                                                {index + 1}. {str}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center pb-4'>
                                        <div className='relative pr-4'>
                                            <Phone />
                                        </div>
                                        <div className='relative text-lg font-semibold text-black text-opacity-80'>
                                            Phone
                                        </div>
                                    </div>
                                    <div className='pl-6'>
                                        {state.companyPhoneNumbers?.map((str: string, index: number) => (
                                            <div key={index} className='pb-3'>
                                                {index + 1}. {str}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center pb-4'>
                                        <div className='relative pr-4'>
                                            <Mail />
                                        </div>
                                        <div className='relative text-lg font-semibold text-black text-opacity-80'>
                                            Email
                                        </div>
                                    </div>
                                    <div className='pl-6'>
                                        {state.companyEmails?.map((str: string, index: number) => (
                                            <div key={index} className='pb-3'>
                                                {str}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center pb-4'>
                                        <div className='relative pr-4'>
                                            <Link2 />
                                        </div>
                                        <div className='relative text-lg font-semibold text-black text-opacity-80'>
                                            Website
                                        </div>
                                    </div>
                                    <div className='pl-6'>
                                        {state.companyWebsites?.map((str: string, index: number) => (
                                            <div key={index} className='pb-3'>
                                                <a
                                                    href=''
                                                    className='font-semibold text-opacity-60 hover:text-blue-500 transition duration-500'
                                                >
                                                    {str}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='h-5'></div>
                            {/* Your Overview content goes here */}
                        </div>
                    )}

                    {/* Content for Jobs */}
                    {activeTab === 'jobs' && (
                        <div className='mt-4 p-4 rounded w-full'>
                            {jobByCompany?.map((result, index) => (
                                <div
                                    key={index}
                                    className={`mb-${index === jobByCompany.length - 1 ? '0' : '5'} pb-3`}
                                    onClick={() => navigate(`/job/${result._id}`, { state: result as JobData })}
                                >
                                    <SearchJobCard {...result} />
                                </div>
                            ))}
                            <div className='h-7'> </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EmployeeCompanyDetail
