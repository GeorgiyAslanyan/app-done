import s from "../Dialogs.module.css";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/FormsControl";
import {required} from "../../../utils/validators/validators";
import React from "react";

type PropsType = {

}

export type AddMessageFormValuesType = {
    newMessageText: string
}

const DialogsForm: React.FC<InjectedFormProps<AddMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form className={s.messagesArea} onSubmit={props.handleSubmit}>
            <Field name={'newMessageText'} placeholder={'Сообщение...'} component={Textarea} validate={[required]}/>
            <button>Отправить</button>
        </form>
    )
}

export default reduxForm<AddMessageFormValuesType, PropsType>({form: 'message'})(DialogsForm)