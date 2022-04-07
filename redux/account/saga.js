import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import constants from '../../shared/config/constants';
import { GetMsg } from '../../shared/config/Message';
import {
    POPUP_SUCCESS_TYPE,
    POPUP_WARNING_TYPE,
} from '../../shared/utils/EventRegister';
import Utils from '../../shared/utils/utils';
import Actions from './actions';
import Factories from './factory';
import CartActions from '@spo/redux/cart/action';
import OrderDetailActions from '@spo/redux/order-detail/action';
import Router from 'next/router';
import AppActions from '../app/action';

export function* getOrderByStatus() {
    yield takeEvery(Actions.GET_ORDER_BY_STATUS, function* (payload) {
        const { data } = payload;
        try {
            const response = yield call(() => Factories.getOrderByStatus(data));
            yield put({
                type: Actions.GET_ORDER_BY_STATUS_RESPONSE,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
            yield put({
                type: Actions.GET_ORDER_BY_STATUS_RESPONSE,
            });
        }
    });
}

export function* returnOrder() {
    yield takeEvery(Actions.RETURN_ORDER, function* (payload) {
        const { data, status, callback, orderId, fallback } = payload;
        yield put({ type: AppActions.SHOW_LOADING, data: true });
        try {
            const response = yield call(() =>
                Factories.refundOrderRequest(data),
            );
            if (response.data.Code == 200) {
                if (orderId) {
                    yield put({
                        type: OrderDetailActions.LOAD_ORDER_DETAIL,
                        data: { orderId: orderId },
                    });
                }
                Router.back()
                Utils.alertPopup(
                    'Hoàn trả đơn hàng thành công',
                    POPUP_SUCCESS_TYPE,
                );
            } else {
                let msg = GetMsg(response.data.MsgNo);
                Utils.alertPopup(msg, POPUP_WARNING_TYPE);
                if (fallback) {
                    fallback(response.data.MsgNo);
                }
            }
        } catch (error) {}
        finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}

export function* cancelOrder() {
    yield takeEvery(Actions.CANCEL_ORDER, function* (payload) {
        const { data, status, callback, orderId, fallback } = payload;
        try {
            const response = yield call(() => Factories.cancelOrder(data));
            if (response.data.Code == 200) {
                yield put({
                    type: Actions.GET_ORDER_BY_STATUS,
                    data: {
                        StatusCode: status,
                    },
                });
                if (orderId) {
                    yield put({
                        type: OrderDetailActions.LOAD_ORDER_DETAIL,
                        data: { orderId: orderId },
                    });
                }
                Utils.alertPopup('Huỷ đơn hàng thành công', POPUP_SUCCESS_TYPE);
            } else {
                let msg = GetMsg(response.data.MsgNo);
                Utils.alertPopup(msg, POPUP_WARNING_TYPE);
                if (fallback) {
                    fallback(response.data.MsgNo);
                }
            }
        } catch (error) {
            console.log(error);
        }
    });
}
export function* reviewOrder() {
    yield takeEvery(Actions.REVIEW_ORDER, function* (payload) {
        const { data, status, orderId, callback } = payload;
        try {
            const response = yield call(() => Factories.reviewOrder(data));
            if (response.data.Code == 200) {
                // yield put({
                //     type: Actions.GET_ORDER_BY_STATUS,
                //     data: {
                //         StatusCode: status,
                //     },
                // });
                // if (orderId) {
                //     yield put({
                //         type: OrderDetailActions.LOAD_ORDER_DETAIL,
                //         data: {orderId: orderId}
                //     });
                // }
                callback && callback();
                Utils.alertPopup(
                    'Gửi đánh giá thành công!',
                    POPUP_SUCCESS_TYPE,
                );
            } else {
                let msg = GetMsg(response.data.MsgNo);
                Utils.alertPopup(msg, POPUP_WARNING_TYPE);
            }
        } catch (error) {
            console.log(error);
        }
    });
}
export function* getReviewDetail() {
    yield takeEvery(Actions.GET_REVIEW_DETAIL, function* (payload) {
        const { data, callback } = payload;
        try {
            const response = yield call(() => Factories.getReviewDetail(data));
            if (response.status == 200) {
                if (callback) {
                    callback(response.data);
                }
            }
            yield put({
                type: Actions.GET_REVIEW_DETAIL_RESPONSE,
                payload: response.data,
            });
        } catch (error) {}
    });
}
export function* getOrderDetail() {
    yield takeEvery(Actions.GET_ORDER_DETAIL, function* (payload) {
        const { data } = payload;
        try {
            const response = yield call(() => Factories.getOrderDetail(data));
            yield put({
                type: Actions.GET_ORDER_DETAIL_RESPONSE,
                payload: response.data,
            });
        } catch (error) {}
    });
}
export function* getCancelReason() {
    yield takeEvery(Actions.GET_CANCEL_REASON, function* (payload) {
        try {
            const response = yield call(() => Factories.getCancelReason());
            yield put({
                type: Actions.GET_CANCEL_REASON_RESPONSE,
                payload: response.data,
            });
        } catch (error) {}
    });
}

export function* onReceivedOrder() {
    yield takeEvery(Actions.RECEIVED_ORDER, function* (payload) {
        const { data, callback, orderId } = payload;
        try {
            const response = yield call(() => Factories.receivedOrder(data));
            console.log(response);
            if (response.data.Code == 200) {
                yield put({
                    type: Actions.GET_ORDER_BY_STATUS,
                    data: {
                        StatusCode: [
                            constants.ORDER_STATUS.DELIVERING,
                            constants.ORDER_STATUS.DELIVERED,
                        ].toString(),
                    },
                });
                if (orderId) {
                    yield put({
                        type: OrderDetailActions.LOAD_ORDER_DETAIL,
                        data: { orderId: orderId },
                    });
                }
                callback && callback();
            } else {
                let msg = GetMsg(response.data.MsgNo);
                Utils.alertPopup(msg, POPUP_WARNING_TYPE);
            }
        } catch (error) {}
    });
}
export function* onReOrder() {
    yield takeEvery(Actions.ON_REORDER, function* (payload) {
        const { data, callback } = payload;
        try {
            const response = yield call(() => Factories.onReOrder(data));

            if (response.data.Code == 200) {
                if (callback) {
                    callback(response.data.Carts);
                }
                yield put({ type: CartActions.LOAD_CART_SYNC_PRODUCT });
            } else {
                let msg = GetMsg(response.data.MsgNo);
                Utils.alertPopup(msg, POPUP_WARNING_TYPE);
            }
        } catch (error) {}
    });
}
export default function* rootSaga() {
    yield all([
        fork(getOrderByStatus),
        fork(cancelOrder),
        fork(getOrderDetail),
        fork(getReviewDetail),
        fork(reviewOrder),
        fork(getCancelReason),
        fork(onReOrder),
        fork(onReceivedOrder),
        fork(returnOrder),
    ]);
}
