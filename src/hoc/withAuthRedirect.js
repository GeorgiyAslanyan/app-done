import * as React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

let mapStateToPropsForRedirect = (state) => ({
        isAuth: state.auth.isAuth
    }
)

export const withAuthRedirect = (Component) => {
    class RedirectedComponent extends React.Component {
        render() {
            if(!this.props.isAuth) return <Redirect to={'/login'} />
                return <Component {...this.props}/>
        }
    }
    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectedComponent)
    return ConnectedRedirectComponent
}