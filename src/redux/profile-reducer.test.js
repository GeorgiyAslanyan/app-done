import profileReducer, {addPostActionCreator} from "./profile-reducer";

let state = {
    profile: null,
    posts: [
        {id: 1, message: 'Hello', likesCount: 3, repCount: 2, commentsCount: 4},
        {id: 2, message: 'Hi', likesCount: 2, repCount: 1, commentsCount: 2},
        {id: 3, message: 'Third post', likesCount: 4, repCount: 2, commentsCount: 4},
    ],
    newPostText: '',
    status: ''
}

test('length of posts should be incremented', () => {
    let action = addPostActionCreator('test text')
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)
})