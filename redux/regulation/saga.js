import Router from 'next/router';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import CartActions from '@spo/redux/cart/action';



export function* getInformation () {
    yield takeEvery(actions.LOAD_INFORMATION_SYSTEM, function* (payload) {
        try {
            const { data } = payload
            yield put({ type: actions.LOADING_INFORMATION_SYSTEM });
            const response = yield call(() => factories.requestGetInformation(data));
            yield put({
                type: actions.LOAD_INFORMATION_SYSTEM_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_INFORMATION_SYSTEM_FAILURE, error });
        }
    });
}



export default function* rootSaga () {
    yield all([
        fork(getInformation)
    ]);
}
