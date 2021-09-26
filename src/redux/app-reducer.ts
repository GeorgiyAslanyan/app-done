import {setUserData} from "./auth-reducer";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'samurai-network/app/INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'samurai-network/app/INITIALIZED-SUCCESS'} as const)
}

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(setUserData())
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
