import React, { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { createJob } from '~/services/companyApi'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { useNavigate } from 'react-router-dom'

type FormState = {
    title: string
    categories: string
    level: string
    requiredSkills: string
    maxPositions: number
    yearsOfExp: string
    description: string
    workingTime: string
    offerSalary: string
    startDate: string
    endDate: string
    companyID: string
}

const CompanyCreateJob = () => {
    const navigate = useNavigate()
    const company = useSelector((state: RootState) => state.employerAuth.company)
    const [form, setForm] = useState<FormState>({
        title: '',
        categories: '',
        requiredSkills: '',
        description: '',
        level: '',
        yearsOfExp: '',
        offerSalary: '',
        maxPositions: 0,
        workingTime: '',
        startDate: '',
        endDate: '',
        companyID: ''
    })
    const [submitDisabled, setSubmitDisabled] = useState(false)

    useEffect(() => {
        setForm({
            ...form,
            companyID: company?._id
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const processFormData = (data: FormState) => {
        const { categories, requiredSkills, ...rest } = data
        return {
            ...rest,
            categories: categories.split(',').map((item) => item.trim()),
            requiredSkills: requiredSkills.split(',').map((item) => item.trim())
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitDisabled(true)
        const res = await createJob(processFormData(form))
        if (res?.status === 201) {
            navigate('../jobs')
        }
    }

    if (!company) return null

    return (
        <div className='my-4 p-4 bg-white rounded-md'>
            <h1 className='text-center font-semibold text-xl mb-2'>Create Job Form</h1>
            <form onSubmit={handleSubmit} className='p-4 grid grid-cols-[max-content_1fr] gap-4 items-center'>
                <label>Title</label>
                <Input
                    name='title'
                    value={form.title}
                    onChange={handleChange}
                    type='text'
                    placeholder='Job title'
                    required
                />
                <label>Categories</label>
                <Input
                    name='categories'
                    value={form.categories}
                    onChange={handleChange}
                    type='text'
                    placeholder='Separated by a comma'
                />
                <label>Required skills</label>
                <Input
                    name='requiredSkills'
                    value={form.requiredSkills}
                    onChange={handleChange}
                    type='text'
                    placeholder='Separated by a comma'
                />
                <label>Description</label>
                <Textarea
                    name='description'
                    value={form.description}
                    onChange={handleChange}
                    placeholder='Job description'
                />
                <label>Level</label>
                <Input name='level' value={form.level} onChange={handleChange} type='text' placeholder='Job level' />
                <label>YoE</label>
                <Input
                    name='yearsOfExp'
                    value={form.yearsOfExp}
                    onChange={handleChange}
                    type='text'
                    placeholder='Years of experience'
                />
                <label>Salary</label>
                <Input
                    name='offerSalary'
                    value={form.offerSalary}
                    onChange={handleChange}
                    type='string'
                    placeholder='Offered salary'
                />
                <label>Max positions</label>
                <Input
                    name='maxPositions'
                    value={form.maxPositions}
                    onChange={handleChange}
                    type='number'
                    placeholder='Maxium positions for this job'
                />
                <label>Working time</label>
                <Select onValueChange={(value) => setForm({ ...form, workingTime: value })}>
                    <SelectTrigger>
                        <SelectValue placeholder={form.workingTime.replace('-', ' ').replace('T', 't')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='Full-Time'>Full time</SelectItem>
                        <SelectItem value='Part-Time'>Part time</SelectItem>
                    </SelectContent>
                </Select>
                <label>Hiring date</label>
                <div className='grid grid-cols-[1fr_min-content_1fr] gap-x-4 items-center'>
                    <Input name='startDate' value={form.startDate} onChange={handleChange} type='date' />
                    <span>to</span>
                    <Input name='endDate' value={form.endDate} onChange={handleChange} type='date' />
                </div>
                <Button type='submit' className='col-span-2 my-2 mx-auto' disabled={submitDisabled}>
                    Create Job
                </Button>
            </form>
        </div>
    )
}

export default CompanyCreateJob
