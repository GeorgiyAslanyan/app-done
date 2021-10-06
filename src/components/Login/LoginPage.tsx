import React from "react";
import LoginReduxForm, {LoginFormValuesType} from "./LoginForm/LoginForm";
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

export const LoginPage: React.FC = (props) => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe))
    }

    if(isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.login}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} {...props}/>
        </div>
    )
}
