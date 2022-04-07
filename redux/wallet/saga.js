import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import actions from "./action";
import factories from "./factory";

export function* getWallet() {
    yield takeEvery(actions.LOAD_POINT_HISTORY, function* (payload) {
        const { data, callback } = payload;
        try {
            const response = yield call(() =>
                factories.requestGetPointHistories(data)
            );
            yield put({
                type: actions.LOAD_POINT_HISTORY_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
        } finally {
        }
    });
}
export function* getVoucher() {
    yield takeEvery(actions.LOAD_VOUCHER, function* (payload) {
        const { data, callback } = payload;
        try {
            const response = yield call(() => factories.requestGetVouchers(data));
            yield put({
                type: actions.LOAD_VOUCHER_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
        } finally {
        }
    });
}
export function* getPointHistoryDetail() {
    yield takeEvery(actions.LOAD_POINT_HISTORY_DETAIL, function* (payload) {
        const { data, callback } = payload;
        try {
            const response = yield call(() =>
                factories.requestGetPointHistoryDetail(data)
            );
            yield put({
                type: actions.LOAD_POINT_HISTORY_DETAIL_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_POINT_HISTORY_DETAIL_FAILURE });
        }
    });
}
export default function* rootSaga() {
    yield all([fork(getWallet), fork(getVoucher), fork(getPointHistoryDetail)]);
}
