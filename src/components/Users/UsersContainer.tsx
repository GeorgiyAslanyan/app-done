import {connect} from "react-redux";
import Users from "./Users";
import {
    setCurrentPage,
    follow, requestUsers,
    unfollow, FilterType
} from "../../redux/users-reducer";
import React from "react";
import Preloader from "../common/preloader/preloader";
import {getUsers, getUsersFilter} from "../../redux/users-selector";
import {UsersType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number, term: string) => void
    setCurrentPage: (pageNumber: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersAPIComponent extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, '')
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize, this.props.filter.term)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props;
        this.props.getUsers(1, pageSize, filter.term)
    }

    render() {
        return (<>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   onFilterChanged={this.onFilterChanged}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   onPageChanged={this.onPageChanged}
                   followingInProgress={this.props.followingInProgress}
            />
        </>)
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalUsersCount: state.usersPage.totalUsersCount,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        filter: getUsersFilter(state)
    }
}


export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        getUsers: requestUsers,
        setCurrentPage
    })
)(UsersAPIComponent)

