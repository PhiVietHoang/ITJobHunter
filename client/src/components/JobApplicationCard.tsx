/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateJobApplicationStatus } from '~/services/companyApi'
import { Button } from './ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from './ui/dialog'
import { useNavigate } from 'react-router-dom'

interface JobApplicationCardProps {
    _id: string
    employeeId: {
        _id: string
        email: string
        phoneNumber: string
        name: string
    }
    jobId: {
        _id: string
        title: string
        categories: string[]
        level: string
        requriedSkills: string[]
        maxPositions: number
        yearsOfExp: string
        description: string
        workingTime: string
        offerSalary: string
        startTime: Date
        endDate: Date
        company: string
    }
    applicationDate: Date
    cv: string
    status: string
}

const JobApplicationCard = (props: JobApplicationCardProps) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('employerToken')!

    const handleAccept = async () => {
        const res = await updateJobApplicationStatus({ status: 'Accepted' }, props._id, token)
        if (res?.status === 200) {
            navigate('/employer/jobApplications')
            window.location.reload()
        } else {
            console.log(res)
        }
    }

    const handleReject = async () => {
        const res = await updateJobApplicationStatus({ status: 'Rejected' }, props._id, token)
        if (res?.status === 200) {
            navigate('/employer/jobApplications')
            window.location.reload()
        } else {
            console.log(res)
        }
    }

    return (
        <div className='p-4 w-full min-w-max flex justify-between items-start bg-white rounded-md shadow-sm'>
            <div>
                <h1 className='text-2xl font-semibold '>{props.employeeId?.name}</h1>
                <h1 className='text-md'>{props.jobId?.title}</h1>
                <h1 className='text-md'>Status: {props.status}</h1>
                <h1 className='text-md'>Date: {new Date(props.applicationDate).toUTCString()}</h1>
                <div className='my-4 w-full min-h-64 overflow-hidden'>
                    <a href='' className='hover:text-blue-500'>
                        CV: Click Here
                    </a>
                </div>
            </div>

            {props.status === 'Pending' && (
                <div className='grid grid-cols-2 gap-2'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='secondary'>Accept</Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-md'>
                            <DialogHeader>
                                <DialogTitle>Accept this job application?</DialogTitle>
                                <DialogDescription>
                                    Are you sure to accept this job application. Remember you can not change your
                                    option.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className='sm:justify-center px-10'>
                                <Button onClick={handleAccept}>Confirm</Button>
                                <DialogClose asChild>
                                    <Button type='button' variant='secondary'>
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='destructive'>Reject</Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-md'>
                            <DialogHeader>
                                <DialogTitle>Reject this job application?</DialogTitle>
                                <DialogDescription>
                                    Are you sure to reject this job application. Remember you can not change your
                                    option.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className='sm:justify-center px-10'>
                                <Button onClick={handleReject}>Confirm</Button>
                                <DialogClose asChild>
                                    <Button type='button' variant='secondary'>
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
    )
}

export default JobApplicationCard
