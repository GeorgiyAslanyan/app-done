import {useSelector} from "react-redux";
import Users from "./Users";
import React from "react";
import Preloader from "../common/preloader/preloader";
import {getIsFetching} from "../../redux/users-selector";

type UsersPagePropsType = {}

const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return (<>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>)
}

export default UsersPage