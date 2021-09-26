import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileFavourite from "./ProfileFavourite/ProfileFavourite";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type PropsType = {
    status: string
    profile: ProfileType | null
    isOwner: boolean

    savePhoto: (file: File) => void
    updateStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo status={props.status}
                         updateStatus={props.updateStatus}
                         profile={props.profile}
                         savePhoto={props.savePhoto}
                         isOwner={props.isOwner}/>
            <div className={s.underInfo}>
                <MyPostsContainer/>
                <ProfileFavourite />
            </div>
        </div>
    )
}

export default Profile