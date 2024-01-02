import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import CategoryCard from '~/components/CategoryCard'
import { searchJobs } from '~/services/api'

const Home = () => {
    const navigate = useNavigate()
    const [searchTitle, setSearchTitle] = useState('')
    const [searchLocation, setSearchLocation] = useState('')
    const [searchExperience, setSearchExperience] = useState('')

    const handleSearchTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(e.target.value)
    }

    const handleSearchLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(e.target.value)
    }

    const handleSearchExperienceChange = (value: string) => {
        setSearchExperience(value)
    }

    const handleSearch = async () => {
        const response = await searchJobs({
            title: searchTitle,
            page: 0,
            yearsOfExp: '',
            minSalary: '',
            maxSalary: '',
            location: '',
            workingTime: ''
        })
        if (response?.status === 200) {
            const data = response.data
            const state = { ...data, searchTitle, searchExperience, searchLocation }
            navigate('/search', { state })
        } else {
            console.log(response)
        }
    }

    return (
        <div className='flex flex-col'>
            <div
                className={`flex flex-col justify-center items-center gap-4 pt pt-32 pb-44 bg-[url('/home.jpeg')] bg-cover bg-center bg-opacity-75`}
            >
                <h1 className='text-6xl font-black'>Find your dream IT job now</h1>
                <p className='text-3xl text-gray-900 font-extrabold'>1000+ jobs for you to explore</p>
            </div>
            <div className='w-2/3 mx-auto absolute relative -top-10'>
                <div className='mx-auto w-3/4 p-4 h-full flex justify-center items-center bg-white rounded-full shadow-md'>
                    <div className='px-4 w-full flex items-center'>
                        <Search className='w-1/12' />
                        <Input
                            type='text'
                            placeholder='Enter job title'
                            className='w-2/3 placeholder-gray-500 text-xl border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                            value={searchTitle}
                            onChange={handleSearchTitleChange}
                        />
                        <Select defaultValue={searchExperience} onValueChange={(e) => handleSearchExperienceChange(e)}>
                            <SelectTrigger className='w-1/4 placeholder-gray-500 text-xl border-none focus:ring-0 focus:ring-ring focus:ring-offset-0'>
                                <SelectValue placeholder='Experience' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='0'>Fresher</SelectItem>
                                <SelectItem value='1'>1 year</SelectItem>
                                <SelectItem value='2'>2 years</SelectItem>
                                <SelectItem value='3'>3 years</SelectItem>
                                <SelectItem value='4'>4 years</SelectItem>
                                <SelectItem value='5'>5 years</SelectItem>
                                <SelectItem value='5'>5+ years</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            type='text'
                            placeholder='Location'
                            className='w-1/4 placeholder-gray-500 text-xl border-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                            value={searchLocation}
                            onChange={handleSearchLocationChange}
                        />
                        <Button
                            className='w-[18%] rounded-full text-md text-white bg-[#275df5] hover:bg-[#275df5ee]'
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </div>
            <div className='w-2/3 my-8 mx-auto flex justify-center items-center gap-4 flex-wrap'>
                <CategoryCard name='Remote' />
                <CategoryCard name='Backend Developer' />
                <CategoryCard name='Frontend Developer' />
                <CategoryCard name='DevOps' />
                <CategoryCard name='Mobile Developer' />
                <CategoryCard name='Business Analysist' />
                <CategoryCard name='Full-time' />
                <CategoryCard name='Part-time' />
                <CategoryCard name='Machine Learning' />
                <CategoryCard name='Deep Learning' />
                <CategoryCard name='Artificial Neural Network' />
            </div>
        </div>
    )
}

export default Home
