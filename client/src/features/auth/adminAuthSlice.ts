import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    adminToken: localStorage.getItem('adminToken'),
    admin: null
}
const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        adminLoginSuccess: (state, action) => {
            state.adminToken = action.payload.adminToken
            state.admin = action.payload.admin
        },
        setToken: (state, action) => {
            state.adminToken = action.payload
        },
        setEmployee: (state, action) => {
            state.admin = action.payload
        }
    }
})

export const { adminLoginSuccess, setToken, setEmployee } = adminAuthSlice.actions
export default adminAuthSlice.reducer
