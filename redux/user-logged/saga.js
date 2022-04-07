import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';
import AppConfig from './../../shared/config/AppConfig';
import { Router } from '@spo/routes';
import AppActions from './../app/action';
import PageList from '../../shared/config/PageList';
/**
 * getUserLogged
 *
 * Author : DungNT - 2020-08-06 - create
 * @return {void}
 */

export function* getUserLogged() {
    yield takeEvery(actions.LOAD_USER_LOGGED, function* () {
        try {
            yield put({
                type: actions.LOAD_USER_LOGGED_SUCCESS,
                data: factories.requestGetUserLogged(),
            });
        } catch (error) {
            yield put({ type: actions.LOAD_USER_LOGGED_FAILURE, error });
        }
    });
}
export function* getUserInfo() {
    yield takeEvery(actions.LOAD_USER_INFO, function* () {
        try {
            yield put({
                type: actions.LOADING_USER_INFO,
            });
            const response = yield call(() => factories.requestGetUserInfo());
            let dataResult = { ...response.data };
            dataResult.birthday = format(
                parse(response.data.birthday, 'ddMMyyyy', new Date()),
                'dd/MM/yyyy',
            );
            yield put({
                type: actions.LOAD_USER_INFO_SUCCESS,
                data: dataResult,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_USER_INFO_FAILURE, error });
        }
    });
}

export function* updateUserInfo() {
    yield takeEvery(actions.UPDATE_USER_INFO, function* (payload) {
        try {
            const { data } = payload;
            yield put({
                type: actions.UPDATING_USER_INFO,
            });
            const response = yield call(() =>
                factories.requestUpdateUserInfo(data),
            );
            yield put({
                type: actions.UPDATE_USER_INFO_SUCCESS,
                // data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.UPDATE_USER_INFO_FAILURE, error });
        }
    });
}

/**
 * authMe
 *
 * Author : DungNT - 2020-08-06 - create
 * @return {void}
 */

export function* authMe() {
    yield takeEvery(actions.AUTH_ME, function* (payload) {
        try {
            yield put({
                type: actions.AUTHING_ME,
            });
            const response = yield call(() => factories.requestAuthMe());
            let dataResult = { ...response.data };
            try {
                dataResult.birthday = response.data.birthday
                    ? format(
                        parse(response.data.birthday, 'ddMMyyyy', new Date()),
                        'dd/MM/yyyy',
                    )
                    : '';
            } catch (e) {
                dataResult.birthday = response.data.birthday
                    ? format(
                        parse(response.data.birthday, 'yyyyMMdd', new Date()),
                        'dd/MM/yyyy',
                    )
                    : '';
            }
            yield put({
                type: actions.AUTH_ME_SUCCESS,
                data: dataResult,
            });
            // Sau khi xác thực thì gọi hàm reload lại giỏ hàng

            // yield put({
            //     type: CartActions.LOAD_CART
            // });
        } catch (error) {
            if (error.status == 401) {
                yield put({ type: actions.LOGOUT });
            }
            yield put({ type: actions.AUTH_ME_FAILURE, error });
        }
    });
}
export function* getOrders() {
    yield takeEvery(actions.LOAD_USER_ORDER, function* (payload) {
        try {
            const { data } = payload;
            yield put({
                type: actions.LOADING_USER_ORDER,
            });
            const response = yield call(() =>
                factories.requestGetUserOrder(data),
            );
            yield put({
                type: actions.LOAD_USER_ORDER_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_USER_ORDER_FAILURE, error });
        }
    });
}

export function* getAddress() {
    yield takeEvery(actions.LOAD_USER_ADDRESS, function* () {
        try {
            yield put({
                type: actions.LOADING_USER_ADDRESS,
            });
            const response = yield call(() => factories.requestGetAddress());
            yield put({
                type: actions.LOAD_USER_ADDRESS_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_USER_ADDRESS_FAILURE, error });
        }
    });
}

export function* addAdress() {
    yield takeEvery(actions.ADD_ORDER_ADDRESS, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.ADDING_ORDER_ADDRESS });
            const response = yield call(() =>
                factories.requestAddAddress(data),
            );

            yield put({
                type: actions.ADD_ORDER_ADDRESS_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            console.log(error);
            yield put({ type: actions.ADD_ORDER_ADDRESS_FAILURE, error });
        }
    });
}

export function* removeAddress() {
    yield takeEvery(actions.REMOVE_ITEM_ADDRESS_ORDER, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.REMOVING_ITEM_ADDRESS_ORDER });
            const response = yield call(() =>
                factories.requestRemoveAddress(data),
            );

            yield put({
                type: actions.REMOVE_ITEM_ADDRESS_ORDER_SUCCESS,
                data: data,
            });
        } catch (error) {
            console.log(error);
            yield put({
                type: actions.REMOVE_ITEM_ADDRESS_ORDER_FAILURE,
                error,
            });
        }
    });
}

export function* updateAddress() {
    yield takeEvery(actions.UPDATE_ORDER_ADDRESS, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.UPDATING_ORDER_ADDRESS });
            const response = yield call(() =>
                factories.requestUpdateAddress(data),
            );

            yield put({
                type: actions.UPDATE_ORDER_ADDRESS_SUCCESS,
                data: response.data,
                oldId: data.user_address_id,
            });
        } catch (error) {
            console.log(error);
            yield put({ type: actions.UPDATE_ORDER_ADDRESS_FAILURE, error });
        }
    });
}

export function* changePassword() {
    yield takeEvery(actions.CHANGE_PASSWORD, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.CHANGING_PASSWORD });
            const response = yield call(() =>
                factories.requestChangePassword(data),
            );

            yield put({
                type: actions.CHANGE_PASSWORD_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            console.log(error);
            yield put({ type: actions.CHANGE_PASSWORD_FAILURE, error });
        }
    });
}

export function* changeAvatar() {
    yield takeEvery(actions.UPDATE_AVATAR, function* (payload) {
        try {
            const { data, user } = payload.data;
            yield put({ type: actions.UPDATING_AVATAR });
            yield put({ type: AppActions.SHOW_LOADING,data: true });
            const response = yield call(() =>
                factories.requestChangeAvatar(data),
            );
            user.Avatar = response.data.Data.Avatar;
            // user.Birthday = user.Birthday.replace(/\//g, '');
            yield put({
                type: actions.UPDATE_USER_INFO,
                data: user,
            });

            yield put({
                type: actions.UPDATE_AVATAR_SUCCESS,
                data: response.data.Data.Avatar,
            });
            yield put({ type: AppActions.SHOW_LOADING,data: false });
        } catch (error) {
            console.log(error);
            yield put({ type: actions.UPDATE_AVATAR_FAILURE, error });
        }
    });
}

export function* updateDefaultAddress() {
    yield takeEvery(actions.UPDATE_DEFAULT_ADDRESS, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.UPDATING_DEFAULT_ADDRESS });
            const response = yield call(() =>
                factories.requestUpdateDefaultAddress(data),
            );

            yield put({
                type: actions.UPDATE_DEFAULT_ADDRESS_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            console.log(error);
            yield put({ type: actions.UPDATE_DEFAULT_ADDRESS_FAILURE, error });
        }
    });
}

export function* getAddressDetail() {
    yield takeEvery(actions.GET_USER_ADDRESS_DETAIL, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.GETTING_USER_ADDRESS_DETAIL });
            const response = yield call(() =>
                factories.requestGetAddressDetail(data),
            );

            yield put({
                type: actions.GET_USER_ADDRESS_DETAIL_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            console.log(error);
            yield put({ type: actions.GET_USER_ADDRESS_DETAIL_FAILURE, error });
        }
    });
}

export function* getOrderQrData() {
    yield takeEvery(actions.GET_ORDER_QR_DATA, function* (payload) {
        const { data, callback } = payload;
        try {
            if (!AppConfig.ACCESS_TOKEN) {
                Router.pushRoute(PageList.SIGNIN.SERVER);
                return;
            }
            const response = yield call(() =>
                factories.requestGetOrderQr()
            );
            if (response?.status === 200) {
                yield put({
                    type: actions.GET_ORDER_QR_DATA_SUCCESS,
                    payload: response?.data?.Data?.QrValue,
                });
                if(callback) {
                    callback();
                }
            } else {
                yield put({
                    type: actions.GET_ORDER_QR_DATA_FAILURE,
                    payload: null,
                });
            }
        } catch (error) {
            yield put({
                type: actions.GET_ORDER_QR_DATA_FAILURE,
                payload: null,
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getUserLogged),
        fork(authMe),
        fork(getUserInfo),
        fork(updateUserInfo),
        fork(getOrders),
        fork(getAddress),
        fork(addAdress),
        fork(removeAddress),
        fork(updateAddress),
        fork(changePassword),
        fork(changeAvatar),
        fork(updateDefaultAddress),
        fork(getAddressDetail),
        fork(getOrderQrData),
 
    ]);
}
