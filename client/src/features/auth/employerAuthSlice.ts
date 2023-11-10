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
        }
    }
})

export const { employerLoginSuccess } = employerAuthSlice.actions
export default employerAuthSlice.reducer
