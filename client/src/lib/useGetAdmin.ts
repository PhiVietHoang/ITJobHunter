import { useEffect, useState } from 'react'
import { getAllCompany, getAllEmployee, getAllJob, getAllJobApply } from '~/services/api'

interface ITotal {
    totalCompany: number
    totalEmployee: number
    totalJob: number
    totalJobApply: number
}

function useGetAdminTotal() {
    const [total, setTotal] = useState<ITotal>({
        totalCompany: 0,
        totalEmployee: 0,
        totalJob: 0,
        totalJobApply: 0
    })

    const getTotalCompany = async () => {
        const response = await getAllCompany()
        if (response?.status === 200) {
            setTotal((prev) => ({ ...prev, totalCompany: response.data.length }))
        } else {
            console.log(response)
        }
    }

    const getTotalEmployee = async () => {
        const response = await getAllEmployee()
        if (response?.status === 200) {
            setTotal((prev) => ({ ...prev, totalEmployee: response.data.length }))
        } else {
            console.log(response)
        }
    }

    const getTotalJob = async () => {
        const response = await getAllJob()
        if (response?.status === 200) {
            setTotal((prev) => ({ ...prev, totalJob: response.data.length }))
        } else {
            console.log(response)
        }
    }

    const getTotalJobApply = async () => {
        const response = await getAllJobApply()
        if (response?.status === 200) {
            setTotal((prev) => ({ ...prev, totalJobApply: response.data.length }))
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        getTotalCompany()
        getTotalEmployee()
        getTotalJob()
        getTotalJobApply()
    }, [])

    return total
}

export { useGetAdminTotal }
