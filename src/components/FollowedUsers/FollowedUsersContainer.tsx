import {useSelector} from "react-redux";
import FollowedUsers from "./FollowedUsers";
import React from "react";
import Preloader from "../common/preloader/preloader";
import {getIsFetching} from "../../redux/users-selector";

type FollowedUsersPagePropsType = {}

const UsersAPIComponent: React.FC<FollowedUsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return (<>
        {isFetching ? <Preloader/> : null}
        <FollowedUsers/>
    </>)
}

export default UsersAPIComponent

