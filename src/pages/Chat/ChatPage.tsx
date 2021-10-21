import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import ava from "../../assets/images/avatar.png";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string

}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === "error"
                ? <div>Some error occured. Please refresh page</div>
                :<>
                    <Messages/>
                    <AddMessageForm/>
                </>}
        </div>
    )
}

const Messages: React.FC<{}> = ({}) => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent> ) => {
        let element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if(isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {

    return (
        <div>
            <Link to={`profile/${message.userId}`}>
                {message.photo
                    ? <img style={{width: '30px', borderRadius: '30px'}} src={message.photo}/>
                    : <img style={{width: '30px', borderRadius: '30px'}} src={ava}/>
                }
            </Link>
            <Link to={`profile/${message.userId}`}><b>{message.userName}</b></Link>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})

const AddMessageForm: React.FC<{}> = ({}) => {
    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chat.status)

    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if(!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div><textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea></div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage