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
        }
    }
})

export const { employeeLoginSuccess } = employeeAuthSlice.actions
export default employeeAuthSlice.reducer
