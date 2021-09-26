import React from "react";
import s from './Nav.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {

}

const Nav: React.FC<PropsType> = (props) => {
    return (
        <div className={s.nav}>
                <NavLink activeClassName={s.active} to="/profile">Профиль</NavLink>
                <NavLink activeClassName={s.active} to="/dialogs">Сообщения</NavLink>
                <NavLink activeClassName={s.active} to="/followed">Мои подписки</NavLink>
                <NavLink activeClassName={s.active} to="/users">Пользователи</NavLink>
                <NavLink activeClassName={s.active} to="/music">Музыка</NavLink>
                <NavLink activeClassName={s.active} to="/settings">Настройки</NavLink>
        </div>
    )
}

export default Nav