import { Search } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import AdminTableCompany from '~/components/AdminTableCompany'
import Pagination from '~/components/Pagination'
import { Input } from '~/components/ui/input'
import { useDebounce } from '~/lib/useDebounce'
import { deleteCompanies, deleteCompany, getAllCompany, searchCompany } from '~/services/api'
import { company } from './EmployeeCompany'

export default function AdminCompany() {
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalCompanies, setTotalCompanies] = useState<number>(0)
    const [searchResults, setSearchResults] = useState<company[]>()
    const [searchCompanyName, setSearchCompanyName] = useState<string>('')
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const handleCheckbox = useCallback((itemId: string) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(itemId)
                ? prevSelectedItems.filter((id) => id !== itemId)
                : [...prevSelectedItems, itemId]
        )
    }, [])

    const handleCheckboxAll = useCallback(() => {
        const allItemIds = searchResults?.map((result) => result._id)
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.length === (allItemIds?.length || 0) ? [] : allItemIds || []
        )
    }, [searchResults])

    const handlePageChange = useCallback(
        async (page: number) => {
            const response = await searchCompany({ companyName: searchCompanyName, page })
            if (response?.status === 200) {
                setSearchResults(response.data.companies)
                setCurrentPage(page)
                window.scrollTo(0, 0)
            } else {
                console.log(response)
            }
        },
        [searchCompanyName]
    )

    const getAllCompanyData = useCallback(async (page: number, searchCompanyName: string) => {
        const response = await searchCompany({
            page,
            companyName: searchCompanyName
        })
        if (response?.status === 200) {
            setSearchResults(response.data.companies)
            setTotalPages(response.data.totalPages)
        } else {
            console.log(response)
        }
    }, [])

    const handleDelete = useCallback(
        async (id: string) => {
            await deleteCompany(id)
            setSearchResults(searchResults?.filter((result) => result._id !== id))
            setTotalCompanies(totalCompanies - 1)

            if (searchResults?.length === 1) {
                setCurrentPage(currentPage - 1)
                setTotalPages(totalPages - 1)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [currentPage, searchResults, totalCompanies, totalPages]
    )

    const handleDeleteChecked = useCallback(async () => {
        try {
            await deleteCompanies(selectedItems)
            setSearchResults((prevList) => prevList?.filter((result) => !selectedItems.includes(result._id)))
            setTotalCompanies((prevTotal) => prevTotal - selectedItems.length)
            setSelectedItems([])
        } catch (error) {
            console.error(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItems])

    useDebounce(
        { currentPage, searchCompanyName },
        100,
        async (value) => {
            getAllCompanyData(value?.currentPage || currentPage, value?.searchCompanyName || searchCompanyName)
        },
        [currentPage, searchCompanyName]
    )

    const getTotalCompany = async () => {
        const response = await getAllCompany()
        if (response?.status === 200) {
            setTotalCompanies(response.data.length)
        }
    }

    useEffect(() => {
        getTotalCompany()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useDebounce(
        { currentPage, searchCompanyName },
        100,
        async (value) => {
            getAllCompanyData(value?.currentPage || currentPage, value?.searchCompanyName || searchCompanyName)
        },
        [currentPage, searchCompanyName]
    )

    return (
        <div className='pr-64 mt-6'>
            <div className='bg-white border border-black rounded-xl'>
                <div className='flex justify-between mb-4'>
                    <div className='flex gap-5'>
                        <h1 className='h-full py-2.5 px-4 text-2xl font-bold bg-white border-b border-r border-black shadow-xl rounded-br-xl rounded-tl-xl'>
                            Company
                        </h1>
                        <select
                            className='px-4 py-3 border border-b border-r border-black rounded-br-xl rounded-bl-xl '
                            name=''
                            id=''
                        >
                            <option value=''>All</option>
                            <option value=''>Active</option>
                            <option value=''>Block</option>
                        </select>
                        <button
                            disabled={!selectedItems.length}
                            onClick={() => handleDeleteChecked()}
                            className={
                                selectedItems.length
                                    ? 'px-4 py-3 text-white bg-red-500 rounded-br-xl rounded-bl-xl'
                                    : 'px-4 py-3 text-white bg-red-500 rounded-br-xl rounded-bl-xl opacity-50 cursor-not-allowed'
                            }
                        >
                            Delete Checked
                        </button>
                    </div>
                    <div className='flex items-center w-2/5 border-b border-l border-black shadow-2xl rounded-bl-xl'>
                        <div className='flex items-center w-full px-4 py-2'>
                            <Search className='flex w-1/12' />
                            <Input
                                type='text'
                                placeholder='Enter company name'
                                className='flex w-full text-lg placeholder-gray-500 border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                value={searchCompanyName}
                                onChange={(e) => setSearchCompanyName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <p className='pl-4 mb-2'>
                    Chooses <span className='font-bold'>{selectedItems.length}</span> selected
                </p>
                <AdminTableCompany
                    data={searchResults || []}
                    selectedItems={selectedItems}
                    totalCompanies={totalCompanies}
                    handleDelete={handleDelete}
                    handleCheckbox={handleCheckbox}
                    handleCheckboxAll={handleCheckboxAll}
                />
                <div className='flex items-center justify-between p-2 bg-slate-500 rounded-bl-xl rounded-br-xl'>
                    <span className='text-white'>
                        Showing <span className='font-bold'>{searchResults?.length}</span> of
                        <span className='ml-1.5 font-bold'>{totalCompanies}</span> results
                    </span>
                    <div className='flex items-center space-x-2'>
                        <button
                            disabled={!currentPage}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`${
                                !currentPage && 'opacity-50 cursor-not-allowed'
                            } p-2 text-white border border-gray-300 rounded-lg`}
                        >
                            Previous
                        </button>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                        <button
                            disabled={currentPage === totalPages - 1}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`${
                                currentPage === totalPages - 1 && 'opacity-50 cursor-not-allowed'
                            } px-4 py-2 text-white border border-gray-300 rounded-lg`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
