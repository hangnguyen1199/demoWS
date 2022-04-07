import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import actions from "./action";
import factories from "./factory";

export function* getUsersRewardList() {
    yield takeEvery(actions.LOAD_REWARD_LIST, function* (payload) {
        const { callback } = payload;
        try {
            const response = yield call(() => factories.requestGetUsersReward());
            yield put({
                type: actions.LOAD_REWARD_LIST_SUCCESS,
                payload: response.data,
            });
            if (callback) {
                callback();
            }
        } catch (error) {
            yield put({ type: actions.LOAD_REWARD_LIST_FAILURE });
        }
    });
}

export function* getUsersRewardReceive() {
    yield takeEvery(actions.USER_REWARD_RECEIVE, function* (payload) {
        const { callback } = payload;
        try {
            const response = yield call(() =>
                factories.requestPostUserRewardReceive()
            );
            yield put({
                type: actions.LOAD_REWARD_LIST,
            });
        } catch (error) {
            console.log("error", error);
        } finally {
            if (callback) {
                callback();
            }
        }
    });
}

export default function* rootSaga() {
    yield all([fork(getUsersRewardList), fork(getUsersRewardReceive)]);
}
