import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';

export function* getNotification() {
    yield takeEvery(actions.LOAD_USER_NOTIFICATION, function* () {
        try {
            yield put({ type: actions.LOADING_USER_NOTIFICATION });
            let response = yield call(() => factories.requestGetNotification());
            yield put({
                type: actions.LOAD_USER_NOTIFICATION_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_USER_NOTIFICATION_FAILURE, error });
        }
    });
}
export function* updateNotification() {
    yield takeEvery(actions.UPDATE_STATUS_NOTIFICATION, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.UPDATING_STATUS_NOTIFICATION });
            let response = yield call(() =>
                factories.requestUpdateNotification(data),
            );
            yield put({
                type: actions.UPDATE_STATUS_NOTIFICATION_SUCCESS,
                response: response,
            });
            if (response.data > 0) {
                yield put({
                    type: actions.LOAD_USER_NOTIFICATION,
                });
            }
        } catch (error) {
            yield put({
                type: actions.UPDATE_STATUS_NOTIFICATION_FAILURE,
                error,
            });
        }
    });
}

export default function* rootSaga() {
    yield all([fork(getNotification), fork(updateNotification)]);
}
