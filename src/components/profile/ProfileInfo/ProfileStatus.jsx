import * as React from "react";

class ProfileStatus extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    state = {
        status: this.props.status,
        editMode: false
    }
    activateEditMode = () => {
        this.setState({editMode:true})
    }
    deActivateEditMode = () => {
        this.setState({editMode:false})
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    render() {
        return (
            <>
                <div>
                    {!this.state.editMode && <span onClick={this.activateEditMode}>{this.props.status || 'No status'}</span>}
                </div>
                <div>
                    {this.state.editMode && <input onChange={this.onStatusChange} onBlur={this.deActivateEditMode} autoFocus={true} value={this.state.status}/>}
                </div>
            </>
        )
    }
}

export default ProfileStatus