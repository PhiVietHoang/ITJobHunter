import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '~/store'
import { setEmployee } from '~/features/auth/employeeAuthSlice'
import { Label } from '~/components/ui/label'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { updateEmployee } from '~/services/api'

const technicalSkillList = [
    'Javascript',
    'Python',
    'Go',
    'Java',
    'Kotlin',
    'PHP',
    'C#',
    'Swift',
    'R',
    'Ruby',
    'C and C++',
    'Matlab',
    'TypeScript',
    'Scala',
    'SQL',
    'HTML',
    'CSS',
    'NoSQL',
    'Rust',
    'Perl',
    'Other language',
    'tester',
    'manage project'
]

const softSkillList = [
    'English',
    'Japanese',
    'Chinese',
    'Franch',
    'Spanish',
    'Russian',
    'German',
    'Presentation',
    'Teamwork',
    'Writting',
    'Communication',
    'Leading',
    'Other skills'
]

const EmployeeProfileEditSkills = () => {
    const token = useSelector((state: RootState) => state.employeeAuth.employeeToken)
    const dispatch = useDispatch()
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)
    const [technicalSkill, setTechnicalSkill] = useState<string | undefined>(undefined)
    const [softSkill, setSoftSkill] = useState<string | undefined>(undefined)

    if (!employee) return null

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let response
        if (technicalSkill) {
            response = await updateEmployee(
                employee._id,
                {
                    skill: {
                        technical: [...employee.skill.technical, technicalSkill],
                        softSkill: [...employee.skill.soft]
                    }
                },
                token
            )
            setTechnicalSkill(undefined)
        } else if (softSkill) {
            response = await updateEmployee(
                employee._id,
                {
                    skill: {
                        technical: [...employee.skill.technical],
                        soft: [...employee.skill.soft, softSkill]
                    }
                },
                token
            )
            setSoftSkill(undefined)
        }
        if (response?.status === 200) {
            dispatch(setEmployee(response.data))
        }
    }

    const handleDelete = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => {
        e.preventDefault()
        const response = await updateEmployee(
            employee._id,
            {
                skill: {
                    technical: employee.skill.technical.filter((skill: string) => skill !== id),
                    soft: employee.skill.soft.filter((skill: string) => skill !== id)
                }
            },
            token
        )
        if (response?.status === 200) {
            dispatch(setEmployee(response.data))
        }
    }

    return (
        <div className='mt-12 mx-auto w-2/3 px-16 py-12 bg-white rounded-lg'>
            <Tabs defaultValue='technical'>
                <TabsList>
                    <TabsTrigger value='technical'>Technical</TabsTrigger>
                    <TabsTrigger value='soft'>Soft</TabsTrigger>
                </TabsList>
                <TabsContent value='technical'>
                    <h1 className='mb-6 text-lg font-semibold'>Add Technical Skill</h1>
                    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
                        <Label htmlFor='technical-skill-name' className='text-md'>
                            Skill Name
                        </Label>
                        <Select value={technicalSkill} onValueChange={(value) => setTechnicalSkill(value)}>
                            <SelectTrigger id='technical-skill-name'>
                                <SelectValue placeholder='Select a skill' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {technicalSkillList.map((skill) => (
                                        <SelectItem key={skill} value={skill}>
                                            {skill}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button type='submit'>Submit</Button>
                    </form>
                    <h1 className='my-8 text-lg font-semibold'>Technical Skill List</h1>
                    <ul>
                        {employee.skill.technical.map((skill: string) => (
                            <div
                                key={skill}
                                className='py-4 px-6 flex justify-between items-center rounded-lg hover:bg-slate-50'
                            >
                                <li className=' grid grid-cols-3 gap-y-1 gap-x-4'>
                                    <span className='text-sm font-semibold'>Skill</span>
                                    <span className='text-sm col-span-2'>{skill}</span>
                                </li>
                                <button
                                    className='w-min text-sm font-bold text-red-500 cursor-pointer hover:bg-red-50'
                                    onClick={(event) => handleDelete(event, skill)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </ul>
                </TabsContent>
                <TabsContent value='soft'>
                    <h1 className='mb-6 text-lg font-semibold'>Add Soft Skill</h1>
                    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
                        <Label htmlFor='soft-skill-name' className='text-md'>
                            Skill Name
                        </Label>
                        <Select value={softSkill} onValueChange={(value) => setSoftSkill(value)}>
                            <SelectTrigger id='soft-skill-name'>
                                <SelectValue placeholder='Select a skill' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {softSkillList.map((skill) => (
                                        <SelectItem key={skill} value={skill}>
                                            {skill}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button type='submit'>Submit</Button>
                    </form>
                    <h1 className='my-8 text-lg font-semibold'>Soft Skill List</h1>
                    <ul>
                        {employee.skill.soft.map((skill: string) => (
                            <div
                                key={skill}
                                className='py-4 px-6 flex justify-between items-center rounded-lg hover:bg-slate-50'
                            >
                                <li className=' grid grid-cols-3 gap-y-1 gap-x-4'>
                                    <span className='text-sm font-semibold'>Skill</span>
                                    <span className='text-sm col-span-2'>{skill}</span>
                                </li>
                                <button
                                    className='w-min text-sm font-bold text-red-500 cursor-pointer hover:bg-red-50'
                                    onClick={(event) => handleDelete(event, skill)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </ul>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default EmployeeProfileEditSkills
