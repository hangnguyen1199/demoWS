import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from 'redux-saga/effects';
import actions from './action';
import factories from './factory';

export function* getNewsList() {
    yield takeEvery(
        actions.FETCH_NEWS_LIST,
        function* (payload) {
            const {
                data,
                callback,
            } = payload;
            try {
                const response = yield call(() =>
                    factories.requestNewsList(data),
                );
                yield put({
                    type: actions.FETCH_NEWS_LIST_SUCCESS,
                    payload: response.data,
                });
            } catch (error) {
                yield put({
                    type: actions.FETCH_NEWS_LIST_FAILURE,
                });
            } finally {
                if (callback) {
                    callback();
                }
            }
        },
    );
}

export function* getNotificationList() {
    yield takeEvery(
        actions.FETCH_NOTIFICATION_LIST,
        function* (payload) {
            const {
                data,
                callback,
            } = payload;
            try {
                const response = yield call(() =>
                    factories.requestNotificationList(data),
                );
                yield put({
                    type: actions.FETCH_NOTIFICATION_LIST_SUCCESS,
                    payload: response.data,
                });
            } catch (error) {
                yield put({
                    type: actions.FETCH_NOTIFICATION_LIST_FAILURE,
                });
            } finally {
                if (callback) {
                    callback();
                }
            }
        },
    );
}

export function* getPromotionList() {
    yield takeEvery(
        actions.FETCH_PROMOTION_LIST,
        function* (payload) {
            const {
                data,
                callback,
            } = payload;
            try {
                const response = yield call(() =>
                    factories.requestPromotionList(data),
                );
                yield put({
                    type: actions.FETCH_PROMOTION_LIST_SUCCESS,
                    payload: response.data,
                });
            } catch (error) {
                yield put({
                    type: actions.FETCH_PROMOTION_LIST_FAILURE,
                });
            } finally {
                if (callback) {
                    callback();
                }
            }
        },
    );
}

export default function* rootSaga() {
    yield all([
        fork(getNewsList),
        fork(getNotificationList),
        fork(getPromotionList)
    ]);
}
