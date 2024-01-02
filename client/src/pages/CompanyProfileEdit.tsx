import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { Input } from '~/components/ui/input'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { arrayToText, textToArray } from '~/lib/utils'
import { updateCompany } from '~/services/companyApi'

const CompanyProfileEdit = () => {
    const navigate = useNavigate()
    const company = useSelector((state: RootState) => state.employerAuth.company)
    const [companyData, setCompanyData] = useState(company)
    const token = localStorage.getItem('employerToken')!

    useEffect(() => {
        setCompanyData(company)
    }, [company])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const avatarFile = e.target.files?.[0]
        if (avatarFile) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                console.log(base64String)
                setCompanyData((prevState) => ({
                    ...prevState,
                    companyLogo: base64String
                }))
            }
            reader.readAsDataURL(avatarFile)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (['companyEmails', 'companyWebsites', 'companyPhoneNumbers', 'companyLocations'].includes(name)) {
            setCompanyData({ ...companyData, [name]: textToArray(value) })
        } else {
            setCompanyData({ ...companyData, [name]: value })
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(companyData)
        const res = await updateCompany(companyData._id, companyData, token)
        if (res?.status === 200) {
            navigate(`/employer/profile/${companyData._id}`)
            window.location.reload()
        }
    }

    if (!company) return null

    return (
        <form className='my-12 px-12 bg-white rounded-lg mx-auto w-2/3 grid gap-2' onSubmit={handleSubmit}>
            <h1 className='my-6 text-center font-semibold text-lg'>Company Profile Editor</h1>
            <Label htmlFor='avatar' className='text-md'>
                Logo
            </Label>
            <div className='mx-auto w-min flex flex-col justify-center gap-2'>
                <Input type='file' id='avatar' onChange={handleFileChange} />
                <div className='w-64 aspect-square flex rounded-lg overflow-hidden'>
                    {companyData.companyLogo && <img src={companyData.companyLogo} alt='Preview' />}
                </div>
            </div>
            <Label htmlFor='email' className='text-md'>
                Primary email
            </Label>
            <Input type='email' value={companyData.email} disabled />

            <Label htmlFor='companyEmails' className='text-md'>
                Other emails
            </Label>
            <Input
                id='companyEmails'
                name='companyEmails'
                type='text'
                value={arrayToText(companyData.companyEmails)}
                onChange={handleChange}
            />

            <Label htmlFor='phoneNumber' className='text-md'>
                Primary phone number
            </Label>
            <Input
                id='phoneNumber'
                name='phoneNumber'
                type='text'
                value={companyData.phoneNumber ? companyData.phoneNumber : ''}
                onChange={handleChange}
            />

            <Label htmlFor='companyPhoneNumbers' className='text-md'>
                Other phone numbers
            </Label>
            <Input
                id='companyPhoneNumbers'
                name='companyPhoneNumbers'
                type='text'
                value={arrayToText(companyData.companyPhoneNumbers)}
                onChange={handleChange}
            />

            <Label htmlFor='companyName' className='text-md'>
                Name
            </Label>
            <Input
                id='companyName'
                name='companyName'
                type='text'
                value={companyData.companyName}
                onChange={handleChange}
            />

            <Label htmlFor='description' className='text-md'>
                Description
            </Label>
            <Textarea
                id='description'
                name='description'
                value={companyData.description ? companyData.description : ''}
                onChange={handleChange}
            />

            <Label htmlFor='companyLocations' className='text-md'>
                Locations
            </Label>
            <Input
                id='companyLocations'
                name='companyLocations'
                type='text'
                value={arrayToText(companyData.companyLocations)}
                onChange={handleChange}
            />

            <Label htmlFor='companyWebsites' className='text-md'>
                Websites
            </Label>
            <Input
                id='companyWebsites'
                name='companyWebsites'
                type='text'
                value={arrayToText(companyData.companyWebsites)}
                onChange={handleChange}
            />

            <Button className='my-8' type='submit'>
                Confirm
            </Button>
        </form>
    )
}

export default CompanyProfileEdit
