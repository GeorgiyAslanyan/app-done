import React from "react";
import LoginReduxForm, {LoginFormValuesType} from "./LoginForm/LoginForm";
import s from './Login.module.css'
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

type OwnPropsType = {

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

const Login: React.FC<PropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.login}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} {...props}/>
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login} )(Login);
