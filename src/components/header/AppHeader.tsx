import React from "react";
// import s from './Header.module.css'
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectLogin, selectMainPhoto} from "../../redux/auth-selector";
import {logout} from "../../redux/auth-reducer";

const {Header} = Layout;

type PropsType = {}

export const AppHeader: React.FC<PropsType> = (props) => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectLogin)
    const mainPhoto = useSelector(selectMainPhoto)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout)
    }

    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/users">Пользователи</Link></Menu.Item>
                    </Menu>
                </Col>
                {isAuth
                    ? <>
                        <Col span={1}><Avatar alt={login || ''} style={{backgroundColor: '#87d068'}}
                                              icon={< s/>}/></Col>
                        <Col span={5}><Button onClick={logoutCallback}>Выйти</Button></Col>
                    </>
                    : <Col span={6}>
                        <Link to='/login'>Login</Link>
                    </Col>}
            </Row>
        </Header>
    )
}