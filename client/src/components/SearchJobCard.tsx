import { format } from 'date-fns'
import { Briefcase, DollarSign, MapPin, Timer } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'

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
}

const SearchJobCard = (props: JobData) => {
    return (
        <div className='py-4 px-6 min-w-min w-full bg-white rounded-lg cursor-pointer hover:shadow-md'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='font-bold'>{props.title}</p>
                    <p className='text-sm font-semibold'>{props.companyID?.companyName}</p>
                </div>
                <Avatar className='w-12 h-12 rounded-xl'>
                    <AvatarImage src={props.companyID?.companyLogo} />
                    <AvatarFallback>
                        <span className='text-xs'>Avatar</span>
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className='my-2 flex items-center gap-2 lg:gap-4'>
                <p className='flex items-center gap-1 '>
                    <Briefcase className='w-5' />
                    <span>{props.yearsOfExp}</span>
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
                    {props.categories.map((category, index) => (
                        <Badge key={index} variant='secondary'>
                            {category}
                        </Badge>
                    ))}
                </div>
                <span className='w-min text-sm font-semibold'>Required skills:</span>
                <div className='col-span-4 flex items-center gap-2'>
                    {props.requiredSkills.map((skill, index) => (
                        <Badge key={index} variant='secondary'>
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className='my-2'>
                <p className='text-md italic line-clamp-3'>{props.description}</p>
            </div>
            <div className='my-2 flex items-center gap-4'>
                <span className='text-sm'>Number of positions: {props.maxPositions}</span>|
                <span className='text-sm'>
                    Hiring date: {props.startDate && format(new Date(props.startDate), 'dd/MM/yyyy')}
                    {props.endDate && ` to ${format(new Date(props.endDate), 'dd/MM/yyyy')}`}
                </span>
            </div>
        </div>
    )
}

export default SearchJobCard
