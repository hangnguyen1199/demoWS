import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import Router from 'next/router';
import CartActions from '@spo/redux/cart/action';
import Cookies from 'js-cookie';
import actions from './action';
import factories from './factory';
import Utils from './../../shared/utils/utils';
import {
    POPUP_SUCCESS_TYPE,
    POPUP_WARNING_TYPE,
} from '../../shared/utils/EventRegister';
import AppActions from '../app/action';
import { GetMsg } from './../../shared/config/Message';
import AppConfig from './../../shared/config/AppConfig';
import PageList from '../../shared/config/PageList';
import constants from '../../shared/config/constants';

export function* getUserProfile() {
    yield takeEvery(actions.GET_USER_PROFILE, function* (payload) {
        try {
            let response = yield call(() => factories.requestGetUserProfile());
            yield put({
                type: actions.GET_USER_PROFILE_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            Utils.alertPopup(
                'Lỗi hệ thống, Xin vui lòng thử lại!'
            );
        }
    });
}
export function* updateUserProfile() {
    yield takeEvery(actions.UPDATE_USER_PROFILE, function* (payload) {
        try {
            const { data, success } = payload;
            let response = yield call(() =>
                factories.requestUpdateUserProfile(data)
            );
            success && success(response.data);
        } catch (error) {
            Utils.alertPopup(
                'Lỗi hệ thống, Xin vui lòng thử lại!',
                POPUP_WARNING_TYPE
            );
        }
    });
}

export function* resendOTP() {
    yield takeEvery(actions.RESEND_OTP, function* (payload) {
        const { data, success, error } = payload;
        try {
            const response = yield call(() => factories.requestResendOtp(data));
            if (response?.data?.Code == 200) {
                if (success) {
                    success(true);
                }
            } else {
                Utils.alertPopup(
                    GetMsg(response?.data?.MsgNo),
                    POPUP_WARNING_TYPE
                );
            }
        } catch (err) {
            error && error();
            Utils.alertPopup(
                'Lỗi hệ thống, Xin vui lòng thử lại!',
                POPUP_WARNING_TYPE
            );
        }
    });
}
export function* forgotPassword() {
    yield takeEvery(actions.FORGOT_PASSWORD, function* (payload) {
        const { data, success, error } = payload;
        try {
            yield put({ type: AppActions.SHOW_LOADING, data: true });
            const response = yield call(() =>
                factories.requestForgotPassword(data)
            );
            if (response?.data.Code == 200) {
                success && success();
            } else if (response?.data?.MsgNo == 'E045') {
                error && error('E045');
            } else {
                Utils.alertPopup(
                    GetMsg(response?.data?.MsgNo),
                    POPUP_WARNING_TYPE
                );
            }
        } catch (err) {
            console.log(err);
            Utils.alertPopup(
                'Lỗi hệ thống, Xin vui lòng thử lại!',
                POPUP_WARNING_TYPE
            );
        } finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}
export function* resetPassword() {
    yield takeEvery(actions.UPDATE_PASSWORD, function* (payload) {
        const { data, callback } = payload;
        try {
            yield put({ type: AppActions.SHOW_LOADING, data: true });
            const response = yield call(() =>
                factories.requestResetPassword(data)
            );
            if (response?.data?.Code == 200) {
                Utils.alertPopup(
                    'Đã cập nhật mật khẩu mới thành công!',
                    POPUP_SUCCESS_TYPE,
                    () => {
                        Router.push(PageList.SIGNIN.SERVER);
                    }
                );
            } else {
                Utils.alertPopup(
                    GetMsg(response?.data?.MsgNo),
                    POPUP_WARNING_TYPE
                );
            }
        } catch (error) {
            console.log(error);
            error && error();
            Utils.alertPopup(
                'Lỗi hệ thống, Xin vui lòng thử lại!',
                POPUP_WARNING_TYPE
            );
        } finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}
export function* checkOTPForgotPassword() {
    yield takeEvery(actions.CHECK_OTP_FORGOT_PASSWORD, function* (payload) {
        const { data, success } = payload;
        try {
            yield put({ type: AppActions.SHOW_LOADING, data: true });
            const response = yield call(() =>
                factories.requestCheckOTPForgotPassword(data)
            );
            if (response?.data?.Code == 200) {
                console.log('checkOTPForgotPassword success');
                success && success();
            } else {
                Utils.alertPopup(
                    GetMsg(response?.data?.MsgNo),
                    POPUP_WARNING_TYPE
                );
            }
        } catch (error) {
            console.log(error);
            error && error();
            Utils.alertPopup(
                'Lỗi hệ thống, Xin vui lòng thử lại!',
                POPUP_WARNING_TYPE
            );
        } finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}
export function* resendOTPForgotPassword() {
    yield takeEvery(actions.RESEND_OTP_FORGOT_PASSWORD, function* (payload) {
        const { data, success, error } = payload;
        try {
            const response = yield call(() =>
                factories.requestForgotPassword(data)
            );
            if (response?.data?.Code == 200) {
                if (success) {
                    success(true);
                }
            } else {
                Utils.alertPopup(
                    GetMsg(response?.data?.MsgNo),
                    POPUP_WARNING_TYPE
                );
            }
        } catch (err) {
            console.log(err);
            error && error();
            Utils.alertPopup(
                'Lỗi hệ thống, Xin vui lòng thử lại!',
                POPUP_WARNING_TYPE
            );
        }
    });
}
export function* logout() {
    yield takeEvery(actions.LOGOUT, function* (payload) {
        const { data, success, error } = payload;
        try {
            Cookies.remove('token');
            AppConfig.ACCESS_TOKEN = '';
            AppConfig.IS_VERIFY_PHONE=true;
            Cookies.remove('Cart')
            yield put({ type: CartActions.LOAD_CART_SYNC_PRODUCT, products: [] });
        } catch (err) {
            console.log(err);
            Utils.alertPopup(
                'Lỗi hệ thống, Xin vui lòng thử lại!',
                POPUP_WARNING_TYPE
            );
        }
    });
}
export function* getUser() {
    yield takeEvery(actions.GET_USER, function* (payload) {
        const { data } = payload;
        try {
            let response = yield call(() => factories.requestGetUser());
            AppConfig.IS_VERIFY_PHONE = response?.data?.IsVerifyAccount == constants.V002.VERIFYED
            yield put({
                type: actions.GET_USER_SUCCESS,
                data: response.data,
            });
            payload?.callback && payload?.callback(response.data)
        } catch (error) {
           
        }
    });
}
export function* sendOtpPhone() {
    yield takeEvery(actions.SEND_OTP_PHONE, function* (payload) {
        const { data, success, error } = payload;
        try {
            const response = yield call(() =>
                factories.sendOtpChangePhone(data),
            );
            if (response.data.Code === 200) {
                success && success();
            } else {
                error && error(response.data.MsgNo);
            }
        } catch (err) {
            error && error();
        }
    });
}
export function* sendOtpEmail() {
    yield takeEvery(actions.SEND_OTP_EMAIL, function* (payload) {
        const { data, success, error } = payload;
        try {
            const response = yield call(() =>
                factories.sendOtpChangeEmail(data),
            );
            if (response.data.Code === 200) {
                success && success();
            } else {
                error && error(response.data.MsgNo);
            }
        } catch (err) {
            error && error();
        }
    });
}
export function* updatePhone() {
    yield takeEvery(actions.UPDATE_PHONE, function* (payload) {
        const { data, success, error } = payload;
        try {
            const response = yield call(() => factories.updatePhone(data));
            if (response.data.Code === 200) {
                success && success();
            } else {
                error && error(response.data.MsgNo);
            }
        } catch (err) {
            error && error(err);
        }
    });
}
export function* updateEmail() {
    yield takeEvery(actions.UPDATE_EMAIL, function* (payload) {
        const { data, success, error } = payload;
        try {
            const response = yield call(() => factories.updateEmail(data));
            if (response.data.Code === 200) {
                success && success();
            } else {
                error && error(response.data.MsgNo);
            }
        } catch (err) {
            error && error(err);
        }
    });
}
export default function* rootSaga() {
    yield all([
        fork(getUserProfile),
        fork(getUser),
        fork(updateUserProfile),
        fork(resendOTP),
        fork(forgotPassword),
        fork(resetPassword),
        fork(checkOTPForgotPassword),
        fork(resendOTPForgotPassword),
        fork(logout),
        fork(sendOtpPhone),
        fork(updatePhone),
        fork(updateEmail),
        fork(sendOtpEmail),
    ]);
}
