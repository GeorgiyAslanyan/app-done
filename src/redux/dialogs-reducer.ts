import {BaseThunkType, InferActionsTypes} from "./redux-store";

type UsersType = {
    userId: number,
    id: number,
    userName: string
}

type DialogsType = {
    userId: number,
    id: number,
    message: string
}

let initialState = {
    users: [
        {userId: 1, id: 1, userName: 'George'},
        {userId: 2, id: 2, userName: 'Leo'},
        {userId: 3, id: 3, userName: 'Sanya'}
    ] as Array<UsersType>,
    dialogs: [
        {userId: 1, id: 1, message: 'hello'},
        {userId: 1, id: 2, message: 'hello'},
        {userId: 1, id: 3, message: 'hello'},
    ] as Array<DialogsType>,
}


const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'samurai-network/dialogs/ADD-MESSAGE':
            let newMessage = {
                userId: 1,
                id: state.dialogs.length + 1,
                message: action.newMessageText,
            }
            return {
                ...state,
                dialogs: [...state.dialogs, newMessage],
            }
        default:
            return state
    }
}

export const actions = {
    addMessageSuccess: (newMessageText: string) => ({type: 'samurai-network/dialogs/ADD-MESSAGE', newMessageText}as const)
}

export const addMessage = (newMessageText: string): ThunkType => async (dispatch) => {
    dispatch(actions.addMessageSuccess(newMessageText))
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsTypes =  InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>