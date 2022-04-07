import actions from './action'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import factories from './factory'
import AppActions from '@spo/redux/app/action';

export function* getRecivedRegiter() {
    yield takeEvery(actions.REGISTER_EMAIL, function* (payload) {
        const { data, success, error } = payload
        try {
            yield put({ type: AppActions.SHOW_LOADING, data: true });
            const response = yield call(() => factories.registerEmail(data))
            if (response.data.Code === 200) {
                success && success()
            } else {
                error && error(response.data.MsgNo)
            }
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        } catch (err) {
            error && error()
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    })
}
export default function* rootSaga() {
    yield all([fork(getRecivedRegiter)])
}
