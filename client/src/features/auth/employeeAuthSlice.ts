import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    token: localStorage.getItem('token'),
    employee: null
}
const employeeAuthSlice = createSlice({
    name: 'employeeAuth',
    initialState,
    reducers: {
        employeeLoginSuccess: (state, action) => {
            state.token = action.payload.token
            state.employee = action.payload.employee
        }
    }
})

export const { employeeLoginSuccess } = employeeAuthSlice.actions
export default employeeAuthSlice.reducer
