import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/store'
import { useNavigate } from 'react-router-dom'
import { setMessages, setTyperID, setTyping, setUserMessageLoading, setAllUserData } from '../features/chatSlice'
import { getChatData, get_all_users } from '../services/api'
import { BiLogOut, BiSearch } from 'react-icons/bi'
import { toast, ToastContainer } from 'react-toastify'
import { PiChatsFill } from 'react-icons/pi'
import { socket } from '../App'
import ChatCard from '~/components/ChatCard'
import Loading from '~/components/ui/Loading'
import ConversationCard from '~/components/ConversationCard'
import DummyChatCard from '~/components/ui/DummnyChatCard'

const EmployeeChat = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showConversationBox, setShowConversationBox] = useState('basic')
    const [searchTerm, setSearchTerm] = useState('')
    const [showName, setShowName] = useState(false)
    const [typingTimeout, setTypingTimeout] = useState<number | null>(null)
    const token = useSelector((state: RootState) => state.employeeAuth.employeeToken)
    const userData = useSelector((state: RootState) => state.employeeAuth.employee)
    const chatSelected = useSelector((state: RootState) => state.chatState.chatSelected)
    const allUsers = useSelector((state: RootState) => state.chatState.allUsers)
    const receiver = useSelector((state: RootState) => state.chatState.receiverSelected)
    const someoneTyping = useSelector((state: RootState) => state.chatState.someOneTyping)
    const loading = useSelector((state: RootState) => state.chatState.userMessageLoading)

    useEffect(() => {
        if (!token) {
            socket.emit('userOffline', userData?._id)
            navigate('/')
        }
    }, [navigate, token, userData])

    useEffect(() => {
        getDataOfAllUsers()
    }, [showConversationBox])

    useEffect(() => {
        if (receiver && Object.keys(receiver).length > 0 && userData) {
            getChat()
        } else {
            dispatch(setMessages([]))
            return
        }
    }, [receiver, userData])

    const getChat = async () => {
        dispatch(setUserMessageLoading(true))
        if (!userData || !receiver) return dispatch(setUserMessageLoading(false))
        const getMessages = { employeeId: userData?._id, companyId: receiver?._id }
        const res = await getChatData(getMessages, token)
        if (res?.success) {
            dispatch(setUserMessageLoading(false))
            dispatch(setMessages(res?.data))
        } else {
            dispatch(setUserMessageLoading(false))
        }
    }

    const getDataOfAllUsers = async () => {
        if (!userData?._id) return
        const res = await get_all_users(userData._id, token)
        if (res?.data.success) {
            dispatch(setAllUserData(res?.data.data))
        } else {
            console.log('Wrong thing happen')
            toast.error(res?.statusText)
        }
    }

    const useOutsideClick = (callback: () => void) => {
        const ref = useRef<HTMLDivElement>(null)

        React.useEffect(() => {
            const handleClick = (event: MouseEvent) => {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    callback()
                }
            }
            document.addEventListener('click', handleClick, true)
            return () => {
                document.removeEventListener('click', handleClick, true)
            }
        }, [callback, ref])

        return ref
    }

    const handleClickOutside = () => {
        setShowName(false)
    }

    // Detecting if user click on outside of targeted Div then close that div automatically
    const showNameRef = useOutsideClick(handleClickOutside)

    // Throttling the search input to avoid unnecessary API calls
    const throttle = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout>

        return function (this: unknown, ...args: T) {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            timeoutId = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }

    const throttledFilter = throttle<string[]>(filterItems, 500)

    function filterItems(searchTerm: string) {
        if (showConversationBox === 'basic') {
            return allUsers?.filter((user) => user.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
        }
    }

    const handleSearchInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value)
            throttledFilter(e.target.value)
        },
        [throttledFilter]
    )

    useEffect(() => {
        const handleUserIsTyping = () => {
            if (someoneTyping) {
                socket.emit('userIsTyping', { employeeId: userData?._id, companyId: receiver?._id })
            } else {
                socket.emit('userStopTyping', { employeeId: userData?._id, companyId: receiver?._id })
            }
        }

        const timeoutId = setTimeout(handleUserIsTyping, 500)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [receiver?._id, someoneTyping, userData?._id])

    useEffect(() => {
        const handleUserIsTyping = () => {
            socket.emit('userIsTyping', { senderId: userData?._id, receiverId: receiver?._id })

            if (typingTimeout) {
                clearTimeout(typingTimeout)
            }
        }

        if (someoneTyping) {
            handleUserIsTyping()
        } else {
            if (typingTimeout) {
                clearTimeout(typingTimeout)
                setTypingTimeout(null)
            }
        }

        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout)
            }
        }
    }, [someoneTyping, userData, receiver, typingTimeout])

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleTyping = (data: any) => {
            const { employeeId, companyId } = data
            if (employeeId !== companyId?._id) {
                dispatch(setTyping(true))
                dispatch(setTyperID({ employeeId, companyId }))
            }
        }

        socket.on('userIsTyping', handleTyping)

        return () => {
            socket.off('userIsTyping', handleTyping)
        }
    }, [dispatch, someoneTyping])

    useEffect(() => {
        const handleUserStopTyping = () => {
            dispatch(setTyping(false))
        }

        socket.on('userStopTyping', handleUserStopTyping)

        return () => {
            socket.off('userStopTyping', handleUserStopTyping)
        }
    }, [dispatch, someoneTyping])

    return (
        <div className={`w-full min-h-screen bg-gray-50 flex items-center justify-center`}>
            <BiLogOut
                onClick={() => navigate('/')}
                className={`lg:text-4xl z-50 text-xl cursor-pointer fixed   lg:top-6  left-5 top-3 text-black`}
            />
            {loading && <Loading />}
            <div className={`lg:w-10/12 mx-2 w-full h-[780px] shadow bg-gray-200 rounded-xl flex relative`}>
                {/* side bar container starts*/}
                <div
                    className={`w-20 h-full bg-gray-600 -xl flex flex-col items-center justify-start py-4 text-white gap-4`}
                >
                    <div
                        onClick={() => setShowName(true)}
                        className='avatar placeholder tooltip tooltip-open tooltip-top'
                    >
                        {userData.avatar === null && (
                            <div className='bg-neutral-focus rounded-full w-12 h-12 flex items-center justify-center border hover:bg-gray-200 hover:text-black'>
                                <span>{userData?.name.substring(0, 1)}</span>
                            </div>
                        )}
                        {userData.avatar != null && (
                            <div className='bg-neutral-focus rounded-full w-12 h-12 flex items-center justify-center border hover:bg-gray-200 hover:text-black'>
                                <img
                                    src={userData.avatar}
                                    alt='User Avatar'
                                    className='w-full h-full object-cover rounded-full'
                                />
                            </div>
                        )}
                    </div>
                    {showName && (
                        <div
                            ref={showNameRef}
                            className='absolute z-50  left-16 t op-10 text-center min-w-max chat-bubble bg-slate-900 text-white px-3 py-4'
                        >
                            <p className='text-xl '>{userData?.name}</p>
                        </div>
                    )}

                    <PiChatsFill
                        onClick={() => setShowConversationBox('basic')}
                        data-tip='Groups'
                        className='cursor-pointer my-3 text-xl tooltip tooltip-open tooltip-top'
                    />
                </div>
                {/* side bar container ends */}

                {/* container to start conversations */}
                <div
                    className={`lg:flex ${
                        chatSelected ? 'hidden' : 'flex'
                    }  w-full py-2 lg:w-4/12 h-full flex-col border-r border-gray-200`}
                >
                    <div className={`w-full h-[4.4rem] flex items-center justify-center bg-gray-200 text-center`}>
                        <div className={`w-4/5 rounded-xl flex items-center justify-center bg-white `}>
                            <BiSearch className={`text-xl text-black mx-4`} />
                            <input
                                onChange={handleSearchInputChange}
                                type='text'
                                placeholder='Search...'
                                className={` px-2 py-3 outline-none bg-transparent border-0 text-black w-full max-w-full `}
                            ></input>
                        </div>
                    </div>
                    <div className={`w-full h-full bg-gray-200 overflow-y-auto overflow-x-hidden py-2`}>
                        <>
                            {filterItems(searchTerm)?.map((user, index) => (
                                <ConversationCard key={user?._id + index} user={user} />
                            ))}
                        </>
                    </div>
                </div>
                {/* container to start conversations */}

                {/* container to show chats */}
                <div
                    className={`${chatSelected ? 'flex w-full' : 'hidden'} w-8/12 rounded-xl h-full  lg:flex  flex-col`}
                >
                    {chatSelected === 'basic' ? <ChatCard /> : <DummyChatCard />}
                </div>
                {/* container to show chats */}
            </div>
            <ToastContainer />
            <p className={`fixed text-sm lg:text-base bottom-2 lg:bottom-5 text-center text-black `}>@iTJobHunter</p>
        </div>
    )
}

export default EmployeeChat
