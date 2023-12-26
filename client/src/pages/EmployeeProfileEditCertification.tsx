import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '~/store'
import { setEmployee } from '~/features/auth/employeeAuthSlice'
import { Label } from '~/components/ui/label'
import { Button } from '../components/ui/button'
import { Input } from '~/components/ui/input'
import { updateEmployee } from '~/services/api'

const EmployeeProfileEditCertification = () => {
    const dispatch = useDispatch()
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)
    const token = useSelector((state: RootState) => state.employeeAuth.employeeToken)
    const [certificate, setCertificate] = useState({
        name: '',
        issuedBy: '',
        from: '',
        to: ''
    })

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('body', { certificates: [...employee.certificates, certificate] })
        const response = await updateEmployee(
            employee._id,
            { certificates: [...employee.certificates, certificate] },
            token
        )
        if (response?.status === 200) {
            dispatch(setEmployee(response.data))
        }
    }

    const handleDelete = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => {
        e.preventDefault()
        const response = await updateEmployee(
            employee._id,
            {
                certificates: employee.certificates.filter((edu) => edu._id !== id)
            },
            token
        )
        if (response?.status === 200) {
            dispatch(setEmployee(response.data))
        }
    }

    return (
        <div className='mt-12 mx-auto w-2/3 px-16 py-12 bg-white rounded-lg'>
            <h1 className='mb-6 text-lg font-semibold'>Add Education</h1>
            <form className='flex flex-col gap-2' onSubmit={onSubmit}>
                <Label htmlFor='school-name' className='text-md'>
                    Certification Name
                </Label>
                <Input
                    type='text'
                    id='school-name'
                    value={certificate.name}
                    onChange={(e) => setCertificate({ ...certificate, name: e.target.value })}
                />
                <Label htmlFor='school-name' className='text-md'>
                    Issued By
                </Label>
                <Input
                    type='text'
                    id='school-name'
                    value={certificate.issuedBy}
                    onChange={(e) => setCertificate({ ...certificate, issuedBy: e.target.value })}
                />
                <Label htmlFor='complete-date' className='text-md'>
                    From
                </Label>
                <Input
                    type='date'
                    id='complete-date'
                    value={certificate.from}
                    onChange={(e) => setCertificate({ ...certificate, from: e.target.value })}
                />
                <Label htmlFor='complete-date' className='text-md'>
                    To
                </Label>
                <Input
                    type='date'
                    id='complete-date'
                    value={certificate.to}
                    onChange={(e) => setCertificate({ ...certificate, to: e.target.value })}
                />
                <Button type='submit'>Submit</Button>
            </form>
            <h1 className='my-8 text-lg font-semibold'>Certification List</h1>
            <ul>
                {employee.certificates.map((edu) => (
                    <div
                        key={edu._id}
                        className='py-4 px-6 flex justify-between items-center rounded-lg hover:bg-slate-50'
                    >
                        <li className=' grid grid-cols-3 gap-y-1 gap-x-4'>
                            <span className='text-sm font-semibold'>Name</span>
                            <span className='text-sm col-span-2'>{edu.name}</span>
                            <span className='text-sm font-semibold'>Issuer</span>
                            <span className='text-sm col-span-2'>{edu.issuedBy}</span>
                            <span className='text-sm font-semibold'>From</span>
                            <span className='text-sm col-span-2'>{edu.from}</span>
                            <span className='text-sm font-semibold'>To</span>
                            <span className='text-sm col-span-2'>{edu.to}</span>
                        </li>
                        <button
                            className='w-min text-sm font-bold text-red-500 cursor-pointer hover:bg-red-50'
                            onClick={(event) => handleDelete(event, edu._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default EmployeeProfileEditCertification
