import {createSelector} from 'reselect'
import {AppStateType} from "./redux-store";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}

export const getUsers = createSelector(getUsersSelector,(users => {return users}))