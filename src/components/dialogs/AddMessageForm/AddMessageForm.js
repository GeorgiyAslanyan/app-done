import s from "../Dialogs.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/FormsControl";
import {required} from "../../../utils/validators/validators";
import React from "react";

const DialogsForm = (props) => {
    return (
        <form className={s.messagesArea} onSubmit={props.handleSubmit}>
            <Field name={'newMessageText'} placeholder={'Сообщение...'} component={Textarea} validate={[required]}/>
            <button>Отправить</button>
        </form>
    )
}

const DialogsReduxForm = reduxForm({form: 'message'})(DialogsForm)

export default DialogsReduxForm