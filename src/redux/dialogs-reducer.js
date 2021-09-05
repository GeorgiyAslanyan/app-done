const ADD_MESSAGE = 'samurai-network/dialogs/ADD-MESSAGE'

let initialState = {
    users: [
        {userId: 1, id: 1, userName: 'George'},
        {userId: 2, id: 2, userName: 'Leo'},
        {userId: 3, id: 3, userName: 'Sanya'}
    ],
    dialogs: [
        {userId: 1, id: 1, message: 'hello'},
        {userId: 1, id: 2, message: 'hello'},
        {userId: 1, id: 3, message: 'hello'},
    ],
}

const dialogsReducer = (state = initialState, action) => {
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

export const addMessageActionCreator = (newMessageText) => ({type: ADD_MESSAGE, newMessageText})

export default dialogsReducer