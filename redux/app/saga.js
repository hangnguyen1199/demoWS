import { all, takeEvery, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';
import actions from './action';
import factories from './factory';

export function* checkAccountAuthentication() {
    yield takeEvery(actions.CHECK_ACCOUNT_AUTHENTICATION, function* () {
        try {
            yield put({ type: actions.CHECKING_ACCOUNT_AUTHENTICATION });
            const response = yield call(() =>
                factories.requestCheckAccountAuthentication(),
            );
            yield put({
                type: actions.CHECK_ACCOUNT_AUTHENTICATION_SUCCESS,
                isAccountAuthenticated: response.data.isAccountAuthenticated,
            });
        } catch (error) {
            yield put({
                type: actions.CHECK_ACCOUNT_AUTHENTICATION_FAILURE,
                error,
            });
        }
    });
}

export default function* rootSaga() {
    yield all([fork(checkAccountAuthentication)]);
}
