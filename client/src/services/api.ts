import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const token = localStorage.getItem('employeeToken')

const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` },
    validateStatus: function (status) {
        return status >= 200 && status < 500 // Accepts responses with status code in the range 200-499
    }
})

export const register = async (requestBody: { name: string; email: string; password: string }) => {
    try {
        const { name, email, password } = requestBody
        const response = await api.post('employee/register', { name, email, password })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const login = async (requestBody: { email: string; password: string }) => {
    try {
        const { email, password } = requestBody
        const response = await api.post('employee/login', { email, password })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getCurrentEmployee = async (token: string) => {
    try {
        const response = await api.get('employee/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const updateEmployee = async (id: string, requestBody: unknown, token: string) => {
    try {
        const response = await api.put(`employee/employees/${id}`, requestBody, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const searchJobs = async (requestBody: { title: string; page: number }) => {
    try {
        const { title, page } = requestBody
        const response = await api.post('job/jobs/filtered-jobs/', { title, page })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const createJobApplication = async (
    requestBody: {
        jobId: string
        employeeId: string
        cv: string
        status: string
    },
    token: string
) => {
    try {
        const { jobId, employeeId, cv, status } = requestBody
        const response = await api.post(
            'jobApplication/jobApplications/',
            { jobId, employeeId, cv, status },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getJobApplicationsByEmployee = async (employeeId: string) => {
    try {
        const response = await api.get(`jobApplication/jobApplications/employee/${employeeId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const deleteJobApplication = async (id: string) => {
    try {
        const response = await api.delete(`jobApplication/jobApplications/${id}`)
        return response
    } catch (error) {
        console.error(error)
    }
}

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

export const getChatData = async (data: { employeeId: string; companyId: string }, token: string) => {
    const { employeeId, companyId } = data
    try {
        const res = await api.get(`message/get-message?employeeId=${employeeId}&companyId=${companyId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.data
        return data
    } catch (error) {
        console.error(error)
    }
}

export const send_message = async (
    requestBody: { employeeId: string; companyId: string; message: string },
    token: string
) => {
    try {
        const { employeeId, companyId, message } = requestBody
        const res = await api.post(
            `message/send-message`,
            { employeeId, companyId, message },
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const data = await res.data
        return data
    } catch (error) {
        console.error(error)
    }
}

export const get_all_users = async (id: unknown, token: string) => {
    try {
        const res = await api.get(`message/get-all-users?id=${id}`, {
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
