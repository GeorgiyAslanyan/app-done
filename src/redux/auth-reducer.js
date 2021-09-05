import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA'
const SET_MAIN_PHOTO = 'samurai-network/auth/SET-MAIN_PHOTO'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    mainPhoto: ''
}

const authReducer = (state = initialState, action) => {
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

export const setUserDataSuccess = (userId, login, email, isAuth) => ({
    type: SET_USER_DATA,
    data: {userId, login, email, isAuth}
})
export const setMainPhotoSuccess = (mainPhoto) => ({type: SET_MAIN_PHOTO, mainPhoto})

export const setUserData = () => async (dispatch) => {
    let response = await authAPI.me()
    if (response.resultCode === 0) {
        let {id, login, email} = response.data
        dispatch(setUserDataSuccess(id, login, email, true))
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe)
    if (data.resultCode === 0) {
        dispatch(setUserData())
    } else {
        let message = data.messages.length > 0
            ? data.messages[0]
            : 'some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setUserDataSuccess(null, null, null, false))
    }
}


export const setMainPhoto = () => async (dispatch) => {
    let data = await authAPI.setProfilePhoto()
    dispatch(setMainPhotoSuccess(data.photos.small))
}

export default authReducer