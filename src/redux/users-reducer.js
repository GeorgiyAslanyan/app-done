import {UsersAPI} from "../api/api";

const FOLLOW = 'samurai-network/users/FOLLOW'
const UNFOLLOW = 'samurai-network/users/UNFOLLOW'
const SET_USERS = 'samurai-network/users/SET-USERS'
const SET_CURRENT_PAGE = 'samurai-network/users/SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'samurai-network/users/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'samurai-network/users/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'samurai-network/users/TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {
    users: [],
    pageSize: 10,
    currentPage: 1,
    totalUsersCount: 2,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: true
                        }
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: false
                        }
                    }
                    return u
                })
            }
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FETCHING, isFetching, userId})

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let data = await UsersAPI.getUsers(currentPage, pageSize)
    dispatch(setTotalUsersCount(data.totalCount))
    dispatch(toggleIsFetching(false))
    dispatch(setCurrentPage(currentPage))
    dispatch(setUsers(data.items))
}

export const follow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await UsersAPI.follow(userId)
    if (data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const unfollow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await UsersAPI.unfollow(userId)
    if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export default usersReducer