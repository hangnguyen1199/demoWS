import { all, fork, takeEvery, put, call } from 'redux-saga/effects'
import actions from './action'
import factories from './factory'
import AppActions from '@spo/redux/app/action';

function* getTrackingOrder() {
    yield takeEvery(
        actions.LOAD_TRACKING_ORDER,
        yield function* (payload) {
            try {
                yield put({ type: AppActions.SHOW_LOADING, data: true });
                const response = yield call(() =>
                    factories.getTrackingOrder(payload.data)
                )

                yield put({
                    type: actions.LOAD_TRACKING_ORDER_SUCCESS,
                    payload: response.data,
                })
                yield put({ type: AppActions.SHOW_LOADING, data: false });
            } catch (error) {
                yield put({
                    type: actions.LOAD_TRACKING_ORDER_FAIL,
                })
                yield put({ type: AppActions.SHOW_LOADING, data: false });
            }
        }
    )
}

export default function* rootSaga() {
    yield all([fork(getTrackingOrder)])
}
