import { format } from 'date-fns'
import { Briefcase, DollarSign, MapPin, Timer } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'

interface SearchJobCardProps {
    title: string
    categories: string[]
    companyName: string
    companyLogo: string
    workingTime: string
    location: string
    experience: string
    description: string
    startDate: string
    endDate: string
    maxPositions: number
    offerSalary: string
    requiredSkills: string[]
}

const SearchJobCard = (props: SearchJobCardProps) => {
    return (
        <div className='py-4 px-6 min-w-min bg-white rounded-lg cursor-pointer hover:shadow-md'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='font-bold'>{props.title}</p>
                    <p className='text-sm font-semibold'>{props.companyName}</p>
                </div>
                <Avatar className='w-12 h-12 rounded-xl'>
                    <AvatarImage src={props.companyLogo} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className='my-2 flex items-center gap-2 lg:gap-4'>
                <p className='flex items-center gap-1 '>
                    <Briefcase className='w-5' />
                    <span>{props.experience}</span>
                </p>
                |
                <p className='flex items-center gap-1 '>
                    <DollarSign className='w-5' />
                    <span>{props.offerSalary}</span>
                </p>
                |
                <p className='flex items-center gap-1 '>
                    <MapPin className='w-5' />
                    <span>{props.location}</span>
                </p>
                |
                <p className='flex items-center gap-1 '>
                    <Timer className='w-5' />
                    <span>{props.workingTime}</span>
                </p>
            </div>
            <div className='grid grid-cols-5 gap-y-2 overflow-hidden'>
                <span className='w-min text-sm font-semibold'>Category:</span>
                <div className='col-span-4 flex items-center gap-2'>
                    {props.categories.map((category) => (
                        <Badge variant='secondary'>{category}</Badge>
                    ))}
                </div>
                <span className='w-min text-sm font-semibold'>Required skills:</span>
                <div className='col-span-4 flex items-center gap-2'>
                    {props.requiredSkills.map((skill) => (
                        <Badge variant='secondary'>{skill}</Badge>
                    ))}
                </div>
            </div>
            <div className='my-2'>
                <p className='text-md italic line-clamp-3'>{props.description}</p>
            </div>
            <div className='my-2 flex items-center gap-4'>
                <span className='text-sm'>Number of positions: {props.maxPositions}</span>|
                <span className='text-sm'>
                    Hiring date: {format(new Date(props.startDate), 'dd/MM/yyyy')} to{' '}
                    {format(new Date(props.endDate), 'dd/MM/yyyy')}
                </span>
            </div>
        </div>
    )
}

export default SearchJobCard
