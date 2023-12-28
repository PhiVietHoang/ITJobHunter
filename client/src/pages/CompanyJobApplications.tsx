import { useState } from 'react'
import JobApplicationCard from '~/components/JobApplicationCard'
import Pagination from '~/components/Pagination'
import { Input } from '~/components/ui/input'

const CompanyJobsApplication = () => {
    const totalPages = 10

    const [currentPage, setCurrentPage] = useState(0)

    const handlePageChange = async (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className='my-4 p-4 grid grid-cols-[minmax(max-content,_1fr)_3fr] gap-x-4'>
            <div className='p-4 bg-white rounded-md h-min'>
                <h1 className='font-semibold'>Job Application Filter</h1>
                <Input type='email' placeholder='Search' className='my-4' />
            </div>
            <div className='grid grid-cols-1 gap-y-2'>
                <JobApplicationCard
                    employeeId={{ name: 'Phi Viet Hoang' }}
                    jobId={{ title: 'Software Engineer' }}
                    applicationDate={new Date()}
                    cv={
                        'https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/413953921_346857514777636_8486916292282263300_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=HyH8Y7vZfd4AX-cTxJ9&_nc_ht=scontent.fhan5-9.fna&oh=00_AfC4h2XK_j6zsfWObTTpGJSQw3STN1nOMBJFR_sr5iYo-w&oe=65922DB2'
                    }
                    status='Pending'
                />
                <JobApplicationCard
                    employeeId={{ name: 'Phi Viet Hoang' }}
                    jobId={{ title: 'Software Engineer' }}
                    applicationDate={new Date()}
                    cv={
                        'https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/413953921_346857514777636_8486916292282263300_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=HyH8Y7vZfd4AX-cTxJ9&_nc_ht=scontent.fhan5-9.fna&oh=00_AfC4h2XK_j6zsfWObTTpGJSQw3STN1nOMBJFR_sr5iYo-w&oe=65922DB2'
                    }
                    status='Pending'
                />
                <JobApplicationCard
                    employeeId={{ name: 'Phi Viet Hoang' }}
                    jobId={{ title: 'Software Engineer' }}
                    applicationDate={new Date()}
                    cv={
                        'https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/413953921_346857514777636_8486916292282263300_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=HyH8Y7vZfd4AX-cTxJ9&_nc_ht=scontent.fhan5-9.fna&oh=00_AfC4h2XK_j6zsfWObTTpGJSQw3STN1nOMBJFR_sr5iYo-w&oe=65922DB2'
                    }
                    status='Pending'
                />
            </div>
            <div className='my-4 col-span-2'>
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            </div>
        </div>
    )
}

export default CompanyJobsApplication
