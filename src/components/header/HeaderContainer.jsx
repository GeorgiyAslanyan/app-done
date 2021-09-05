import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout, setMainPhoto} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.setMainPhoto()
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        mainPhoto: state.auth.mainPhoto
    }
}

export default connect(mapStateToProps, {
    setMainPhoto,
    logout
})(HeaderContainer)