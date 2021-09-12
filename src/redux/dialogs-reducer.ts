const ADD_MESSAGE = 'samurai-network/dialogs/ADD-MESSAGE'

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

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
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

type ActionsTypes = AddMessageActionCreatorType

type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE,
    newMessageText: string
}

export const addMessageActionCreator = (newMessageText: string): AddMessageActionCreatorType => ({type: ADD_MESSAGE, newMessageText})

export default dialogsReducer