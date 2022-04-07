import { all, takeEvery, fork, put, call } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';
import UserLoggedActions from '@spo/redux/user-logged/action';
import axios from 'axios';
import Router from 'next/router';
import Cookies from 'js-cookie';
import useAlert from '@spo/lib/use-alert';
import { swal } from 'sweetalert';
import { useCustomRoute } from '@spo/lib/use-custom-route';

/**
* handleToken
*
* Author : HaiDT - 2021-11-10 - create
* @return {void} 
*/
const handleToken = (token, expires) => {
    Cookies.set('token', token, { expires: expires });
    axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
    };
};

/**
* signUp
*
* Author : HaiDT - 2021-11-10 - create
* @return {void} 
*/
export function* signUp () {
    yield takeEvery(actions.SUBMIT_SIGN_UP, function* (payload) {
        try {
            const { data } = payload;
            yield put({
                type: actions.SUBMITING_SIGN_UP,
            });
            //Call api
            const response = yield call(() => factories.requestSignUp(data));
            if (response.status == 200 && response.data.access_token) {
                handleToken(response.data.access_token, response.data.expires);
                // yield put({
                //     type: UserLoggedActions.AUTH_ME,
                // });
            }
            //
            yield put({
                type: actions.SUBMIT_SIGN_UP_SUCCESS,
            });
            // Redirect home
            // Router.push('/');
        } catch (error) {
            yield put({ type: actions.SUBMIT_SIGN_UP_FAILURE, error });
        }
    });
}

export default function* rootSaga () {
    yield all([fork(signUp)]);
}
