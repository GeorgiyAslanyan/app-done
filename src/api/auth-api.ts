import {instance} from "./api";
import {APIResponseType} from './api'

export type MeResponseDataType = {id: number, email: string, login: string}
export type LoginResponseDataType = {userId: number}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    setProfilePhoto() {
        return instance.get('profile/17049')
            .then(response => {
                return response.data
            })
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<APIResponseType<LoginResponseDataType>>(`auth/login`, {email, password, rememberMe})
            .then(response => {
                return response.data
            })
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data
            })
    }
}