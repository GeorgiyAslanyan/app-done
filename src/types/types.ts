export type PostsType = {
    id: number,
    message: string,
    likesCount: number,
    repCount: number,
    commentsCount: number
}
export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
}
export type PhotosType = {
    small: string | null,
    large: string | null
}
export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}

export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10,
}


export type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string
}
export type FollowResponseType = {
    data: any
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}


export type MeResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}
export type LoginResponseType = {
    data: {userId: number}
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}


export type UpdateStatusResponseType = {
    data: any
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}