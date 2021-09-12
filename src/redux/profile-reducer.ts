import {profileAPI, UsersAPI} from "../api/api";
import {ProfileType, PostsType, PhotosType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = 'samurai-network/profile/ADD-POST'
const SET_USER_PROFILE = 'samurai-network/profile/SET-USER-PROFILE'
const SET_STATUS = 'samurai-network/profile/SET-STATUS'
const SAVE_PHOTO_SUCCESS = 'samurai-network/profile/SAVE-PHOTO-SUCCESS'


let initialState = {
    profile: null as ProfileType | null,
    posts: [
        {id: 1, message: 'Hello', likesCount: 3, repCount: 2, commentsCount: 4},
        {id: 2, message: 'Hi', likesCount: 2, repCount: 1, commentsCount: 2},
        {id: 3, message: 'Third post', likesCount: 4, repCount: 2, commentsCount: 4},
    ] as Array<PostsType>,
    newPostText: '' as string,
    status: '' as string,
}

export type InitialStateType = typeof  initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                message: action.newPostText,
                likesCount: 0,
                repCount: 0,
                commentsCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case SET_USER_PROFILE :
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS :
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}

type ActionsTypes = AddPostCreatorActionType | SetUserProfileSuccessActionType | SetStatusActionType | SavePhotoSuccessActionType

type AddPostCreatorActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
type SetUserProfileSuccessActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const addPostActionCreator = (newPostText: string): AddPostCreatorActionType => ({type: ADD_POST, newPostText})
export const setUserProfileSuccess = (profile: ProfileType): SetUserProfileSuccessActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setUserProfile = (userId: number) : ThunkType => async (dispatch) => {
    let data = await UsersAPI.getProfile(userId)
    dispatch(setUserProfileSuccess(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}

export default profileReducer