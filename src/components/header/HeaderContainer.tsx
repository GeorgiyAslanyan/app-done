import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout, setMainPhoto} from "../../redux/auth-reducer";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
    mainPhoto: any
}

type MapDispatchToPropsType = {
    setMainPhoto: () => void
    logout: () => void
}

type OwnPropsType = {

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType


class HeaderContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.setMainPhoto()
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        mainPhoto: state.auth.mainPhoto
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        setMainPhoto,
        logout
    })
)(HeaderContainer)