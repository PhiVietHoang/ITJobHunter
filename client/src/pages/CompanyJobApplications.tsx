import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import JobApplicationCard from '~/components/JobApplicationCard'
import Pagination from '~/components/Pagination'
import { Input } from '~/components/ui/input'
import { searchJobApplicationByCompanyId } from '~/services/companyApi'
import { RootState } from '~/store'

interface JobApplicationCardProps {
    _id: string
    employeeId: {
        _id: string
        email: string
        phoneNumber: string
        name: string
    }
    jobId: {
        _id: string
        title: string
        categories: string[]
        level: string
        requriedSkills: string[]
        maxPositions: number
        yearsOfExp: string
        description: string
        workingTime: string
        offerSalary: string
        startTime: Date
        endDate: Date
        company: string
    }
    applicationDate: Date
    cv: {
        data: string
        contentType: string
    }
    status: string
}

const CompanyJobsApplication = () => {
    const [allJobApplication, setAllJobApplication] = useState<JobApplicationCardProps[]>()
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const companyID = useSelector((state: RootState) => state.employerAuth.company)
    const [searchTitle, setSearchTitle] = useState('')
    const token = localStorage.getItem('employerToken')!

    const getData = async (page: number) => {
        const response = await searchJobApplicationByCompanyId(
            { jobTitle: searchTitle, page: page },
            companyID._id,
            token
        )
        console.log(response)
        if (response?.status === 200) {
            setAllJobApplication(response.data.jobApplications)
            setCurrentPage(page)
            setTotalPages(response.data.totalPages)
        } else {
            console.log(response)
        }
    }

    const handleSearchTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(e.target.value)
    }

    useEffect(() => {
        getData(currentPage)
        window.scrollTo(0, 0)
    }, [currentPage, companyID])

    useEffect(() => {
        getData(0)
        window.scrollTo(0, 0)
    }, [searchTitle])

    return (
        <div className='my-4 p-4 grid grid-cols-[minmax(max-content,_1fr)_3fr] gap-x-4'>
            <div className='p-4 bg-white rounded-md h-min'>
                <h1 className='font-semibold'>Job Application Filter</h1>
                <Input
                    type='email'
                    placeholder='Search by job title'
                    className='my-4'
                    value={searchTitle}
                    onChange={handleSearchTitleChange}
                />
            </div>
            <div className='grid grid-cols-1 gap-y-2'>
                {allJobApplication?.map((result, id) => (
                    <div key={id}>
                        <JobApplicationCard {...result} />
                    </div>
                ))}
            </div>
            <div className='my-4 col-span-2'>
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={getData} />
            </div>
        </div>
    )
}

export default CompanyJobsApplication
