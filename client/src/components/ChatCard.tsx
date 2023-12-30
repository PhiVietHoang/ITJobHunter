import React, { useRef, useEffect } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { setChatSelected, setMessages, setSomeoneTyping } from '../features/chatSlice'
import { socket } from '../App'
import { RootState } from '../store'
import { send_message } from '../services/api'

const ChatCard = () => {
    const dispatch = useDispatch()
    const typingOn = useSelector((state: RootState) => state.chatState.typing)
    const TyperID = useSelector((state: RootState) => state.chatState.typerID)
    const [typing, setTyping] = React.useState(false)
    const messageContainerRef = useRef<HTMLDivElement>(null)
    const [sendMessage, setSendMessage] = React.useState('')
    const user = useSelector((state: RootState) => state.employeeAuth.employee)
    const receiver = useSelector((state: RootState) => state.chatState.receiverSelected)
    const messages = useSelector((state: RootState) => state.chatState.messages)
    const token = useSelector((state: RootState) => state.employeeAuth.employeeToken)

    React.useEffect(() => {
        if (
            TyperID?.companyId === user?._id &&
            TyperID?.employeeId !== user?._id &&
            typingOn &&
            receiver?._id === TyperID?.employeeId
        ) {
            setTyping(true)
        } else {
            setTyping(false)
        }
    }, [TyperID, typingOn, user, receiver, sendMessage])

    useEffect(() => {
        if (sendMessage !== '') {
            dispatch(setSomeoneTyping(true))
        } else {
            dispatch(setSomeoneTyping(false))
        }
    }, [dispatch, sendMessage])

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!sendMessage || !user || !receiver) return console.error('Please type something')
        const messageData = { employeeId: user?._id, companyId: receiver?._id, message: sendMessage }

        socket.emit('sendMsg', messageData)

        const res = await send_message(messageData, token)
        if (res?.success) {
            console.log('Send message successfully')
        } else {
            console.error('Huhu something went wrong')
        }
        setSendMessage('')
    }

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        socket.on('sendMsg', (data) => {
            dispatch(setMessages(data))
        })

        return () => {
            socket.off('sendMsg')
        }
    }, [dispatch])

    return (
        <>
            <div className={`w-full h-20 flex items-center justify-between bg-white text-center`}>
                <div className='flex'>
                    <div className='mx-4 placeholder'>
                        <div className='bg-white overflow-hidden rounded-full w-12 h-12 flex items-center justify-center border border-gray-200 text-black -xl'>
                            {receiver.companyLogo && (
                                <img
                                    src={receiver.companyLogo}
                                    alt='logo'
                                    className='object-contain object-center w-full h-full bg-white'
                                />
                            )}
                            {!receiver.companyLogo && (
                                <div className='flex items-center justify-center'>
                                    <span>{receiver.companyName.slice(0, 1)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col text-left py-2 '>
                        <h1 className={`text-black font-semibold tracking-widest text-sm uppercase`}>
                            {receiver?.companyName}
                        </h1>
                        {typing && <p className={`text-xs text-black tracking-widest font-semibold`}>Typing...</p>}
                    </div>
                </div>

                <button
                    onClick={() => dispatch(setChatSelected(false))}
                    className={`text-black mx-4 hover:text-blue-600`}
                >
                    <RxCross2 className='text-2xl' />
                </button>
            </div>

            <div
                ref={messageContainerRef}
                className='flex flex-col bg-white w-full h-full px-3 py-3 overflow-y-auto space-y-1 border-t border-gray-200'
            >
                {messages.map((message, i) => {
                    const isSender = message.senderIsCompany
                    const chatStyle = isSender ? 'items-start order-2' : 'order-1 item-end'
                    const chatClass = isSender ? '' : 'justify-end'
                    const messStyle = isSender
                        ? 'rounded-bl-none bg-gray-300 text-gray-700'
                        : 'rounded-br-none bg-blue-600 text-white'
                    return (
                        <div key={i} className={`flex items-end ${chatClass}`}>
                            <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${chatStyle}`}>
                                <div>
                                    <span className={`px-4 py-3 rounded-lg inline-block ${messStyle}`}>
                                        {message.message}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <form onSubmit={handleSendMessage} className={`h-20 bg-white flex items-center justify-start px-4`}>
                <input
                    value={sendMessage}
                    onChange={(e) => setSendMessage(e.target.value)}
                    type='text'
                    placeholder='Type here'
                    className={`input bg-white text-black input-bordered w-full max-w-full border border-gray-500 rounded-md p-2`}
                />
                <button
                    title='sumbitButton'
                    type='submit'
                    className='btn btn-circle btn-primary mx-3 rounded-full p-2 hover:bg-blue-500'
                >
                    <AiOutlineSend className='text-xl' />
                </button>
            </form>
        </>
    )
}

export default ChatCard
