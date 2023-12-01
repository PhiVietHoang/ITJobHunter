import { configureStore } from '@reduxjs/toolkit'

import employeeAuthReducer from '~/features/auth/employeeAuthSlice'
import employerAuthReducer from '~/features/auth/employerAuthSlice'

export interface RootState {
    employeeAuth: {
        employeeToken: string
        employee: {
            _id: string
            name: string
            description: string
            avatar: string
            email: string
            phoneNumber: string
            address: {
                country: string
            }
            experience: string
            skill: {
                technical: string[]
                soft: string[]
            }
            education: {
                _id: string
                nameSchool: string
                degree: string
                completeDate: string
            }[]
            certificates: {
                _id: string
                name: string
                issuedBy: string
                from: string
                to: string
            }[]
            joinDate: Date
        }
    }
    employerAuth: {
        employerToken: string
        company: {
            _id: string
            avatar: string
        }
    }
}

const store = configureStore({
    reducer: {
        employeeAuth: employeeAuthReducer,
        employerAuth: employerAuthReducer
    }
})

export default store
