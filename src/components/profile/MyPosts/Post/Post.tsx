import React from "react";
import s from './Post.module.css'

type PropsType = {
    message: string
    likesCount: number
    commentsCount: number
    repCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.post}>
            <h3>{props.message}</h3>
            <div className={s.postReaction}>
                <button>{props.likesCount} likes</button>
                <button>{props.commentsCount} comments</button>
                <button>{props.repCount} rep</button>
            </div>
        </div>
    )
}

export default Post