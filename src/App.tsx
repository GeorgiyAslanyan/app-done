import s from './App.module.css';
import 'antd/dist/antd.css';
import React from 'react'
import {Link, Route, withRouter} from "react-router-dom";
import UsersPage from "./components/Users/UsersContainer";
import FollowedUsersContainer from "./components/FollowedUsers/FollowedUsersContainer";
import {LoginPage} from "./components/Login/LoginPage";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/preloader";
import {compose} from "redux";
import {withSuspense} from "./hoc/withSuspense";
import {AppStateType} from "./redux/redux-store";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import ProfileContainer from "./components/profile/ProfileContainer";

import { Layout, Menu, Breadcrumb} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {AppHeader} from "./components/header/AppHeader";

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))


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
const SuspendedChat = withSuspense(ChatPage)

class App extends React.Component<PropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if(!this.props.initialized){
            return <Preloader />
        }

        return (
            <Layout>
                <AppHeader />
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="Мой профиль">
                                    <Menu.Item key="1"><Link to="/profile">Профиль</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs">Сообщения</Link></Menu.Item>
                                    <Menu.Item key="3"><Link to="/chat">Чат</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Разработчики">
                                    <Menu.Item key="4"><Link to="/followed">Мои подписки</Link></Menu.Item>
                                    <Menu.Item key="5"><Link to="/users">Пользователи</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to="/music">Музыка</Link></Menu.Item>
                                    <Menu.Item key="7"><Link to="/settings">Настройки</Link></Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <div className={s.contentSide}>
                            <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                            <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                            <Route path='/users' render={() => <UsersPage />}/>
                            <Route path='/login' render={() => <LoginPage/>}/>
                            <Route path='/followed' render={() => <FollowedUsersContainer/>}/>
                            <Route path='/chat' render={() => <SuspendedChat/>}/>
                        </div>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Georgiy Aslanyan 2021</Footer>
            </Layout>
            // <div className={s.app}>
            //     <HeaderContainer/>
            //     <div className={s.content}>
            //         <Nav/>

            //     </div>
            // </div>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);