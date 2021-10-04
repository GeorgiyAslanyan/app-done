import {actions, follow, unfollow} from "./users-reducer"
import {UsersAPI} from "../api/users-api";
import {APIResponseType} from "../api/api";
import {ResultCodesEnum} from "../types/types";

jest.mock('../api/users-api')
const UsersAPIMock = UsersAPI as jest.Mocked<typeof UsersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    UsersAPIMock.follow.mockClear()
    UsersAPIMock.unfollow.mockClear()
})

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

UsersAPIMock.follow.mockReturnValue(Promise.resolve(result))
UsersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test('success follow thunk', async () => {
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenLastCalledWith(1, actions.toggleIsFetching(true))
    expect(dispatchMock).toHaveBeenLastCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenLastCalledWith(3, actions.toggleIsFetching(false))
})

test('success unfollow thunk', async () => {
    const thunk = unfollow(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenLastCalledWith(1, actions.toggleIsFetching(true))
    expect(dispatchMock).toHaveBeenLastCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenLastCalledWith(3, actions.toggleIsFetching(false))
})