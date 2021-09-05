import {createSelector} from 'reselect'

const getUsersSelector = (state) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector,(users => {return users}))