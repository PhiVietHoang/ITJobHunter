import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    token: localStorage.getItem('token'),
    user: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
        }
    }
})

export const { loginSuccess } = authSlice.actions
export default authSlice.reducer
