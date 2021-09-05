import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import logo from '../../assets/images/logo.svg.png'

const Header = (props) => {
    return (
        <div className={s.header}>
            <h1>Social network</h1>
            <img className={s.logo} src={logo} alt=""/>
            <div className={s.login}>
                {props.isAuth
                    ? <div className={s.headerMe}>
                        <img src={props.mainPhoto} alt=""/>
                        <h1>{props.login }</h1>
                        <button onClick={props.logout}>Выйти</button>
                    </div>
                    :<NavLink to='/login'>Login</NavLink>}
            </div>
        </div>
    )
}

export default Header