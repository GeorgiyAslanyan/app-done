import s from './App.module.css';
import React from 'react'
import Nav from "./components/nav/Nav";
import {Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/preloader";
import {compose} from "redux";
import {withSuspense} from "./hoc/withSuspense";
import {AppStateType} from "./redux/redux-store";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import ProfileContainer from "./components/profile/ProfileContainer";

type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)

class App extends React.Component<PropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if(!this.props.initialized){
            return <Preloader />
        }
        return (
            <div className={s.app}>
                <HeaderContainer/>
                <div className={s.content}>
                    <Nav/>
                    <div className={s.contentSide}>
                        <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                        <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                        <Route path='/users' render={() => <UsersContainer pageTitle={'Title'}/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);