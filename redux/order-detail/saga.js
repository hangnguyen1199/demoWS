import { all, takeEvery, fork, put, call, delay } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';

export function* getOrderByStatus() {
    yield takeEvery(actions.LOAD_ORDER_DETAIL, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_ORDER_DETAIL });
            const response = yield call(() => factories.requestGetOrderDetail(data));
            yield put({
                type: actions.LOAD_ORDER_DETAIL_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_ORDER_DETAIL_FAILURE, error });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getOrderByStatus),
    ]);
}