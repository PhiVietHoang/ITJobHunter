import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '~/components/ui/button'
import { deleteJobApplication, getJobApplicationsByEmployee, downloadCV } from '~/services/api'
import { RootState } from '~/store'

type JobApplication = {
    _id: string
    employeeId: string
    jobId: {
        _id: string
        title: string
        categories: string[]
        level: string
        requiredSkills: string[]
        maxPositions: number
        yearsOfExperience: number
        description: string
        workingTime: string
        offerSalary: number
        startDate: string
        endDate: string
        companyID: string
    }
    cv: {
        data: string
        contentType: string
    }
    status: string
    applicationDate: string
}

const EmployeeJobApplication = () => {
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([])
    const token = localStorage.getItem('employeeToken')!

    useEffect(() => {
        const fetchJobApplications = async () => {
            const res = await getJobApplicationsByEmployee(employee._id, token)
            setJobApplications(res?.data)
        }
        fetchJobApplications()
    }, [employee])

    const handleDelete = (id: string) => {
        deleteJobApplication(id)
        window.location.reload()
    }

    if (!employee) return null
    if (jobApplications.length === 0)
        return (
            <div className='my-8 mx-auto p-8 w-2/3 bg-white rounded-lg min-w-max'>
                <div className='mb-4 text-2xl font-bold'>You have not apply for any jobs yet</div>
                <Link to='/'>
                    <span className='text-sm underline'>Search for jobs here</span>
                </Link>
            </div>
        )
    return (
        <div className='my-8 mx-auto p-8 w-2/3 bg-white rounded-lg min-w-max'>
            <h1 className='text-3xl font-bold'>Your Job Applications</h1>
            <div className=' my-8 grid grid-cols-[1fr] gap-4'>
                {jobApplications.map((jobApplication) => (
                    <div key={jobApplication._id} className='p-4 hover:bg-gray-50 rounded-lg flex gap-4'>
                        {/* <Button variant='default' onClick={() => downloadCV(jobApplication._id)}>
                            Download CV
                        </Button> */}
                        <div className='grow min-h-max'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-xl font-semibold'>{jobApplication.jobId.title}</h1>
                                {jobApplication.status === 'Pending' && (
                                    <Button variant='destructive' onClick={() => handleDelete(jobApplication._id)}>
                                        Cancel
                                    </Button>
                                )}
                            </div>

                            <p>
                                <span className='font-semibold mr-4'>Status: </span>
                                <span
                                    className={`${
                                        jobApplication.status === 'Accepted'
                                            ? 'text-red-500'
                                            : jobApplication.status === 'Rejected'
                                            ? 'text-lime-600'
                                            : ''
                                    }`}
                                >
                                    {jobApplication.status}
                                </span>
                            </p>
                            <p>
                                <span className='font-semibold mr-4'>Maximum positions: </span>
                                {jobApplication.jobId.maxPositions}
                            </p>
                            <p>
                                <span className='font-semibold mr-4'>Application Date: </span>
                                {jobApplication.applicationDate.slice(0, 10)}
                            </p>
                            <p>
                                <span className='font-semibold mr-4'>Start Date: </span>
                                {jobApplication.jobId.startDate.slice(0, 10)}
                            </p>
                            <p>
                                <span className='font-semibold mr-4'>End Date: </span>
                                {jobApplication.jobId.endDate.slice(0, 10)}
                            </p>
                            <span className='font-semibold mr-4'>CV: </span>
                            <a
                                className='cursor-pointer hover:text-blue-500 underline'
                                onClick={() => downloadCV(jobApplication._id)}
                            >
                                Download your CV here
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EmployeeJobApplication
