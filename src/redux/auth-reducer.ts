import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {ResultCodesEnum} from "../types/types";

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA'
const SET_MAIN_PHOTO = 'samurai-network/auth/SET-MAIN_PHOTO'

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    mainPhoto: '' as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case SET_MAIN_PHOTO:
            return {
                ...state,
                mainPhoto: action.mainPhoto
            }
        default:
            return state
    }
}

type ActionsTypes = SetUserDataSuccessActionType | SetMainPhotoSuccessActionType

type SetUserDataSuccessActionDataType = {
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
}

type SetUserDataSuccessActionType = {
    type: typeof SET_USER_DATA,
    data: SetUserDataSuccessActionDataType
}

type SetMainPhotoSuccessActionType = {
    type: typeof SET_MAIN_PHOTO,
    mainPhoto: any
}


export const setUserDataSuccess = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserDataSuccessActionType => ({
    type: SET_USER_DATA,
    data: {userId, login, email, isAuth}
})

export const setMainPhotoSuccess = (mainPhoto: any): SetMainPhotoSuccessActionType => ({type: SET_MAIN_PHOTO, mainPhoto})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setUserData = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me()
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = response.data
        dispatch(setUserDataSuccess(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setUserData())
    } else {
        let message = data.messages.length > 0
            ? data.messages[0]
            : 'some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setUserDataSuccess(null, null, null, false))
    }
}


export const setMainPhoto = (): ThunkType => async (dispatch) => {
    let data = await authAPI.setProfilePhoto()
    dispatch(setMainPhotoSuccess(data.photos.small))
}

export default authReducer