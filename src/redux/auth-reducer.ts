import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {ResultCodesEnum} from "../types/types";
import {authAPI} from "../api/auth-api";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    mainPhoto: '' as string | null
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'samurai-network/auth/SET-USER-DATA':
            return {
                ...state,
                ...action.data
            }
        case 'samurai-network/auth/SET-MAIN_PHOTO':
            return {
                ...state,
                mainPhoto: action.mainPhoto
            }
        default:
            return state
    }
}

export const actions = {
    setUserDataSuccess: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: 'samurai-network/auth/SET-USER-DATA',
        data: {userId, login, email, isAuth}
    }as const),
    setMainPhotoSuccess: (mainPhoto: any) => ({type: 'samurai-network/auth/SET-MAIN_PHOTO', mainPhoto} as const )
}


export const setUserData = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me()
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = response.data
        dispatch(actions.setUserDataSuccess(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
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
        dispatch(actions.setUserDataSuccess(null, null, null, false))
    }
}

export const setMainPhoto = (): ThunkType => async (dispatch) => {
    let data = await authAPI.setProfilePhoto()
    dispatch(actions.setMainPhotoSuccess(data.photos.small))
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsTypes =  InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

