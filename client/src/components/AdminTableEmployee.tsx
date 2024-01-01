import { MdDelete } from 'react-icons/md'
import { userData } from '~/store'

interface IProps {
    data: userData[]
    selectedItems: string[]
    handleDelete: (id: string) => void
    handleCheckbox: (itemId: string) => void
    handleCheckboxAll: () => void
}

const AdminTableEmployee = ({
    data,
    selectedItems,
    handleDelete,
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
                            <th className='w-1/2 text-left'>Email</th>
                            <th className='w-1/2 text-left'>Name</th>
                            {/* <th className='pr-10'>Phone</th> */}
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
                                <td>{result.email}</td>
                                <td className='p-2'>{result.name}</td>
                                {/* <td>{result.online}</td> */}
                                <td className='px-12'>
                                    <MdDelete
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
export default AdminTableEmployee