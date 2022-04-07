import AppActions from '@spo/redux/app/action';
import CartActions from '@spo/redux/cart/action';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import AppConfig from './../../shared/config/AppConfig';
import actions from './action';
import factories from './factory';
import AuthActions from '../auth/action';
import constants from '../../shared/config/constants';
import Utils from '../../shared/utils/utils';
import { back } from '../../shared/library/navigate';
/**
 * handleToken
 *
 * Author : DungNT - 2020-08-06 - create
 * @return {void}
 */
const handleToken = (token, expires) => {
    Cookies.set('token', token, { expires: expires });
    AppConfig.ACCESS_TOKEN = token;
};
const checkTokenBeforeSet = () => {
    let oldCookies = Cookies.get('token');
    return !!oldCookies;
};

export function* signIn() {
    yield takeEvery(actions.SUBMIT_LOGIN, function* (payload) {
        try {
            yield put({ type: AppActions.SHOW_LOADING, data: true });
            const { data, isSaveLogin, success, error } = payload;
            yield put({
                type: actions.SUBMITING_LOGIN,
            });
            let response = yield call(() => factories.requestSignIn(data));
            if (response?.data?.Code == 200) {
                let token = response?.data?.Data?.Token;
                let expires = response?.data?.Data?.Expires;
                if (token) {
                    expires = parseInt(expires, 10);
                    handleToken(token, expires);
                    let responseUserInfo = yield call(() =>
                        factories.requestUserInfo()
                    );
                    let userInfo = responseUserInfo?.data;
                    if (isSaveLogin) {
                        Cookies.set('phone', data.Username);
                        Cookies.set('displayName', userInfo.DisplayName);
                    } else {
                        Cookies.remove('phone');
                        Cookies.remove('displayName');
                    }
                    yield put({
                        type: AuthActions.GET_USER_SUCCESS,
                        data: userInfo
                    });
                    yield put({
                        type: CartActions.LOAD_CART_SYNC_PRODUCT,
                    });
                    back()
                    // process redirect link after login successfully
                    // const previousPath = sessionStorage.getItem('originUrlBeforeRedirecting');
                    // if(previousPath){
                    //     sessionStorage.removeItem('originUrlBeforeRedirecting');
                    //     Router.push(previousPath);
                    // } else {
                    //     Router.back();
                    // }
                    // if (responseUserInfo.status == 200) {
                    //     if (responseUserInfo?.data?.IsActive) {
                    //         // Check add security questions
                    //         if (
                    //             responseUserInfo?.data
                    //                 ?.IsAddSecurityQuestions == false
                    //         ) {
                    //             // TODO SecurityQuestion
                    //             Router.push('/');
                    //         } else {
                    //             // Redirect to home
                    //             Router.push('/');
                    //         }
                    //     }
                    // }
                    // success && success()
                }
            } else if (error) {
                if (response?.data?.MsgNo == 'E014') {
                    error(
                        response?.data?.MsgNo,
                        response?.data?.Data?.LoginFailed
                    );
                } else {
                    error(response?.data?.MsgNo);
                }
            }
        } catch (error) {
            console.log(error);
            error && error(error);
        } finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}
/**
 * signIn
 *
 * Author : DungNT - 2020-08-06 - create
 * @return {void}
 */
export function* refreshToken() {
    yield takeEvery(actions.REFRESH_TOKEN, function* () {
        try {
            yield put({
                type: actions.LOADING_REFRESH_TOKEN,
            });
            // Call api
            let response = yield call(() => factories.requestRefreshToken());
            if (response?.data?.Data?.Token && checkTokenBeforeSet()) {
                let token = response?.data?.Data?.Token;
                let expires = response?.data?.Data?.Expires;
                expires = parseInt(expires, 10);
                handleToken(token, expires);
            }
            yield put({
                type: actions.REFRESH_TOKEN_SUCCESS,
            });
        } catch (error) {
            yield put({ type: actions.REFRESH_TOKEN_FAILURE, error });
        }
    });
}

export function* authSocial() {
    yield takeEvery(actions.AUTH_SOCIAL, function* (payload) {
        try {
            yield put({ type: AppActions.SHOW_LOADING, data: true });
            const { data, success, error } = payload;
            let response = yield call(() => factories.requestAuthSocial(data));
            if (response?.data?.Code == 200) {
                let token = response?.data?.Data?.Token;
                let expires = response?.data?.Data?.Expires;
                if (token) {
                    expires = parseInt(expires, 10);
                    handleToken(token, expires);
                    let responseUserInfo = yield call(() =>
                        factories.requestUserInfo()
                    );
                    let userInfo = responseUserInfo?.data;
                    AppConfig.IS_VERIFY_PHONE=userInfo.IsVerifyAccount == constants.V002.VERIFYED
                    yield put({
                        type: AuthActions.GET_USER_SUCCESS,
                        data: userInfo
                    });
                    yield put({
                        type: CartActions.LOAD_CART_SYNC_PRODUCT,
                    });
                    // process redirect link after login successfully
                    // const previousPath = sessionStorage.getItem('originUrlBeforeRedirecting');
                    // if(previousPath){
                    //     sessionStorage.removeItem('originUrlBeforeRedirecting');
                    //     Router.push(previousPath);
                    // } else {
                    //     Router.back();
                    // }
                    back()
                    //
                    // if(userInfo.IsVerifyAccount != constants.V002.VERIFYED){
                    //     Utils.showPopupRequestVerifyPhone()
                    // }
                }
            } else if (error) {
                if (response?.data?.MsgNo == 'E014') {
                    error(
                        response?.data?.MsgNo,
                        response?.data?.Data?.LoginFailed
                    );
                } else {
                    error(response?.data?.MsgNo);
                }
            }
        } catch (error) {
            console.log(error);
            error && error(error);
        } finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}
export default function* rootSaga() {
    yield all([fork(signIn), fork(refreshToken), fork(authSocial)]);
}
