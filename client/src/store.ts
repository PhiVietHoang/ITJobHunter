import { configureStore } from '@reduxjs/toolkit'

import employeeAuthReducer from '~/features/auth/employeeAuthSlice'
import employerAuthReducer from '~/features/auth/employerAuthSlice'
import chatReducer from '~/features/chatSlice'

export interface RootState {
    employeeAuth: {
        employeeToken: string
        employee: {
            _id: string
            name: string
            description: string
            avatar: string
            email: string
            gender: string
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
            email: string
            password: string
            phoneNumber: string | null
            companyName: string
            companyEmails: string[]
            companyWebsites: string[]
            companyPhoneNumbers: string[]
            companyLocations: string[]
            companyLogo: string | null
            description: string | null
        }
    }
    chatState: {
        userOnline: boolean
        typing: boolean
        someOneTyping: boolean
        receiverSelected: {
            email: string
            _id: string
            companyName: string
        }
        typerID: {
            employeeId: string
            companyId: string
        } | null
        chatSelected: string
        userMessageLoading: boolean
        messages: [
            {
                _id: string
                employeeId: string
                companyId: string
                message: string
                senderIsCompany: boolean
            }
        ]
        allUsers: userData[]
        searchUsers: userData[]
    }
}

export interface userData {
    email: string
    companyName: string
    phone: string
    online: boolean
    _id: string
    users: userData[]
    createdBy: userData
    messages: [
        {
            _id: string
            employerId: string
            companyId: string
            message: string
            senderIsCompany: boolean
        }
    ]
}

const store = configureStore({
    reducer: {
        employeeAuth: employeeAuthReducer,
        employerAuth: employerAuthReducer,
        chatState: chatReducer
    }
})

export default store
