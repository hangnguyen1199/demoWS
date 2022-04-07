import AppActions from '@spo/redux/app/action'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import actions from './action'
import factories from './factory'
import { Router } from '@spo/routes'
import Cookies from 'js-cookie'
import PageList from '../../shared/config/PageList'
import CartActions from '@spo/redux/cart/action'
import actionsCart from './../cart/action'
import actionTracking from '../tracking-order/action'
import Utils from './../../shared/utils/utils';

export function* getUserAddress() {
    yield takeEvery(actions.LOAD_USER_ORDER_ADDRESS, function* (payload) {
        try {
            let response = yield call(() => factories.getUserAddressV2());
            yield put({
                type: actions.LOAD_USER_ORDER_ADDRESS_SUCCESS,
                userAddress: response.data,
            });
            if (payload.callback && payload.callback.success) {
                payload.callback.success(response);
            }
        } catch (error) {
            yield put({ type: actions.LOAD_USER_ORDER_ADDRESS_FAILURE, error });
        }
    });
}

export function* getVoucher() {
    yield takeEvery(actions.GET_ORDER_VOUCHER, function* (payload) {
        try {
            let response = yield call(() => factories.getVoucher());
            yield put({
                type: actions.GET_ORDER_VOUCHER_SUCCESS,
                voucher: response.data,
            });
            if (payload.callback && payload.callback.success) {
                payload.callback.success(response);
            }
        } catch (error) {
            yield put({ type: actions.GET_ORDER_VOUCHER_FAILURE, error });
        }
    });
}

export function* calculateOrder() {
    yield takeEvery(actions.CALC_ORDER_VALUES, function* (payload) {
        try {
            let response = yield call(() =>
                factories.calculateOrder(payload.order),
            );
            yield put({
                type: actions.CALC_ORDER_VALUES_SUCCESS,
                order: response.data,
            });
            if (payload.callback && payload.callback.success) {
                payload.callback.success(response);
            }
        } catch (error) {
            yield put({ type: actions.CALC_ORDER_VALUES_FAILURE, error });
        }
    });
}
export function* calculateOrderSync() {
    yield takeEvery(actions.CALC_ORDER_VALUES_SYNC, function* (payload) {
        try {
            let response = yield call(() =>
                factories.calculateOrderSync(payload.order),
            );
            yield put({
                type: actions.CALC_ORDER_VALUES_SUCCESS,
                order: response.data,
            });
            if (payload.callback && payload.callback.success) {
                payload.callback.success(response);
            }
        } catch (error) {
            yield put({ type: actions.CALC_ORDER_VALUES_FAILURE, error });
        }
    });
}

export function* createOrder() {
    yield takeEvery(actions.SAVE_ORDER, function* (payload) {
        try {
            let token = Cookies.get('token');
            if (!token) {
                Router.pushRoute(PageList.SIGNIN.SERVER);
                return;
            }
            yield put({ type: AppActions.SHOW_LOADING, data: true });
            let response = yield call(() =>
                factories.createOrder(payload.order),
            );
            yield put({
                type: actions.SAVE_ORDER_SUCCESS,
            });
            if (payload.callback && payload.callback.success) {
                payload.callback.success(response);
            }

            Cookies.remove('Cart')
            yield put({
                type: actionsCart.LOAD_CART_SYNC_PRODUCT,
                payload: [],
            })
        } catch (error) {
            // yield put({ type: actions.SAVE_ORDER_FAILURE, error });
        } finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}
export function* createOrderSync() {
    yield takeEvery(actions.SAVE_ORDER_SYNC, function* (payload) {
        try {
            yield put({ type: AppActions.SHOW_LOADING, data: true })
            let response = yield call(() =>
                factories.createOrderSync(payload.order)
            )
            if (response.data.Code == 200) {
                let cartOrder = payload.order.Carts
                let cartCookies = Cookies.get('Cart')
                let cartArray = (cartCookies && JSON.parse(cartCookies)) ?? []
                cartArray = cartArray.filter((v) => {
                    return (
                        cartOrder.findIndex(
                            (val) =>
                                v.ProductId == val.ProductId &&
                                v.ColorId == val.ColorId &&
                                v.SizeId == val.SizeId
                        ) == -1
                    )
                })

                Cookies.set('Cart', JSON.stringify(cartArray))
                localStorage.setItem('orderCode',response.data?.Data?.OrderCode)
                localStorage.setItem('orderInfoDetail',JSON.stringify(response.data?.Data))
                yield put({ type: CartActions.LOAD_CART_SYNC_PRODUCT })
                yield put({
                    type: actions.SAVE_ORDER_SYNC_SUCCESS,
                })
            }
            if (payload.callback && payload.callback.success) {
                payload.callback.success(response)
            }
        } catch (error) {
            // yield put({ type: actions.SAVE_ORDER_FAILURE, error });
        } finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false })
        }
    })
}

export function* createAddress() {
    yield takeEvery(actions.SAVE_USER_ADDRESS, function* (payload) {
        try {
            let token = Cookies.get('token');
            if (!token) {
                payload.callback.success()
                Router.pushRoute(PageList.SIGNIN.SERVER);
                return;
            }
            yield put({ type: AppActions.SHOW_LOADING, data: true });
            let response = yield call(() =>
                factories.createAddressV2(payload.address),
            );
            yield put({
                type: actions.SAVE_USER_ADDRESS_SUCCESS,
                payload:payload.address,
            });
            yield put({
                type: actions.GET_ID_CREATE_ADDRESS_SUCCESS,
                payload:response.data.Data.UserAddressId,
            });
            // yield put({
            //     type: actions.LOAD_USER_ORDER_ADDRESS,
            // });
            if (payload.callback && payload.callback.success) {
                payload.callback.success(response);
            }
        } catch (error) {
            payload?.callback && payload.callback.error();
        } finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}
export function* deleteAddress() {
    yield takeEvery(actions.DELETE_USER_ADDRESS, function* (payload) {
        try {
            let token = Cookies.get('token');
            if (!token) {
                payload.callback&& payload.callback.success && payload.callback.success()
                Router.pushRoute(PageList.SIGNIN.SERVER);
                return;
            }
            yield put({ type: AppActions.SHOW_LOADING, data: true });
            let response = yield call(() =>
                factories.deleteAddressV2(payload.data),
            );
            yield put({
                type: actions.DELETE_USER_ADDRESS_SUCCESS,
                payload:payload.data,
            });
            yield put({
                type: actions.GET_ID_CREATE_ADDRESS_SUCCESS,
                payload:response.data.Data.UserAddressId,
            });
        } catch (error) {
            Utils.alertPopup('Lỗi hệ thống')
        } finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getUserAddress),
        fork(getVoucher),
        fork(calculateOrder),
        fork(createOrder),
        fork(createAddress),
        fork(createOrderSync),
        fork(calculateOrderSync),
        fork(deleteAddress)
    ])
}
