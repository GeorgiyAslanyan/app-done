import {GetUsersResponseType, instance} from "./api";
import {profileAPI} from "./profile-api";
import {APIResponseType} from './api'

export const UsersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId)
    }
}