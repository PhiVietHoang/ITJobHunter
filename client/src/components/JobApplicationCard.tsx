/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from './ui/button'

interface JobApplicationCardProps {
    employeeId: any
    jobId: any
    applicationDate: Date
    cv: string
    status: string
}

const JobApplicationCard = (props: JobApplicationCardProps) => {
    const handleAccept = () => {
        console.log('Accept')
    }
    const handleReject = () => {
        console.log('Reject')
    }
    return (
        <div className='p-4 w-full min-w-max flex justify-between items-start bg-white rounded-md shadow-sm'>
            <div>
                <h1 className='font-semibold text-md'>{props.employeeId.name}</h1>
                <h1 className='font-semibold text-md'>{props.jobId.title}</h1>
                <div className='my-4 w-full h-64 overflow-hidden'>
                    <img src={props.cv} alt='CV' />
                </div>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Button variant='secondary' onClick={handleAccept}>
                    Accept
                </Button>
                <Button variant='destructive' onClick={handleReject}>
                    Reject
                </Button>
            </div>
        </div>
    )
}

export default JobApplicationCard
