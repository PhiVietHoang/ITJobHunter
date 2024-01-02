import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Label } from '~/components/ui/label'
import { Button } from '../components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { updateEmployee } from '~/services/api'

const editableStringFields = [
    {
        name: 'name',
        label: 'Name',
        type: 'text'
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email'
    },
    {
        name: 'avatar',
        label: 'Avatar URL',
        type: 'text'
    },
    {
        name: 'description',
        label: 'Profile Summary',
        type: 'text'
    },
    {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'text'
    },
    {
        name: 'experience',
        label: 'Experience',
        type: 'text'
    }
]

const editableSelectFields = [
    {
        name: 'gender',
        label: 'Gender',
        values: [
            {
                name: 'male',
                label: 'Male'
            },
            {
                name: 'female',
                label: 'Female'
            },
            {
                name: 'other',
                label: 'Other'
            }
        ]
    }
]

const EmployeeProfileEdit = () => {
    const token = useSelector((state: RootState) => state.employeeAuth.employeeToken)
    const navigate = useNavigate()
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)
    const [employeeData, setEmployeeData] = useState(employee)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateEmployee(employeeData._id, employeeData, token)
        navigate(`/profile/${employeeData._id}`)
        window.location.reload()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const avatarFile = e.target.files?.[0]
        if (avatarFile) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                console.log(base64String)
                setEmployeeData((prevState) => ({
                    ...prevState,
                    avatar: base64String
                }))
            }
            reader.readAsDataURL(avatarFile)
        }
    }

    useEffect(() => {
        setEmployeeData(employee)
    }, [employee])

    if (!employeeData) return null

    return (
        <form className='my-12 mx-auto w-2/3' onSubmit={handleSubmit}>
            <Label htmlFor='avatar' className='text-md'>
                Ảnh đại diện
            </Label>
            <div className='mx-auto w-min flex flex-col justify-center gap-2'>
                <Input type='file' id='avatar' onChange={handleFileChange} />
                <div className='w-64 aspect-square flex rounded-lg overflow-hidden'>
                    {employeeData.avatar && <img src={employeeData.avatar} alt='Preview' />}
                </div>
            </div>
            {editableStringFields.map((field, index) => (
                <div key={index} className='my-4 grid w-full items-center gap-1'>
                    <Label htmlFor={index.toString()} className='text-md'>
                        {field.label}
                    </Label>
                    <Input
                        type={field.type}
                        id={index.toString()}
                        value={employeeData[field.name as keyof typeof employeeData]?.toString() || ''}
                        onChange={(e) => setEmployeeData({ ...employeeData, [field.name]: e.target.value })}
                        readOnly={field.type === 'email'}
                    />
                </div>
            ))}
            {editableSelectFields.map((field, index) => (
                <div key={index} className='my-4 grid w-full items-center gap-1'>
                    <Label htmlFor={`select-${index}`} className='text-md'>
                        {field.label}
                    </Label>
                    <Select onValueChange={(value) => setEmployeeData({ ...employeeData, [field.name]: value })}>
                        <SelectTrigger id={`select-${index}`}>
                            <SelectValue
                                placeholder={
                                    employeeData[field.name as keyof typeof employeeData]?.toString() ||
                                    'Select your gender'
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value='male'>Male</SelectItem>
                                <SelectItem value='female'>Female</SelectItem>
                                <SelectItem value='other'>Other</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            ))}
            <Button type='submit'>Confirm</Button>
        </form>
    )
}

export default EmployeeProfileEdit
