import React, { useState } from 'react'
import { Briefcase, DollarSign, MapPin, Timer } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Input } from '~/components/ui/input'
import { createJobApplication } from '~/services/api'
import { RootState } from '~/store'

const EmployeeJobDetail = () => {
    const token = useSelector((state: RootState) => state.employeeAuth.employeeToken)
    const navigate = useNavigate()
    const { state } = useLocation()
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [error, setError] = useState('')

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setCvFile(event.target.files[0])
        }
    }

    const handleApply = async () => {
        if (!cvFile) {
            setError('Please select a CV file to upload.')
            return
        }

        try {
            await createJobApplication(
                {
                    jobId: state._id,
                    employeeId: employee._id,
                    cv: cvFile,
                    status: 'Pending'
                },
                token
            )
            navigate('/job-applications')
        } catch (error) {
            setError('Failed to apply for the job.')
        }
    }

    return (
        <div className='my-8 grid grid-cols-[3fr_1fr] gap-4'>
            <div className='p-8 bg-white rounded-lg'>
                <div className='flex justify-between'>
                    <h1 className='mb-8 text-3xl font-semibold'>{state.title}</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='outline'>Apply now</Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-md'>
                            <DialogHeader>
                                <DialogTitle>Job Application</DialogTitle>
                                <DialogDescription>Please upload your CV</DialogDescription>
                            </DialogHeader>
                            <div className='grid flex-1 gap-2'>
                                <Input
                                    id='picture'
                                    type='file'
                                    className='cursor-pointer'
                                    onChange={handleFileChange}
                                />
                                {error && <p className='text-red-500 text-center'>{error}</p>}
                            </div>
                            <DialogFooter className='sm:justify-start'>
                                <DialogClose asChild>
                                    <Button type='button' variant='secondary'>
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button onClick={handleApply}>Apply</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <section className='my-4 flex items-center gap-4'>
                    <div className='flex items-center gap-1'>
                        <Briefcase className='w-5' />
                        <span>{state.yearsOfExp}</span>
                    </div>
                    |
                    <div className='flex items-center gap-1'>
                        <DollarSign className='w-5' />
                        <span>{state.offerSalary}</span>
                    </div>
                    |
                    <div className='flex items-center gap-1'>
                        <MapPin className='w-5' />
                        <span>{state.location}</span>
                    </div>
                    |
                    <div className='flex items-center gap-1'>
                        <Timer className='w-5' />
                        <span>{state.workingTime}</span>
                    </div>
                </section>
                <section className='my-8 grid grid-cols-[max-content_1fr] gap-x-4'>
                    <h3 className='text-md font-semibold'>Categories:</h3>
                    <div className='flex items-center'>
                        {state.categories.map((category: string, index: number) => (
                            <Badge key={index} variant='secondary'>
                                {category}
                            </Badge>
                        ))}
                    </div>
                    <h3 className='text-md font-semibold'>Required Skills:</h3>
                    <div className='flex items-center'>
                        {state.requiredSkills.map((skill: string, index: number) => (
                            <Badge key={index} variant='secondary'>
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </section>
                <p className='my-8'>{state.description}</p>
                <div className='grid grid-cols-[max-content_1fr] gap-x-4'>
                    <span className='font-semibold'>Level:</span>
                    <span>{state.level}</span>
                    <span className='font-semibold'>Start date:</span>
                    <span>{state.startDate.substring(0, 10)}</span>
                    <span className='font-semibold'>End date:</span>
                    <span>{state.endDate.substring(0, 10)}</span>
                </div>
            </div>
            <div className='p-8  bg-white rounded-lg h-min'>
                <div className='grid grid-cols-[max-content_1fr] gap-4 items-center'>
                    <Avatar className='w-12 h-12'>
                        <AvatarImage src={state.companyID.companyLogo} />
                        <AvatarFallback className='text-sm'>Avatar</AvatarFallback>
                    </Avatar>
                    <h1 className='text-lg font-semibold'>{state.companyID.companyName}</h1>
                </div>
                <h3 className='mt-4 font-semibold'>Location list:</h3>
                <ul>
                    {state.companyID.companyLocations.map((location: string, index: number) => (
                        <li key={index} className='text-sm'>{`${index + 1}. ${location}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default EmployeeJobDetail
