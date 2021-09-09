import React from "react";
import s from "./Users.module.css";
import ava from "../../assets/images/avatar.png";
import {NavLink} from "react-router-dom";
import Paginator from "../common/paginator/Paginator";
import {UsersType} from "../../types/types";

type PropsType = {
    currentPage: number,
    pageSize: number,
    totalUsersCount: number,
    users: Array<UsersType>,
    onPageChanged: (pageNumber: number) => void,
    followingInProgress: Array<number>,
    unfollow: (id: number) => void,
    follow: (id: number) => void
}

const Users: React.FC<PropsType> = ({currentPage, pageSize, totalUsersCount, users, onPageChanged, ...props}) => {
    return (
        <div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                       currentPage={currentPage} onPageChanged={onPageChanged}/>
            <div className={s.content}>
                <div>
                    {users.map(u => <div key={u.id} className={s.user}>
                        <div className={s.leftBlock}>
                            <NavLink to={`/profile/${u.id}`}>
                                <div className={s.ava}>
                                    {u.photos.small
                                        ? <img src={u.photos.small} alt=""/>
                                        : <img src={ava} alt=""/>}
                                </div>
                            </NavLink>
                            <div>
                                {u.followed
                                    ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                                    : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {props.follow(u.id)}}>Follow</button>}
                            </div>
                        </div>
                        <div className={s.infoBlock}>
                            <NavLink to={`/profile/${u.id}`}>
                                <div>{u.name}</div>
                            </NavLink>
                        </div>
                    </div>)}
                </div>
                <div className={s.searchMenu}>
                    Search menu
                </div>
            </div>
        </div>
    )
}


export default Users