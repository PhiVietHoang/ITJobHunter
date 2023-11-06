import { configureStore } from '@reduxjs/toolkit'

import employeeAuthReducer from '~/features/auth/employeeAuthSlice'

export interface RootState {
    employeeAuth: {
        token: string
        employee: {
            id: string
            avatar: string
        }
    }
    employerAuth: {
        token: string
        employer: {
            id: string
            avatar: string
        }
    }
}

const store = configureStore({
    reducer: {
        employeeAuth: employeeAuthReducer
    }
})

export default store
