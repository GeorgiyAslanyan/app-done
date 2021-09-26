import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, savePhoto, setUserProfile, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
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

type PathParamsType = {
    userId: string
}

export type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>


class ProfileContainer extends React.Component<ProfileContainerPropsType>{
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: ProfileContainerPropsType) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if(!userId) {
            userId = this.props.authorizedUserId
            if(!userId){
                // todo maybe replace push to with Redirect?
                this.props.history.push('/login')
            }
        }
        if(!userId) {
            console.error('id should exists in URI params or in state')
        } else {
            this.props.setUserProfile(userId)
            this.props.getStatus(userId)
        }
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

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        setUserProfile,
        getStatus,
        updateStatus,
        savePhoto
    }),
    withRouter)
(ProfileContainer)