import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Slider } from '~/components/ui/slider'
import SearchJobCard from '~/components/SearchJobCard'
import { Input } from '~/components/ui/input'
import Pagination from '~/components/Pagination'
import { searchJobs } from '~/services/api'

interface SearchResult {
    title: string
    categories: string[]
    companyName: string
    companyLogo: string
    workingTime: string
    location: string
    yearsOfExp: string
    description: string
    startDate: string
    endDate: string
    maxPositions: number
    offerSalary: string
    requiredSkills: string[]
}

const Search = () => {
    const location = useLocation()
    const [searchResults, setSearchResults] = useState(location.state as SearchResult[])

    const [currentPage, setCurrentPage] = useState(0)

    const handlePageChange = async (page: number) => {
        const response = await searchJobs({ title: '', page })
        if (response?.status === 200) {
            setSearchResults(response.data)
            setCurrentPage(page)
            window.scrollTo(0, 0)
        } else {
            console.log(response)
        }
    }

    return (
        <div className='my-8'>
            <div className='my-8 flex items-start gap-4'>
                <div className='px-4 w-1/4 lg:w-[30%] min-w-min h-max bg-white rounded-lg shadow-sm'>
                    <h1 className='my-4 text-lg font-bold'>Filters</h1>
                    <div className='my-6'>
                        <p className='my-2 font-semibold'>Experience</p>
                        <Slider defaultValue={[0]} max={10} step={1} />
                    </div>
                    <RadioGroup defaultValue='full-time' className='my-6'>
                        <p className='my-2 font-semibold'>Working Time</p>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='full-time' id='full-time' />
                            <Label htmlFor='full-time'>Full-time</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='part-time' id='part-time' />
                            <Label htmlFor='part-time'>Part-time</Label>
                        </div>
                    </RadioGroup>
                    <div className='my-6'>
                        <p className='my-2 font-semibold'>Salary</p>
                        <div className='grid grid-cols-2 gap-x-2'>
                            <Input type='number' placeholder='Min' />
                            <Input type='number' placeholder='Max' />
                        </div>
                    </div>
                    <div className='my-6'>
                        <p className='my-2 font-semibold'>Location</p>
                        <Input type='text' placeholder='Hanoi, Vietnam' />
                    </div>
                </div>
                <div className='min-w-min flex flex-col gap-4 grow'>
                    {searchResults.map((result, index) => (
                        <SearchJobCard key={index} {...result} />
                    ))}
                </div>
            </div>
            <Pagination currentPage={currentPage} totalPages={10} handlePageChange={handlePageChange} />
        </div>
    )
}

export default Search
