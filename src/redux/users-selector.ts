import {createSelector} from 'reselect'
import {AppStateType} from "./redux-store";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getUsers = createSelector(getUsersSelector,(users => {return users}))