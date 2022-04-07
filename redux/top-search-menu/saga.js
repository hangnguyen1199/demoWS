import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';

export function* getSearchKeyword() {
    yield takeEvery(actions.FETCH_KEYWORD_SEARCH, function* (payload) {
        const { data, callback } = payload;
        try {
            const response = yield call(() =>
                factories.requestSearchKeyword(data),
            );
            yield put({
                type: actions.FETCH_KEYWORD_SEARCH_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            yield put({
                type: actions.FETCH_KEYWORD_SEARCH_FAILURE,
            });
        } finally {
            if (callback) {
                callback();
            }
        }
    });
}

export function* getSearchKeywordScreen() {
    yield takeEvery(actions.FETCH_KEYWORD_SEARCH_SCREEN, function* (payload) {
        const { data, callback } = payload;
        try {
            const response = yield call(() =>
                factories.requestSearchKeyword(data),
            );
            yield put({
                type: actions.FETCH_KEYWORD_SEARCH_SCREEN_SUCCESS,
                payload: response.data,
            });
        } catch (error) {

        } finally {
            if (callback) {
                callback();
            }
        }
    });
}


export default function* rootSaga() {
    yield all([fork(getSearchKeyword),fork(getSearchKeywordScreen)]);
}
