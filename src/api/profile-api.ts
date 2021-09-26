import {PhotosType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status})
            .then(response => {
                return response.data
            })
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>('profile/photo', formData)
            .then(response => {
                return response.data
            })
    },
    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile)
            .then(response => {
                return response.data
            })
    }
}