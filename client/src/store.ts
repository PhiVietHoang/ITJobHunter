import { configureStore } from '@reduxjs/toolkit'

import employeeAuthReducer from '~/features/auth/employeeAuthSlice'
import employerAuthReducer from '~/features/auth/employerAuthSlice'

export interface RootState {
    employeeAuth: {
        employeeToken: string
        employee: {
            id: string
            avatar: string
        }
    }
    employerAuth: {
        employerToken: string
        company: {
            id: string
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
