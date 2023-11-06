import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    token: localStorage.getItem('token'),
    user: null
}
const employeeAuthSlice = createSlice({
    name: 'employeeAuth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
        }
    }
})

export const { loginSuccess } = employeeAuthSlice.actions
export default employeeAuthSlice.reducer
