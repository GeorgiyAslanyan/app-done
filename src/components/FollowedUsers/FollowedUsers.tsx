import React, {useEffect} from "react";
import s from "./FollowedUsers.module.css";
import ava from "../../assets/images/avatar.png";
import {NavLink, useHistory} from "react-router-dom";
import Paginator from "../common/paginator/Paginator";
import UsersSearchForm from "../Users/UsersSearchForm";
import {FilterType, follow, requestFollowedUsers, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selector";
import queryString from "querystring";

type PropsType = {}

type QueryParamsType = { term?: string, page?: string };

const FollowedUsers: React.FC<PropsType> = ({...props}) => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1 )) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if(!!parsed.page) actualPage = Number(parsed.page)

        if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        dispatch(requestFollowedUsers(actualPage, pageSize, actualFilter.term))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (currentPage !== 1 ) query.page = String(currentPage)

        history.push({
            pathname: '/followed',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestFollowedUsers(pageNumber, pageSize, filter.term))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestFollowedUsers(1, pageSize, filter.term))
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
                                    ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {Unfollow(u.id)}}>Отписаться</button>
                                    : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {Follow(u.id)}}>Подписаться</button>}
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
                    <div className={s.search}>
                        <UsersSearchForm onFilterChanged={onFilterChanged}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FollowedUsers