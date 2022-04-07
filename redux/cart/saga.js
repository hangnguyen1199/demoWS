import AppActions from '@spo/redux/app/action';
import CartActions from '@spo/redux/cart/action';
import { all, call, delay, fork, put, takeEvery } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';
import useAlert from '@spo/lib/use-alert';
import constants from '../../shared/config/constants';
import { Router } from '@spo/routes';
import Cookies from 'js-cookie';
import Utils from '../../shared/utils/utils';
import {
    POPUP_SUCCESS_TYPE,
    POPUP_ERROR_TYPE,
    POPUP_TEXT_TYPE,
} from '../../shared/utils/EventRegister';
import ItemFactory from '../item-detail/factory';
import AppConfig from '../../shared/config/AppConfig';
import { GetMsg } from '../../shared/config/Message';
import PageList from '../../shared/config/PageList';

export function* getRelativeProduct() {
    yield takeEvery(actions.LOAD_RELATIVE_PRODUCT, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_RELATIVE_PRODUCT });
            const response = yield call(() =>
                factories.requestGetRelativeProduct(data),
            );
            yield put({
                type: actions.LOAD_RELATIVE_PRODUCT_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            Utils.alertPopup(
                'Phát sinh lỗi vui lòng thử lại',
                POPUP_ERROR_TYPE,
            );
            yield put({ type: actions.LOAD_RELATIVE_PRODUCT_FAILURE, error });
        }
    });
}
export function* getCartItemInfo() {
    yield takeEvery(actions.LOAD_CART, function* (payload) {
        try {
            // yield put({ type: actions.LOADING_CART });
            let token = Cookies.get('token');
            if (!token) {
                return;
            }
            let response = yield call(() => factories.requestGetCartProduct());
            if (response.status == 200) {
                yield put({
                    type: actions.LOAD_CART_SUCCESS,
                    products: response && response.data ? response.data : [],
                });
                payload.callback && payload.callback()
            }
        } catch (error) { }
    });
}
export function* updateCart() {
    yield takeEvery(actions.UPDATE_CART, function* (payload) {
        try {
            const productInfo = payload.item;
            yield put({ type: actions.UPDATING_CART });
            let response = yield call(() =>
                factories.requestUpdateCartItem(payload.item),
            );
            let cartCookies = Cookies.get('Cart');
            let cartArray = (cartCookies && JSON.parse(cartCookies)) ?? [];
            let indexAdd = yield cartArray?.findIndex(v => v.ProductId == productInfo.ProductId
                && v.ColorId == productInfo.ColorId
                && v.SizeId == productInfo.SizeId);
            if (indexAdd != -1) {
                cartArray[indexAdd] = {
                    ProductId:productInfo.ProductId,
                    ColorId:productInfo.ColorId,
                    SizeId:productInfo.SizeId,
                    Quantity:productInfo.Quantity,
                }
            }
            yield Cookies.set('Cart', JSON.stringify(cartArray));

            yield put({
                type: actions.LOAD_UPDATE_CART_SYNC_PRODUCT_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            Utils.alertPopup(
                'Phát sinh lỗi vui lòng thử lại',
                POPUP_ERROR_TYPE,
            );
        }
    });
}
export function* removeItemCart() {
    yield takeEvery(actions.REMOVE_ITEM_CART, function* (payload) {
        try {
            let response = yield call(() =>
                factories.requestRemoveCartItem(payload.item),
            );
            const productInfo = payload.item
            let cartCookies = Cookies.get('Cart');
            let cartArray = (cartCookies && JSON.parse(cartCookies)) ?? [];
            let index = yield cartArray?.findIndex(v => v.ProductId == productInfo.ProductId
                && v.ColorId == productInfo.ColorId
                && v.SizeId == productInfo.SizeId);
            if (index != -1) {
                cartArray.splice(index, 1);
            }
            yield Cookies.set('Cart', JSON.stringify(cartArray));

            yield put({
                type: actions.LOAD_DELETE_CART_SYNC_PRODUCT_SUCCESS,
                payload: productInfo,
            });

        } catch (error) {
            yield put({ type: actions.REMOVE_ITEM_CART_FAILURE, error });
        }
    });
}
export function* addToCart() {
    yield takeEvery(actions.ADD_CART, function* (payload) {
        try {
            // Mở popup pick item stock
            yield put({
                type: actions.TOGGLE_PICK_STOCK,
            });
        } catch (error) {
            Utils.alertPopup(
                'Phát sinh lỗi vui lòng thử lại',
                POPUP_ERROR_TYPE,
            );
        }
    });
}

export function* getInfo() {
    yield takeEvery(actions.LOAD_CURRENT_ITEM, function* (payload) {
        try {
            const { data } = payload;
            let response = yield call(() =>
                factories.requestGetProductDetail(data),
            );
            yield put({
                type: actions.LOAD_CURRENT_ITEM_SUCCESS,
                data: response.data,
            });
            yield put({
                type: actions.LOAD_CURRENT_ITEM_STOCK,
                data: {
                    ProductId: response.data.Id,
                    ColorId: response.data.ColorId,
                    SizeId: response.data.SizeId,
                },
            });
            yield put({
                type: actions.TOGGLE_PICK_STOCK,
            });
        } catch (error) {
            Utils.alertPopup(
                'Phát sinh lỗi vui lòng thử lại',
                POPUP_ERROR_TYPE,
            );
            yield put({ type: actions.LOAD_CURRENT_ITEM_FAILURE });
        }
    });
}
export function* getStockInfo() {
    yield takeEvery(actions.LOAD_CURRENT_ITEM_STOCK, function* (payload) {
        try {
            const { data, success } = payload;

            let response = yield call(() =>
                factories.requestGetProductInfoById(data),
            );
            yield put({
                type: actions.LOAD_CURRENT_ITEM_STOCK_SUCCESS,
                data: response.data,
            });
            success && success(response.data)
        } catch (error) {
            Utils.alertPopup(
                'Phát sinh lỗi vui lòng thử lại',
            );
            yield put({ type: actions.LOAD_CURRENT_ITEM_FAILURE });
        }
    });
}
export function* addCartByStock() {
    yield takeEvery(actions.ADD_CART_BY_STOCK, function* (payload) {
        try {

            const {
                data: { productInfo },
            } = payload;
            let response = yield call(() =>
                factories.requestAddCartSync(productInfo),
            );


            let cartCookies = Cookies.get('Cart');
            let cartArray = (cartCookies && JSON.parse(cartCookies)) ?? [];
            let indexAdd = yield cartArray?.findIndex(v => v.ProductId == productInfo.ProductId
                && v.ColorId == productInfo.ColorId
                && v.SizeId == productInfo.SizeId);
            if (indexAdd == -1) {
                cartArray = [...cartArray, productInfo];
            } else {
                cartArray[indexAdd].Quantity += productInfo.Quantity
            }
            yield Cookies.set('Cart', JSON.stringify(cartArray));
            yield put({
                type: CartActions.LOAD_ADD_CART_SYNC_PRODUCT_SUCCESS,
                payload: response.data
            })

            yield put({ type: CartActions.TOGGLE_PICK_STOCK, status: false });
            if (typeof payload?.callback == 'function') {
                payload?.callback()
            }
            if (payload.data.HiddenShowCart) {
                yield put({ type: AppActions.TOGGLE_SHOW_CART_TOP, data: false });
            } else {
                yield put({ type: AppActions.TOGGLE_SHOW_CART_TOP, data: true });
            }
            yield delay(AppConfig.NUMBER_MSECOND_SHOWCART)
            yield put({ type: AppActions.TOGGLE_SHOW_CART_TOP, data: false });
        } catch (error) {
            Utils.alertPopup(
                'Phát sinh lỗi vui lòng thử lại',
                POPUP_ERROR_TYPE,
            );
            yield put({ type: actions.ADD_CART_BY_STOCK_FAILURE, error });
        }
    });
}

export function* loadCartSync() {
    yield takeEvery(actions.LOAD_CART_SYNC_PRODUCT, function* (payload) {
        try {
            let cartCookie = Cookies.get('Cart');
            let response = yield call(() =>
                factories.requestLoadCartSync(cartCookie),
            );
            yield put({
                type: actions.LOAD_CART_SYNC_PRODUCT_SUCCESS,
                payload: response.data
            })

            payload.callback && payload.callback()
        } catch (error) {
            yield put({
                type: actions.LOAD_CART_SYNC_PRODUCT_FAILURE
            })
        }
    })
}

export function* createTempOrder() {
    yield takeEvery(actions.CREATE_TEMP_ORDER, function* (payload) {
        yield put({ type: AppActions.SHOW_LOADING, data: true });
        try {
            let token = Cookies.get('token');
            // if (!token) {
            //     Router.pushRoute(PageList.SIGNIN.SERVER);
            //     return;
            // }
            if (AppConfig.ACCESS_TOKEN) {
                let response = yield call(() =>
                    factories.requestCreateTempOrder(payload.data),
                );
                if (response.data.Code == 200) {
                    yield put({
                        type: actions.CREATE_TEMP_ORDER_SUCCESS,
                        response,
                    });
                    if (payload.callback && payload.callback.success) {
                        payload.callback.success(response);
                    }
                } else if (response.data.Code == 202) {
                    Utils.alertPopup(
                        GetMsg(response.data.MsgNo),
                        POPUP_TEXT_TYPE,
                        () => {
                            payload.callback.fail && payload.callback.fail()
                        },
                    );
                } else {
                    Utils.alertPopup(
                        "Lỗi hệ thống, xin vui lòng thử lại",
                        POPUP_TEXT_TYPE,
                        () => {
                            Router.pushRoute('/');
                        },
                    );
                }
            }else{
                let response = yield call(() =>
                    factories.requestCreateTempOrderV2(payload.data),
                );
                if(response.data.Code == 200){
                    payload.callback && payload.callback.success && payload.callback.success();
                }else{
                    Utils.alertPopup(GetMsg(response.data.MsgNo),POPUP_TEXT_TYPE,() => {
                        payload.callback.fail && payload.callback.fail()
                    },)
                }
            }
        } catch (error) {
            Utils.alertPopup(
                'Phát sinh lỗi vui lòng thử lại',
                POPUP_ERROR_TYPE,
            );
            // yield put({ type: actions.CREATE_TEMP_ORDER_FAILURE, error });
        } finally {
            console.log("finally")
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getCartItemInfo),
        fork(updateCart),
        fork(removeItemCart),
        fork(addToCart),
        fork(addCartByStock),
        fork(getInfo),
        fork(createTempOrder),
        fork(getStockInfo),
        fork(loadCartSync)
    ]);
}
