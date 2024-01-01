import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    employerToken: localStorage.getItem('employerToken'),
    company: null
}
const employerAuthSlice = createSlice({
    name: 'employerAuth',
    initialState,
    reducers: {
        employerLoginSuccess: (state, action) => {
            state.employerToken = action.payload.employerToken
            state.company = action.payload.company
        },
        setToken: (state, action) => {
            state.employerToken = action.payload
        },
        setCompany: (state, action) => {
            state.company = action.payload
        }
    }
})

export const { employerLoginSuccess, setToken, setCompany } = employerAuthSlice.actions
export default employerAuthSlice.reducer
