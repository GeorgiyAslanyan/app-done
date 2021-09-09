import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, savePhoto, setUserProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    setUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
}

type OwnPropsType = {
    match: any
    history: any
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class ProfileContainer extends React.Component<PropsType>{
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    refreshProfile() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = this.props.authorizedUserId
            if(!userId){
                this.props.history.push('/login')
            }
        }
        this.props.setUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     profile={this.props.profile}
                     savePhoto={this.props.savePhoto}
                     isOwner={!this.props.match.params.userId}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        setUserProfile,
        getStatus,
        updateStatus,
        savePhoto
    }),
    withRouter)
(ProfileContainer)