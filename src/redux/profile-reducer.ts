import {ProfileType, PostsType, PhotosType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {UsersAPI} from "../api/users-api";
import {profileAPI} from "../api/profile-api";
import { FormAction } from "redux-form";

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

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'samurai-network/profile/ADD-POST':
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
        case 'samurai-network/profile/SET-USER-PROFILE' :
            return {
                ...state,
                profile: action.profile
            }
        case 'samurai-network/profile/SET-STATUS' :
            return {
                ...state,
                status: action.status
            }
        case 'samurai-network/profile/SAVE-PHOTO-SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}

export const actions = {
    addPostSuccess: (newPostText: string) => ({type: 'samurai-network/profile/ADD-POST', newPostText} as const),
    setUserProfileSuccess: (profile: ProfileType) => ({type: 'samurai-network/profile/SET-USER-PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'samurai-network/profile/SET-STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'samurai-network/profile/SAVE-PHOTO-SUCCESS', photos} as const)
}

export const addPost = (newPostText: string) : ThunkType => async (dispatch) => {
    dispatch(actions.addPostSuccess(newPostText))
}

export const setUserProfile = (userId: number) : ThunkType => async (dispatch) => {
    let data = await UsersAPI.getProfile(userId)
    dispatch(actions.setUserProfileSuccess(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export default profileReducer

export type InitialStateType = typeof  initialState
type ActionsTypes =  InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
