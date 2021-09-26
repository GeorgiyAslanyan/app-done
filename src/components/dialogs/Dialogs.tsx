import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./dialogItem/DialogItem";
import MessageItem from "./messageItem/MessageItem";
import DialogsReduxForm from "./AddMessageForm/AddMessageForm";
import {InitialStateType} from "../../redux/dialogs-reducer";

type PropsType = {
    addMessage: (newMessageText: string) => void
    dialogsPage: InitialStateType
}

const Dialogs: React.FC<PropsType> = (props) => {
    let addNewMessage = (values: {newMessageText: string}) => {
        props.addMessage(values.newMessageText);
    }

    const dialogsElement = props.dialogsPage.users.map((el: {id: number, userId: number, userName: string}) => <DialogItem key={el.id} id={el.userId} userName={el.userName}/>)
    const messagesElement = props.dialogsPage.dialogs.map((el: {id: number, message: string }) => <MessageItem key={el.id} message={el.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div className={s.message}>
                    {messagesElement}
                </div>
                <DialogsReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs