import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControl/FormsControl";
import React from "react";
import {minLengthCreator, required} from "../../../utils/validators/validators";
import s from './LoginForm.module.css'
import {LoginFormValuesType} from "../../../types/types";

const minLength8 = minLengthCreator(8)

type LoginFormOwnProps = {

}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (
        <form className={s.loginForm} onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'login'} name={'email'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} type={'password'} component={Input} validate={[required, minLength8]}/>
            </div>
            {props.error && <div className={s.formError}>
                {props.error}
            </div>
            }
            <div>
                <Field name={'rememberMe'} component={'input'} type={'checkbox'}/>Remember me
            </div>
            <button>Войти</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

export default LoginReduxForm