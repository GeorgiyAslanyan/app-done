import s from "./MessageItem.module.css";
import React from "react";

type PropsType = {
    message: string
}

const MessageItem: React.FC<PropsType> = (props) => {
    return (
            <div className={s.addedMessage}>
                <span>{props.message}</span>
            </div>
    )
}

export default MessageItem