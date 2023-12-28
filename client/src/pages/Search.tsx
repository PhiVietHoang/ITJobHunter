import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Slider } from '~/components/ui/slider'
import SearchJobCard from '~/components/SearchJobCard'
import { Input } from '~/components/ui/input'
import Pagination from '~/components/Pagination'
import { searchJobs } from '~/services/api'

interface JobData {
    _id: string
    title: string
    categories: string[]
    workingTime: string
    location: string
    yearsOfExp: string
    description: string
    startDate: string
    endDate: string
    maxPositions: number
    offerSalary: string
    requiredSkills: string[]
    companyID: {
        _id: string
        companyLogo: string
        companyName: string
        companyLocations: string[]
    }
}

const Search = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [searchResults, setSearchResults] = useState(state.jobs as JobData[])
    const [filteredResults, setFilteredResults] = useState(state.jobs as JobData[])
    const totalPages = state.totalPages

    const [currentPage, setCurrentPage] = useState(0)

    const [searchLocation, setSearchLocation] = useState('')
    const [searchWorkingTime, setWorkingTime] = useState('')
    const [searchSalary, setSearchSalary] = useState('')
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');


    useEffect(() => {
        let filteredResults = searchResults;
        filteredResults = locationFilter(filteredResults, searchLocation);
        filteredResults = workingTimeFilter(filteredResults, searchWorkingTime);
        filteredResults = salaryFilter(filteredResults, minSalary, maxSalary);
        setFilteredResults(filteredResults);
    }, [searchResults, searchLocation, searchWorkingTime, minSalary, maxSalary]);
    
    // Thêm vào array bên trên khi triển khai xong filter khác, ví dụ [searchResults, searchLocation, searchExperience, searchSalary]

    const locationFilter = (input: JobData[], filterString: string) => {
        if (!filterString) {
            return input
        }
        return input.filter((item) =>
            item.companyID.companyLocations.toString().toLowerCase().includes(filterString.toLowerCase())
        )
    }

    // TODO
    const workingTimeFilter = (input: JobData[], filterString: string) => {
        if (!filterString) {
            return input;
        }
        return input.filter((item) => item.workingTime.toLowerCase() === filterString.toLowerCase());
    };

    const salaryFilter = (input: JobData[], minSalary: string, maxSalary: string) => {
        if (!minSalary && !maxSalary) {
            return input;
        }
    
        const filteredResults = input.filter((item) => {
            const offerSalary = item.offerSalary;
    
            if (offerSalary) {
                // Extracting numeric values from the offerSalary string
                const [minOffer, maxOffer] = offerSalary
                    .replace(/[^0-9.-]+/g, "")
                    .split("-")
                    .map(value => parseFloat(value));
    
                // Checking conditions based on user input
                if (minSalary && maxSalary) {
                    return minOffer <= parseFloat(minSalary) && maxOffer >= parseFloat(maxSalary);
                } else if (minSalary) {
                    return minOffer <= parseFloat(minSalary) && maxOffer >= parseFloat(minSalary);
                } else if (maxSalary) {
                    return maxOffer >= parseFloat(maxSalary) && minOffer <= parseFloat(maxSalary);
                }
            }
    
            return false;
        });
    
        return filteredResults;
    };
    
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchLocation = e.target.value
        setSearchLocation(searchLocation)
    }

    // TODO
    const handleWorkingTimeChange = (value: string) => {
        setWorkingTime(value);
    };
    const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = e.target.value;
        if (type === 'min') {
            setMinSalary(value);
        } else {
            setMaxSalary(value);
        }
    };

    const handlePageChange = async (page: number) => {
        const response = await searchJobs({ title: state.searchTitle, page })
        if (response?.status === 200) {
            setSearchResults(response.data.jobs)
            setCurrentPage(page)
            window.scrollTo(0, 0)
        } else {
            console.log(response)
        }
    }

    const handleSeeJobDetail = (result: JobData) => {
        navigate(`/job/${result._id}`, { state: result })
    }

    return (
        <div className='my-8'>
            <div className='my-8 flex items-start gap-4'>
                <div className='px-4 w-1/4 lg:w-[30%] min-w-min h-max bg-white rounded-lg shadow-sm'>
                    <h1 className='my-4 text-lg font-bold'>Filters</h1>
                    <div className='my-6'>
                        <p className='my-2 font-semibold'>Experience</p>
                        <Slider defaultValue={[0]} max={10} step={1} />
                    </div>
                    <RadioGroup defaultValue='full-time' className='my-6'>
                        <p className='my-2 font-semibold'>Working Time</p>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='full-time'
                                            id='full-time'
                                            onChange={() => handleWorkingTimeChange('full-time')}
                                            checked={searchWorkingTime === 'full-time'} />
                            <Label htmlFor='full-time'>Full-time</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='part-time'
                                            id='part-time'
                                            onChange={() => handleWorkingTimeChange('part-time')}
                                            checked={searchWorkingTime === 'part-time'}/>
                            <Label htmlFor='part-time'>Part-time</Label>
                        </div>
                    </RadioGroup>
                    <div className='my-6'>
                        <p className='my-2 font-semibold'>Salary</p>
                        <div className='grid grid-cols-2 gap-x-2'>
                            <Input type='text'
                                   placeholder='Min'
                                   onChange={(e) => handleSalaryChange(e, 'min')}
                                   value={minSalary}
                                   />
                            <Input type='text'
                                   placeholder='Max'
                                   onChange={(e) => handleSalaryChange(e, 'max')}
                                   value={maxSalary}/>
                        </div>
                    </div>
                    <div className='my-6'>
                        <p className='my-2 font-semibold'>Location</p>
                        <Input
                            type='text'
                            placeholder='Hanoi, Vietnam'
                            onChange={handleLocationChange}
                            value={searchLocation}
                        />
                    </div>
                </div>
                <div className='min-w-min flex flex-col gap-4 grow'>
                    {filteredResults.map((result) => (
                        <div key={result._id} onClick={() => handleSeeJobDetail(result)}>
                            <SearchJobCard {...result} />
                        </div>
                    ))}
                </div>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    )
}

export default Search