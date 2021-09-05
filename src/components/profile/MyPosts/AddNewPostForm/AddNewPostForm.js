import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import s from "../MyPosts.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControl/FormsControl";
import React from "react";

const maxLength10 = maxLengthCreator(10)

const MyPostForm = (props) => {
    return (
        <form className={s.postArea} onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={'newPostText'} validate={[required, maxLength10]}/>
            <button>Отправить</button>
        </form>
    )
}

const MyPostReduxForm = reduxForm({form: 'addNewPost'})(MyPostForm)

export default MyPostReduxForm