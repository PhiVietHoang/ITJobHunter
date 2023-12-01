import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '~/store'
import { setEmployee } from '~/features/auth/employeeAuthSlice'
import { Label } from '~/components/ui/label'
import { Button } from '../components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { updateEmployee } from '~/services/api'

const EmployeeEducationEditForm = () => {
    const dispatch = useDispatch()
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)
    const [education, setEducation] = useState({
        nameSchool: '',
        degree: '',
        completeDate: ''
    })

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('body', { education: [...employee.education, education] })
        const response = await updateEmployee(employee._id, { education: [...employee.education, education] })
        if (response?.status === 200) {
            dispatch(setEmployee(response.data))
        }
    }

    const handleDelete = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => {
        e.preventDefault()
        const response = await updateEmployee(employee._id, {
            education: employee.education.filter((edu) => edu._id !== id)
        })
        if (response?.status === 200) {
            dispatch(setEmployee(response.data))
        }
    }

    return (
        <div className='mt-12 mx-auto w-2/3 px-16 py-12 bg-white rounded-lg'>
            <h1 className='mb-6 text-lg font-semibold'>Add Education</h1>
            <form className='flex flex-col gap-2' onSubmit={onSubmit}>
                <Label htmlFor='school-name' className='text-md'>
                    School Name
                </Label>
                <Input
                    type='text'
                    id='school-name'
                    value={education.nameSchool}
                    onChange={(e) => setEducation({ ...education, nameSchool: e.target.value })}
                />
                <Label htmlFor='degree' className='text-md'>
                    Degree
                </Label>
                <Select
                    value={education.degree}
                    onValueChange={(value) => setEducation({ ...education, degree: value })}
                >
                    <SelectTrigger id='degree'>
                        <SelectValue placeholder='Select your degree' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value='High school'>High school</SelectItem>
                            <SelectItem value='Intermediate'>Intermediate</SelectItem>
                            <SelectItem value='College'>College</SelectItem>
                            <SelectItem value='Bachelor'>Bachelor</SelectItem>
                            <SelectItem value='Postgraduate'>Postgraduate</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Label htmlFor='complete-date' className='text-md'>
                    Finish Date
                </Label>
                <Input
                    type='date'
                    id='complete-date'
                    value={education.completeDate}
                    onChange={(e) => setEducation({ ...education, completeDate: e.target.value })}
                />
                <Button type='submit'>Submit</Button>
            </form>
            <h1 className='my-8 text-lg font-semibold'>Education List</h1>
            <ul>
                {employee.education.map((edu) => (
                    <div
                        key={edu._id}
                        className='py-4 px-6 flex justify-between items-center rounded-lg hover:bg-slate-50'
                    >
                        <li className=' grid grid-cols-3 gap-y-1 gap-x-4'>
                            <span className='text-sm font-semibold'>School Name</span>
                            <span className='text-sm col-span-2'>{edu.nameSchool}</span>
                            <span className='text-sm font-semibold'>Degree</span>
                            <span className='text-sm col-span-2'>{edu.degree}</span>
                            <span className='text-sm font-semibold'>Finish Date</span>
                            <span className='text-sm col-span-2'>{edu.completeDate}</span>
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

export default EmployeeEducationEditForm
