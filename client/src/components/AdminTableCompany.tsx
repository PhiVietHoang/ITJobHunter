import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { company } from '~/pages/EmployeeCompany'

interface IProps {
    data: company[]
    selectedItems: string[]
    handleDelete: (id: string) => void
    totalCompanies: number
    handleCheckbox: (itemId: string) => void
    handleCheckboxAll: () => void
}

const AdminTableCompany = ({
    data,
    selectedItems,
    handleDelete,
    totalCompanies,
    handleCheckbox,
    handleCheckboxAll
}: IProps) => {
    return (
        <>
            {data.length ? (
                <table className='mb-2 border-t border-collapse '>
                    <thead className='text-white bg-slate-500 '>
                        <tr>
                            <th className='px-8 py-4 w-1/8'>
                                <input className='w-5 h-5' onClick={() => handleCheckboxAll()} type='checkbox' />
                            </th>
                            <th className='pr-10'>Logo</th>
                            <th className='w-1/3 text-left'>Company Email</th>
                            <th className='w-1/2 text-left'>Company Name</th>
                            <th className='px-8 text-right'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((result) => (
                            <tr key={result._id} className='border-t'>
                                <th>
                                    <input
                                        className='w-5 h-5'
                                        onChange={() => handleCheckbox(result._id)}
                                        type='checkbox'
                                        checked={selectedItems.includes(result._id)}
                                    />
                                </th>
                                <td className='py-2'>
                                    <Link to={`/companyAllDetail/${result._id}`}>
                                        <img
                                            src={result.companyLogo}
                                            alt='background'
                                            className='object-cover w-10 h-10 rounded-full flex-center'
                                        />
                                    </Link>
                                </td>
                                <td>{result.email}</td>
                                <td className='p-2'>{result.companyName}</td>
                                <td className='px-12'>
                                    <MdDelete
                                        disabled={!totalCompanies}
                                        onClick={() => handleDelete(result._id)}
                                        className='text-2xl text-center cursor-pointer'
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1 className='py-5 pl-2 text-2xl font-semibold text-center'>Not Data</h1>
            )}
        </>
    )
}
export default AdminTableCompany