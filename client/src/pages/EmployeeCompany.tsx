import { searchCompany } from '~/services/api'
import { Input } from '~/components/ui/input'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import SearchCompanyCard from '~/components/SearchCompanyCard'
import Pagination from '~/components/Pagination'
import { getAllCompany } from '~/services/api'
import { useNavigate } from 'react-router-dom'

interface company {
    _id: string
    email: string
    phoneNumber: string
    companyName: string
    companyEmails: string[]
    companyWebsites: string[]
    companyPhoneNumbers: string[]
    companyLocations: string[]
    companyLogo: string
    description: string
}

const EmployeeCompany = () => {
    const navigate = useNavigate()
    const [searchCompanyName, setSearchCompanyName] = useState('')
    const [searchResults, setSearchResults] = useState<company[]>()
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [allCompany, setAllCompanies] = useState<company[]>()

    const handleSearchCompanyName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCompanyName(e.target.value)
    }

    const handlePageChange = async (page: number) => {
        const response = await searchCompany({ companyName: searchCompanyName, page })
        if (response?.status === 200) {
            setSearchResults(response.data.companies)
            setCurrentPage(page)
            window.scrollTo(0, 0)
        } else {
            console.log(response)
        }
    }

    const getAllCompanyData = async (page: number) => {
        const response = await searchCompany({
            page,
            companyName: ''
        })
        if (response?.status === 200) {
            setSearchResults(response.data.companies)
            setTotalPages(response.data.totalPages)
        } else {
            console.log(response)
        }
    }

    const getTotalCompany = async () => {
        const response = await getAllCompany()
        if (response?.status === 200) {
            setAllCompanies(response.data)
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        getTotalCompany()
    })

    useEffect(() => {
        getAllCompanyData(currentPage)
    }, [currentPage])

    const handleSeeCompanyDetail = (result: company) => {
        navigate(`/companyAllDetail/${result._id}`, { state: result })
    }

    return (
        <div className='mb-8'>
            <div className='flex mx-auto w-3/4 mt-6'>
                <h3 className='text-gray-500 text-18 leading-23'>There are total {allCompany?.length} companies</h3>
            </div>
            <div className='mx-auto w-3/4 flex justify-center items-center bg-white rounded-full shadow-md mb-12 mt-3'>
                <div className='px-4 w-full flex items-center pt-2 pb-2'>
                    <Search className='w-1/12 flex' />
                    <Input
                        type='text'
                        placeholder='Enter company name'
                        className='w-2/3 placeholder-gray-500 text-lg border-none focus-visible:ring-0 focus-visible:ring-offset-0 flex'
                        value={searchCompanyName}
                        onChange={handleSearchCompanyName}
                    />
                </div>
            </div>
            <div className='mx-auto block w-6/7 justify-center items-center mb-10'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4'>
                    {searchResults?.map((result) => (
                        <div key={result._id} onClick={() => handleSeeCompanyDetail(result)}>
                            <SearchCompanyCard {...result} />
                        </div>
                    ))}
                </div>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    )
}

export default EmployeeCompany
