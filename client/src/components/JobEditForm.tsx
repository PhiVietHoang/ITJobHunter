import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const JobEditForm = () => {
    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState<string[]>([])
    const [level, setLevel] = useState('')
    const [requiredSkills, setRequiredSkills] = useState<string[]>([])
    const [maxPositions, setMaxPositions] = useState(0)
    const [yearsOfExperience, setYearsOfExperience] = useState(0)
    const [description, setDescription] = useState('')
    const [workingTime, setWorkingTime] = useState('')
    const [offerSalary, setOfferSalary] = useState(0)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='w-4/5 my-4 mx-auto p-8 px-12 grid grid-cols-[max-content_1fr] items-center gap-y-4 gap-x-8 bg-white rounded-lg shadow-md'
        >
            <h1 className='col-span-2 font-semibold text-lg'>Edit Job</h1>
            <label className='text-sm font-semibold'>Title:</label>
            <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />

            <label className='text-sm font-semibold'>Categories:</label>
            <select
                multiple
                value={categories}
                onChange={(e) => setCategories(Array.from(e.target.selectedOptions, (option) => option.value))}
            >
                <option value='Option 1' className='text-sm'>
                    Option 1
                </option>
                <option value='Option 2' className='text-sm'>
                    Option 2
                </option>
                <option value='Option 3' className='text-sm'>
                    Option 3
                </option>
            </select>
            <label className='text-sm font-semibold'>Level:</label>
            <Input type='text' value={level} onChange={(e) => setLevel(e.target.value)} />
            <label className='text-sm font-semibold'>Required Skills:</label>
            <select
                multiple
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(Array.from(e.target.selectedOptions, (option) => option.value))}
            >
                <option value='Option 1' className='text-sm'>
                    Option 1
                </option>
                <option value='Option 2' className='text-sm'>
                    Option 2
                </option>
                <option value='Option 3' className='text-sm'>
                    Option 3
                </option>
            </select>
            <label className='text-sm font-semibold'>Max Positions:</label>
            <Input type='number' value={maxPositions} onChange={(e) => setMaxPositions(parseInt(e.target.value))} />
            <label className='text-sm font-semibold'>Years of Experience:</label>
            <Input
                type='number'
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(parseInt(e.target.value))}
            />
            <label className='text-sm font-semibold'>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <label className='text-sm font-semibold'>Working Time:</label>
            <Input type='text' value={workingTime} onChange={(e) => setWorkingTime(e.target.value)} />
            <label className='text-sm font-semibold'>Offer Salary:</label>
            <Input type='number' value={offerSalary} onChange={(e) => setOfferSalary(parseFloat(e.target.value))} />
            <label className='text-sm font-semibold'>Start Date:</label>
            <Input
                type='date'
                value={startDate.toISOString().substr(0, 10)}
                onChange={(e) => setStartDate(new Date(e.target.value))}
            />
            <label className='text-sm font-semibold'>End Date:</label>
            <Input
                type='date'
                value={endDate.toISOString().substr(0, 10)}
                onChange={(e) => setEndDate(new Date(e.target.value))}
            />
            <Button type='submit' className='col-span-2 mx-auto'>
                Submit
            </Button>
        </form>
    )
}

export default JobEditForm
