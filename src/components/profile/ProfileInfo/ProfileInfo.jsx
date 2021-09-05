import React from "react";
import s from './ProfileInfo.module.css'
import ava from '../../../assets/images/avatar.png'
import Preloader from "../../common/preloader/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={s.profileInfo}>
            <div className={s.aboutMe}>
                <div><h2>{props.profile.fullName}</h2></div>
                <div><h3><ProfileStatusWithHooks updateStatus={props.updateStatus}
                                        status={props.status}/></h3></div>
            </div>
            <div className={s.ava}>
                {props.profile.photos.large
                    ? <img src={props.profile.photos.large} alt=""/>
                    : <img src={ava} alt=""/>}
                {props.isOwner && <input onChange={onMainPhotoSelected} type={'file'}/> }
            </div>
        </div>
    )
}

export default ProfileInfo