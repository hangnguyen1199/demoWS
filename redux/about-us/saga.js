import {
    all,
    takeEvery,
    fork,
    put,
    call,
    delay,
} from 'redux-saga/effects';
import actions from './action';
import factories from './factory';

export function* getListNews() {
    yield takeEvery(
        actions.LOAD_NEWS,
        function* (payload) {
            try {
                const { data } = payload;
                yield put({ type: actions.LOADING_NEWS });
                const response = yield call(() =>
                    factories.requestGetNews(data),
                );
                yield put({
                    type: actions.LOAD_NEWS_SUCCESS,
                    response: response.data,
          
                });
            } catch (error) {
                yield put({
                    type: actions.LOAD_NEWS_FAILURE,
                    error,
                });
            }
        },
    );
}

export default function* rootSaga() {
    yield all([fork(getListNews)]);
}
