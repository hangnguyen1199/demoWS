import AppActions from '@spo/redux/app/action';
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { POPUP_WARNING_TYPE } from '../../shared/utils/EventRegister';
import AppConfig from './../../shared/config/AppConfig';
import { GetMsg } from './../../shared/config/Message';
import Utils from './../../shared/utils/utils';
import actions from './action';
import factories from './factory';


const handleToken = (token, expires) => {
    Cookies.set('token', token, { expires: expires });
    axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
    };
};

export function* signUp () {
    yield takeEvery(actions.SUBMIT_SIGN_UP, function* (payload) {
        try {
            const { data } = payload;
            yield put({
                type: actions.SUBMITING_SIGN_UP,
            });
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

export function* signUpStepOne () {
    yield takeEvery(actions.SIGN_UP_STEP_ONE, function* (payload) {
        const { data, success, error } = payload;
        try {
            
            const res = yield call(() => factories.requestSignUpStepOne(data));
            if (res?.data?.Code == 200) {
                // Go to screen OTP
                success && success()
            } else {
                throw new Error(res?.data?.MsgNo);
            }

        } catch (err) {
            if (err.message) {
                Utils.alertPopup(
                    GetMsg(err.message)
                );
            }
            error && error()
        }
        finally {
            AppActions.closeLoading()
        }
    });
}
export function* signUpStepTwo () {
    yield takeEvery(actions.SIGN_UP_STEP_TWO, function* (payload) {
        try {
            const { data, success, error } = payload;
            const res = yield call(() => factories.requestSignUpStepTwo(data));
            if (res?.data?.Code == 200) {
                Cookies.set('token', AppConfig.ACCESS_TOKEN, { expires: AppConfig.TOKEN_EXPIRE });
                // TODO SecurityQuestion
                Router.push("/")
                console.log("SecurityQuestion")
            } else {
                throw new Error(res?.data?.MsgNo);
            }
        } catch (err) {
            if (err.message) {
                Utils.alertPopup(
                    GetMsg(err.message)
                );
            }
        }
        finally {
            AppActions.closeLoading()
        }
    });
}

export function* verifyOTP () {
    yield takeEvery(actions.SIGN_UP_VERIFY_OTP, function* (payload) {
        try {
            const { data, success } = payload;
            const res = yield call(() => factories.requestVerifyOTP(data));
            if (res?.data?.Code == 200) {
                AppConfig.ACCESS_TOKEN = res?.data?.Data?.Token
                AppConfig.TOKEN_EXPIRE = parseInt(res?.data?.Data?.Expires, 10)
                success && success()
            } else {
                throw new Error(res?.data?.MsgNo);
            }

        } catch (err) {
            if (err.message) {
                Utils.alertPopup(
                    GetMsg(err.message),
                    POPUP_WARNING_TYPE,
                );
            }
        } finally {
            AppActions.closeLoading()
        }
    });
}

export default function* rootSaga () {
    yield all([fork(signUp), fork(signUpStepOne), fork(signUpStepTwo), fork(verifyOTP)]);
}
