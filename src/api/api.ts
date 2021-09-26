import axios from "axios";
import {ResultCodesEnum, UsersType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '5b560a0f-0559-41ac-8be2-7fd956ba41ce'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

