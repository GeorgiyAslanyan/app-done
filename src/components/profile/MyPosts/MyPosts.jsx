import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import MyPostReduxForm from "./AddNewPostForm/AddNewPostForm";


class MyPosts extends React.PureComponent {
    render() {
        const posts = this.props.profile.posts.map(el => <Post key={el.id} message={el.message}
                                                               likesCount={el.likesCount} repCount={el.repCount}
                                                               commentsCount={el.commentsCount}/>)

        const addPost = (value) => {
            this.props.addPost(value.newPostText)
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
}

export default MyPosts