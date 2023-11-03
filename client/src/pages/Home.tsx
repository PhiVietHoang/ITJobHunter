import { Search } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import CategoryCard from '~/components/CategoryCard'

const Home = () => {
    return (
        <div className='my-16 flex flex-col gap-12'>
            <div className='flex flex-col justify-center items-center gap-4'>
                <h1 className='text-5xl font-bold'>Find your dream job now</h1>
                <p className='text-lg font-semibold'>1000+ jobs for you to explore</p>
            </div>
            <div>
                <div className='mx-auto w-3/4 h-20 flex justify-center items-center bg-white rounded-full shadow-md'>
                    <div className='px-4 w-full flex items-center'>
                        <Search className='w-1/12' />
                        <Input
                            type='text'
                            placeholder='Enter skills / designations / companies'
                            className='w-2/3 placeholder-gray-500 text-xl border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                        />
                        <Select>
                            <SelectTrigger className='w-1/4 placeholder-gray-500 text-xl border-none focus:ring-0 focus:ring-ring focus:ring-offset-0'>
                                <SelectValue placeholder='Fresher' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='fresher'>Fresher</SelectItem>
                                <SelectItem value='1 year'>1 year</SelectItem>
                                <SelectItem value='2 year'>2 year</SelectItem>
                                <SelectItem value='3 year'>3 year</SelectItem>
                                <SelectItem value='4 year'>4 year</SelectItem>
                                <SelectItem value='5 year'>5 year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            type='text'
                            placeholder='Enter location'
                            className='w-1/4 placeholder-gray-500 text-xl border-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                        />
                        <Button className='w-[18%] rounded-full text-md text-white bg-[#275df5] hover:bg-[#275df5ee]'>
                            Search
                        </Button>
                    </div>
                </div>
            </div>
            <div className='my-12 flex justify-center items-center gap-4 flex-wrap'>
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