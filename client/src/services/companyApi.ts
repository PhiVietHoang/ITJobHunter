import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const token = localStorage.getItem('employerToken')

const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` },
    validateStatus: function (status) {
        return status >= 200 && status < 500 // Accepts responses with status code in the range 200-499
    }
})

export const employerRegister = async (requestBody: { companyName: string; email: string; password: string }) => {
    try {
        const { companyName, email, password } = requestBody
        const response = await api.post('company/register', { companyName, email, password })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const employerLogin = async (requestBody: { email: string; password: string }) => {
    try {
        const { email, password } = requestBody
        const response = await api.post('company/login', { email, password })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getCurrentCompany = async (token: string) => {
    try {
        const response = await api.get('company/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const filterJobByCompany = async (requestBody: { title: string; companyID: string; page: number }) => {
    try {
        const { title, companyID, page } = requestBody
        const response = await api.post(`job/jobs/filtered-jobs-by-company`, { title, companyID, page })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const get_all_users = async (id: unknown, token: string) => {
    try {
        const res = await api.get(`message/get-company-all-users?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        console.error(error)
    }
}
