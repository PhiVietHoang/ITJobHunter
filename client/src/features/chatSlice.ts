import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userOnline: false,
    allUsers: [],
    searchUsers: [],
    typing: false,
    typerID: {
        employeeId: '',
        companyId: ''
    },
    userMessageLoading: false,
    chatSelected: '',
    messages: [
        {
            _id: '',
            employeeId: '',
            companyId: '',
            message: '',
            senderIsCompany: ''
        }
    ],
    someOneTyping: false,
    receiverSelected: null
}

const chatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
        setChatSelected: (state, action) => {
            state.chatSelected = action.payload
        },
        setMessages: (state, action) => {
            const newMessages = Array.isArray(action.payload) ? action.payload : [action.payload]
            if (newMessages.length === 0) {
                state.messages = []
                return
            } else {
                state.messages = [...state.messages, ...newMessages]
            }
        },
        setUserMessageLoading: (state, action) => {
            state.userMessageLoading = action.payload
        },
        setTyping: (state, action) => {
            state.typing = action.payload
        },
        setTyperID: (state, action) => {
            state.typerID = action.payload
        },
        setSomeoneTyping: (state, action) => {
            state.someOneTyping = action.payload
        },
        setUserIsOnline: (state, action) => {
            state.userOnline = action.payload
        },
        setReceiverSelected: (state, action) => {
            state.receiverSelected = action.payload
            state.messages = []
        },
        setAllUserData: (state, action) => {
            state.allUsers = action.payload
        },
        setSearchUser: (state, action) => {
            state.searchUsers = action.payload
        }
    }
})

export const {
    setChatSelected,
    setUserMessageLoading,
    setMessages,
    setTyping,
    setTyperID,
    setSomeoneTyping,
    setUserIsOnline,
    setReceiverSelected,
    setAllUserData,
    setSearchUser
} = chatSlice.actions
export default chatSlice.reducer
