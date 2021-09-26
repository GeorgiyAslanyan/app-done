import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import s from "../MyPosts.module.css";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControl/FormsControl";
import React from "react";

const maxLength10 = maxLengthCreator(10)

export type AddPostFormsValuesType = {
    newPostText: string
}


type PropsType = {

}

const MyPostForm: React.FC<InjectedFormProps<AddPostFormsValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form className={s.postArea} onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={'newPostText'} validate={[required, maxLength10]}/>
            <button>Отправить</button>
        </form>
    )
}

const MyPostReduxForm = reduxForm<AddPostFormsValuesType, PropsType>({form: 'addNewPost'})(MyPostForm)

export default MyPostReduxForm