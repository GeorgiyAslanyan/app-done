import React, {useEffect} from "react";
import s from "./Users.module.css";
import ava from "../../assets/images/avatar.png";
import {NavLink} from "react-router-dom";
import Paginator from "../common/paginator/Paginator";
import UsersSearchForm from "./UsersSearchForm";
import {FilterType, requestUsers, follow, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selector";

type PropsType = {}

const Users: React.FC<PropsType> = ({...props}) => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, ''))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter.term))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter.term))
    }
    const Unfollow = (id: number) => {
        dispatch(unfollow(id))
    }
    const Follow = (id: number) => {
        dispatch(follow(id))
    }

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
                                    ? <button disabled={followingInProgress.some(id => id === u.id)}
                                              onClick={() => {
                                                  Unfollow(u.id)
                                              }}>Отписаться</button>
                                    : <button disabled={followingInProgress.some(id => id === u.id)}
                                              onClick={() => {
                                                  Follow(u.id)
                                              }}>Подписаться</button>}
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
                    <div>
                        <UsersSearchForm onFilterChanged={onFilterChanged}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users