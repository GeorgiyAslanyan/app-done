import React from "react";
import s from './ProfileInfo.module.css'
import ava from '../../../assets/images/avatar.png'
import Preloader from "../../common/preloader/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { ProfileType } from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        // if(e.target.files.length) {
        //     props.savePhoto(e.target.files[0])
        // }
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