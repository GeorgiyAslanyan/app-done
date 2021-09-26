import {addPost} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {compose} from "redux";

type MapStateToPropsType = {
    newPostText: string
    profile: any
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

type OwnPropsType = {

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage
    }
}

let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        addPost: (newPostText) => {
            dispatch(addPost(newPostText))
        }
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)
)(MyPosts)