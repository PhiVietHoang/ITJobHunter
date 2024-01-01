import { Search } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import AdminTableEmployee from '~/components/AdminTableEmployee'
import Pagination from '~/components/Pagination'
import { Input } from '~/components/ui/input'
import { deleteEmployee, deleteEmployees, getAllEmployee } from '~/services/api'
import { userData } from '~/store'

const ITEMS_PER_PAGE = 10

export default function AdminEmployee() {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [originalEmployeeList, setOriginalEmployeeList] = useState<userData[]>([])
    const [resultEmployee, setResultEmployee] = useState<userData[]>([])
    const [searchEmployeeName, setSearchEmployeeName] = useState<string>('')

    const totalPages = Math.ceil(
        (searchEmployeeName ? resultEmployee?.length : originalEmployeeList?.length) / ITEMS_PER_PAGE
    )

    const getVisibleItems = useCallback(() => {
        const startIndex = currentPage * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE

        const sourceList = searchEmployeeName ? resultEmployee : originalEmployeeList
        return sourceList.slice(startIndex, endIndex)
    }, [currentPage, searchEmployeeName, resultEmployee, originalEmployeeList])

    const visibleItems = getVisibleItems()

    const handlePageChange = useCallback((newPage: number) => {
        setCurrentPage(newPage)
        window.scrollTo(0, 0)
    }, [])

    const onChangeSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newSearchValue = e.target.value.toLowerCase()
            setSearchEmployeeName(newSearchValue)

            const newResultEmployee =
                newSearchValue === ''
                    ? originalEmployeeList
                    : originalEmployeeList.filter((result) => result.name.toLowerCase().includes(newSearchValue))

            setResultEmployee(newResultEmployee)
        },
        [originalEmployeeList]
    )

    const handleCheckbox = useCallback((itemId: string) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(itemId)
                ? prevSelectedItems.filter((id) => id !== itemId)
                : [...prevSelectedItems, itemId]
        )
    }, [])

    const handleCheckboxAll = useCallback(() => {
        const allItemIds = originalEmployeeList?.map((result) => result._id)
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.length === (allItemIds?.length || 0) ? [] : allItemIds || []
        )
    }, [originalEmployeeList])

    const handleDelete = useCallback(async (id: string) => {
        try {
            await deleteEmployee(id)
            setOriginalEmployeeList((prevList) => prevList.filter((result) => result._id !== id))
            if (originalEmployeeList?.length === 1) {
                setCurrentPage(currentPage - 1)
                totalPages - 1
            }
        } catch (error) {
            console.error(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDeleteChecked = useCallback(async () => {
        try {
            await deleteEmployees(selectedItems)
            setOriginalEmployeeList((prevList) => prevList.filter((result) => !selectedItems.includes(result._id)))
            setSelectedItems([])
        } catch (error) {
            console.error(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItems])

    const getTotalEmployee = async () => {
        try {
            const response = await getAllEmployee()
            if (response?.status === 200) {
                setOriginalEmployeeList(response.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTotalEmployee()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='pr-64 mt-6'>
            <div className='bg-white border border-black rounded-xl'>
                <div className='flex justify-between mb-4'>
                    <div className='flex gap-5'>
                        <h1 className='h-full py-2.5 px-4 text-2xl font-bold bg-white border-b border-r border-black shadow-xl rounded-br-xl rounded-tl-xl'>
                            Employee
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
                                placeholder='Enter employee name'
                                className='flex w-full text-lg placeholder-gray-500 border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                value={searchEmployeeName}
                                onChange={onChangeSearch}
                            />
                        </div>
                    </div>
                </div>
                <p className='pl-4 mb-2'>
                    Chooses <span className='font-bold'>{selectedItems.length}</span> selected
                </p>

                <AdminTableEmployee
                    data={searchEmployeeName ? resultEmployee : visibleItems}
                    selectedItems={selectedItems}
                    handleDelete={handleDelete}
                    handleCheckbox={handleCheckbox}
                    handleCheckboxAll={handleCheckboxAll}
                />
                <div className='flex items-center justify-between p-2 bg-slate-500 rounded-bl-xl rounded-br-xl'>
                    <span className='text-white'>
                        Showing{' '}
                        <span className='font-bold'>
                            {searchEmployeeName ? resultEmployee?.length : visibleItems.length}
                        </span>{' '}
                        of
                        <span className='ml-1.5 font-bold'>
                            {searchEmployeeName ? resultEmployee.length : originalEmployeeList.length}
                        </span>{' '}
                        results
                    </span>
                    <div className='flex items-center space-x-2'>
                        <button
                            disabled={!currentPage}
                            className={`${
                                !currentPage && 'opacity-50 cursor-not-allowed'
                            } p-2 text-white border border-gray-300 rounded-lg`}
                            onClick={() => handlePageChange(currentPage - 1)}
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
                            className={`${
                                currentPage === totalPages - 1 && 'opacity-50 cursor-not-allowed'
                            } px-4 py-2 text-white border border-gray-300 rounded-lg`}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
