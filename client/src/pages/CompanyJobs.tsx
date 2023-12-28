import { useState } from 'react'
import JobCard from '~/components/JobCard'
import Pagination from '~/components/Pagination'
import { Input } from '~/components/ui/input'

const CompanyJobs = () => {
    const totalPages = 10

    const [currentPage, setCurrentPage] = useState(0)

    const handlePageChange = async (page: number) => {
        setCurrentPage(page)
    }
    return (
        <div className='my-4 p-4 grid grid-cols-[minmax(max-content,_1fr)_3fr] gap-x-4'>
            <div className='p-4 bg-white rounded-md h-min'>
                <h1 className='font-semibold'>Job Filter</h1>
                <Input type='email' placeholder='Search' className='my-4' />
            </div>
            <div className='grid grid-cols-1 gap-y-2'>
                <JobCard id='1' title='Backend Developer' />
                <JobCard id='2' title='Backend Developer' />
                <JobCard id='3' title='Backend Developer' />
            </div>
            <div className='my-4 col-span-2'>
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            </div>
        </div>
    )
}

export default CompanyJobs
