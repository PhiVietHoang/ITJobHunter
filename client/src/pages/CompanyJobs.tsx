import { useState } from 'react'
import JobCard from '~/components/JobCard'
import Pagination from '~/components/Pagination'
import { Input } from '~/components/ui/input'
import { Button } from "~/components/ui/button"
import { filterJobByCompany } from '~/services/companyApi'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { RootState } from '~/store'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

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

const CompanyJobs = () => {
    const [allJob, setAllJob] = useState<JobCardProps[]>()
    const [totalPages, setTotalPages] = useState(0)
    const companyID = useSelector((state: RootState) => state.employerAuth.company)

    const [currentPage, setCurrentPage] = useState(0)

    const handlePageChange = async (page: number) => {
        const response = await filterJobByCompany({
            companyID: companyID._id,
            page,
            title: ''
        })
        if (response?.status === 200) {
            setAllJob(response.data.jobs)
            setCurrentPage(page)
            window.scrollTo(0, 0)
        } else {
            console.log(response)
        }
    }

    const getData = async (page: number) => {
        const response = await filterJobByCompany({
            companyID: companyID._id,
            page,
            title: ''
        })
        if (response?.status === 200) {
            setAllJob(response.data.jobs)
            setTotalPages(response.data.totalPages)
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        getData(currentPage)
    }, [currentPage])

    if (!companyID) return null
    console.log(companyID)

    return (
        <div className='my-4 p-4 grid grid-cols-[minmax(max-content,_1fr)_3fr] gap-x-4'>
            <div className='p-4 bg-white rounded-md h-min'>
                <h1 className='my-4 font-semibold'>Manage Tools</h1>
                <Link to='create'>
                    <Button>Create Job</Button>
                </Link>
                <h1 className='my-4 font-semibold'>Job Filter</h1>
                <Input type='email' placeholder='Search' className='my-4' />
            </div>
            <div className='grid grid-cols-1 gap-y-2'>
                {allJob?.map((result, id) => (
                    <div key={id}>
                        <JobCard {...result} />
                    </div>
                ))}
            </div>
            <div className='my-4 col-span-2'>
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            </div>
        </div>
    )
}

export default CompanyJobs
