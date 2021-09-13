import {UsersAPI} from "../api/api";
import {ResultCodesEnum, UsersType} from "../types/types";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'samurai-network/users/FOLLOW'
const UNFOLLOW = 'samurai-network/users/UNFOLLOW'
const SET_USERS = 'samurai-network/users/SET-USERS'
const SET_CURRENT_PAGE = 'samurai-network/users/SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'samurai-network/users/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'samurai-network/users/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'samurai-network/users/TOGGLE-IS-FOLLOWING-PROGRESS'


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    currentPage: 1,
    totalUsersCount: 2,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = FollowSuccessActionType | UnFollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType |
    SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
}

type UnFollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId: number
}

type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UsersType>
}

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId: number): UnFollowSuccessActionType => ({type: UNFOLLOW, userId})
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (currentPage: number,
                             pageSize: number): ThunkType => async (dispatch, getState) => {
    dispatch(toggleIsFetching(true))
    let data = await UsersAPI.getUsers(currentPage, pageSize)
    dispatch(setTotalUsersCount(data.totalCount))
    dispatch(toggleIsFetching(false))
    dispatch(setCurrentPage(currentPage))
    dispatch(setUsers(data.items))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await UsersAPI.follow(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(followSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await UsersAPI.unfollow(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(unfollowSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export default usersReducer