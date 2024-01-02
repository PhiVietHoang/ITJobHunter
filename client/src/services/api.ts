import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const token = localStorage.getItem('employeeToken')

interface JobApplicationRequestBody {
    jobId: string
    employeeId: string
    cv: File
    status: string
}

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

export const createJobApplication = async (requestBody: JobApplicationRequestBody, token: string) => {
    const formData = new FormData()
    formData.append('jobId', requestBody.jobId)
    formData.append('employeeId', requestBody.employeeId)
    formData.append('status', requestBody.status)
    formData.append('cv', requestBody.cv)

    const response = await api.post('jobApplication/jobApplications', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export const getJobApplicationsByEmployee = async (employeeId: string, token: string) => {
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
    requestBody: { employeeId: string; companyId: string; message: string; senderIsCompany: boolean },
    token: string
) => {
    try {
        const { employeeId, companyId, message, senderIsCompany } = requestBody
        const res = await api.post(
            `message/send-message`,
            { employeeId, companyId, message, senderIsCompany },
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

export const searchCompany = async (requestBody: { companyName: string; page: number }) => {
    try {
        const { companyName, page } = requestBody
        const response = await api.post('company/filter-companies', { companyName, page })
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getAllCompany = async () => {
    try {
        const response = await api.get('company/companies')
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getJobByCompany = async (companyID: string) => {
    try {
        const response = await api.get(`job/jobsByCompany?companyID=${companyID}`)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const downloadCV = async (jobApplicationId: string) => {
    try {
        const response = await api.get(`jobApplication/download-cv/${jobApplicationId}`, {
            responseType: 'blob'
        })
        const file = new Blob([response.data], { type: response.headers['content-type'] })
        console.log('Headers:', response.headers)
        const contentDisposition = response.headers['content-disposition']
        let filename = 'download'
        if (contentDisposition) {
            const matches = /filename="([^"]+)"/.exec(contentDisposition)
            if (matches && matches[1]) {
                filename = matches[1]
            }
        }
        const fileURL = URL.createObjectURL(file)
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', filename)
        document.body.appendChild(fileLink)

        fileLink.click()

        document.body.removeChild(fileLink)
        URL.revokeObjectURL(fileURL)
    } catch (error) {
        console.error(error)
    }
}
