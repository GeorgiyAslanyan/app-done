import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, savePhoto, setUserProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component{
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, {
        setUserProfile,
        getStatus,
        updateStatus,
        savePhoto
    }),
    withRouter)
(ProfileContainer)
