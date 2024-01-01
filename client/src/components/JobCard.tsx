import { Briefcase, DollarSign, Timer } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '~/components/ui/dialog'
import { deleteJob } from '~/services/companyApi'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

interface JobCardProps {
    _id: string
    title: string
    categories: string[]
    level: string
    requiredSkills: string[]
    maxPositions: number
    yearsOfExp: string
    description: string
    workingTime: string
    offerSalary: number
    startDate: Date
    endDate: Date
}

const JobCard = (props: JobCardProps) => {
    const token = useSelector((state: RootState) => state.employerAuth.employerToken)
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`${props._id}/edit`)
    }

    const handleDelete = async () => {
        const res = await deleteJob(props._id, token)
        if (res?.status === 200) {
            navigate('/employer/jobs')
            window.location.reload()
        } else {
            console.log(res)
        }
    }

    return (
        <div className='p-4 w-full min-w-max flex justify-between items-start bg-white rounded-md shadow-sm'>
            <div>
                <h1 className='font-semibold text-md'>{props.title}</h1>
                <div className='my-2 flex items-center gap-2 lg:gap-4'>
                    <p className='flex items-center gap-1 '>
                        <DollarSign className='w-5' />
                        <span>{props.offerSalary}</span>
                    </p>
                    |
                    <p className='flex items-center gap-1 '>
                        <Briefcase className='w-5' />
                        <span>{props.yearsOfExp}</span>
                    </p>
                    |
                    <p className='flex items-center gap-1 '>
                        <Timer className='w-5' />
                        <span>{props.workingTime}</span>
                    </p>
                </div>
                <p className='my-2 text-sm line-clamp-1'>{props.description}</p>
                <p className='text-sm text-gray-500'>Received applications: 1000</p>
                <div className='flex justify-start items-center gap-4'>
                    <span className='text-sm text-gray-500'>Start date: {props.startDate?.toString()}</span>
                    <span className='text-sm text-gray-500'>End date: {props.endDate?.toString()}</span>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <Button variant='secondary' onClick={handleEdit}>
                    Edit
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='destructive'>Delete</Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-md'>
                        <DialogHeader>
                            <DialogTitle>Delete this job?</DialogTitle>
                            <DialogDescription>
                                Are you sure to delete this job? All job application related will be deleted also
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className='sm:justify-center px-10'>
                            <DialogClose asChild>
                                <Button type='button' variant='secondary'>
                                    Close
                                </Button>
                            </DialogClose>
                            <Button onClick={handleDelete}>Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default JobCard
