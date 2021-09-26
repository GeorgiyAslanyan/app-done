import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import MyPostReduxForm, {AddPostFormsValuesType} from "./AddNewPostForm/AddNewPostForm";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = (props) => {
    const posts = props.profile.posts.map((el: { id: number, message: string, likesCount: number, repCount: number, commentsCount: number }) =>
        <Post key={el.id} message={el.message} likesCount={el.likesCount} repCount={el.repCount}
              commentsCount={el.commentsCount}/>)

    const addPost = (value: AddPostFormsValuesType) => {
        props.addPost(value.newPostText)
    }

    let postsShouldReverse = [...posts]

    return (
        <div className={s.posts}>
            <div className={s.addPostArea}>
                <span>Оставить пост:</span>
                <MyPostReduxForm onSubmit={addPost}/>
            </div>
            {postsShouldReverse.reverse()}
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized