import * as React from "react";
import {useState, useEffect} from "react";

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    useEffect(() => {setStatus(props.status)}, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <>
            <div>
                {!editMode && <span onClick={activateEditMode}>{props.status || 'No status'}</span>}
            </div>
            <div>
                {editMode && <input onChange={onStatusChange} onBlur={deActivateEditMode} autoFocus={true} value={status}/>}
            </div>
        </>
    )
}

export default ProfileStatusWithHooks