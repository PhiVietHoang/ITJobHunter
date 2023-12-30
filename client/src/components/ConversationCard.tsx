import { useDispatch, useSelector } from 'react-redux'
import { setChatSelected, setReceiverSelected } from '../features/chatSlice'
import { userData } from '../store'
import React from 'react'
import { RootState } from '../store'

export interface ConversationCardProps {
    user: userData
}

const ConversationCard = ({ user }: ConversationCardProps) => {
    const dispatch = useDispatch()
    const typingOn = useSelector((state: RootState) => state.chatState.typing)
    const TyperID = useSelector((state: RootState) => state.chatState.typerID)
    const loggedInUser = useSelector((state: RootState) => state.employeeAuth.employee)
    const [typing, setTyping] = React.useState(false)
    const handleClick = () => {
        dispatch(setChatSelected('basic'))
        dispatch(setReceiverSelected(user))
    }

    React.useEffect(() => {
        TyperID?.employeeId === user._id &&
        TyperID?.companyId !== user?._id &&
        loggedInUser?._id === TyperID?.companyId &&
        typingOn
            ? setTyping(true)
            : setTyping(false)
    }, [TyperID, loggedInUser?._id, typingOn, user._id])

    return (
        <div
            onClick={handleClick}
            className={`w-11/12 relative h-20 bg-white  hover:bg-gray-300 text-black my-2 flex items-center cursor-pointer rounded-2xl px-2 mx-4 justify-start transition-all duration-700`}
        >
            <div className={`avatar ${user?.online ? 'online' : ''} mx-4 placeholder`}>
                <div className='bg-neutral-focus text-neutral-content border border-gray-200 rounded-full w-12 h-12 overflow-hidden flex items-center justify-center'>
                    {!user.companyLogo && (
                        <div className='flex items-center justify-center'>
                            <span className='text-xs flex'>{user.companyName.substring(0, 2)}</span>
                        </div>
                    )}
                    {user.companyLogo && (
                        <img src={user.companyLogo} alt="Logo" className='h-full w-full object-fit object-center'/>
                    )}
                </div>
            </div>

            <h1 className='font-semibold tracking-widest '>{user.companyName}</h1>
            {typing && (
                <p className={`text-xs absolute bottom-2 left-20 text-black tracking-widest font-semibold`}>
                    Typing...
                </p>
            )}
        </div>
    )
}

export default ConversationCard
