import s from "./MessageItem.module.css";
import React from "react";

const MessageItem = (props) => {
    return (
            <div className={s.addedMessage}>
                <span>{props.message}</span>
            </div>
    )
}

export default MessageItem