import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    employeeToken: localStorage.getItem('employeeToken'),
    employee: null
}
const employeeAuthSlice = createSlice({
    name: 'employeeAuth',
    initialState,
    reducers: {
        employeeLoginSuccess: (state, action) => {
            state.employeeToken = action.payload.employeeToken
            state.employee = action.payload.employee
        },
        setToken: (state, action) => {
            state.employeeToken = action.payload
        },
        setEmployee: (state, action) => {
            state.employee = action.payload
        }
    }
})

export const { employeeLoginSuccess, setToken, setEmployee } = employeeAuthSlice.actions
export default employeeAuthSlice.reducer
