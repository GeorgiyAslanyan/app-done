import {ResultCodesEnum, UsersType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {UsersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    currentPage: 1,
    totalUsersCount: 2,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: ''
    }
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
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
        case 'UNFOLLOW':
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
        case 'SET_USERS': {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_FILTER': {
            return {...state, filter: action.payload}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPageSuccess: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (term: string) => ({type: 'SET_FILTER', payload: {term}} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const),

}

export const setCurrentPage = (currentPage: number): ThunkType => async (dispatch, getState) => {
    dispatch(actions.setCurrentPageSuccess(currentPage))
}

export const requestUsers = (currentPage: number,
                             pageSize: number, term: string): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setFilter(term))

    let data = await UsersAPI.getUsers(currentPage, pageSize, term)
    dispatch(actions.setTotalUsersCount(data.totalCount))
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setCurrentPageSuccess(currentPage))
    dispatch(actions.setUsers(data.items))
}

export const requestFollowedUsers = (currentPage: number,
                             pageSize: number, term: string): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setFilter(term))

    let data = await UsersAPI.getFollowedUsers(currentPage, pageSize, true, term)
    dispatch(actions.setTotalUsersCount(data.totalCount))
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setCurrentPageSuccess(currentPage))
    dispatch(actions.setUsers(data.items))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let data = await UsersAPI.follow(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.followSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let data = await UsersAPI.unfollow(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.unfollowSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export default usersReducer

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
