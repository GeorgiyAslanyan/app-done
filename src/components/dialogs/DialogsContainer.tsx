import {addMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    dialogsPage: any
}

type MapDispatchToPropsType = {
    addMessage: (newMessageText: string) => void
}

type OwnPropsType = {

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        addMessage: (newMessageText: string) => {
            dispatch(addMessageActionCreator(newMessageText))
        }
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)
(Dialogs)