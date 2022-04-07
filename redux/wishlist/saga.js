import { all, takeEvery, fork, put, call } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';
import { downloadFile } from '@spo/lib/helper';
import { Router } from '@spo/routes';
import { POPUP_ERROR_TYPE } from '../../shared/utils/EventRegister';
import Utils from '../../shared/utils/utils';
import constants from '../../shared/config/constants';
import PageList from '../../shared/config/PageList';

export function* getWishList () {
    yield takeEvery(actions.LOAD_WISHLIST, function* (payload) {
        try {
            const { data } = payload
            yield put({ type: actions.LOADING_WISHLIST });
            let response = yield call(() => factories.requestGetWishlist(data));
            if (response) {
                let paramRelative = {};
                paramRelative['Limit'] = constants.PAGINATION.LIMIT;
                paramRelative['Type'] = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_CARE;
                let responseRelative = yield call(() => factories.requestGetRelativeProduct(paramRelative));
                yield put({
                    type: actions.LOAD_WISHLIST_SUCCESS,
                    response: {wishlist: response.data, relative: responseRelative.data},
                });
            }
            
        } catch (error) {
            yield put({ type: actions.LOAD_WISHLIST_FAILURE, error });
        }
    });
}
export function* removeItemWishlist () {
    yield takeEvery(actions.REMOVE_ITEM_WISHLIST, function* (payload) {
        try {
            const { id } = payload
            let response = yield call(() => factories.requestRemoveItem(id));
            yield put({
                type: actions.REMOVE_ITEM_WISHLIST_SUCCESS,
                id,
            });
        } catch (error) {
            yield put({ type: actions.REMOVE_ITEM_WISHLIST_FAILURE, error });
        }
    });
}
export function* addWishlist () {
    yield takeEvery(actions.ADD_WISHLIST, function* (payload) {
        try {
            let checkIslogin = Utils.isLogged();
            if (!checkIslogin) {
                Router.pushRoute(PageList.SIGNIN.SERVER);
                return;
            }
            const { item_id } = payload
            yield put({ type: actions.ADDING_WISHLIST });
            let response = yield call(() => factories.requestAddWishlist(item_id));
            if (response && response.data.Code === 200) {
                let param = {};
                param.Type = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_WHISHLIST;
                param.Limit = constants.PAGINATION_PRODUCT_LIST.LIMIT;
                param.Offset = 0;

                if(payload.callBack){
                    payload.callBack()
                }
                yield put({
                    type: actions.LOAD_WISHLIST,
                    data: param
                });
            }
        } catch (error) {
            Utils.alertPopup(
                'Phát sinh lỗi vui lòng thử lại',
                POPUP_ERROR_TYPE
            );
        }
    });
}
export function* exportExcelWishlistForSale() {
    yield takeEvery(actions.EXPORT_WISHLIST_FOR_SALE, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_EXPORT_WISHLIST_FOR_SALE });
            //call api
            const response = yield call(() =>
                factories.requestExportExcelWishlistForSale(),
            );
            downloadFile(response.data,"wishlist");
            //
            yield put({
                type: actions.EXPORT_WISHLIST_FOR_SALE_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            console.log('error: ', error);
            Utils.alertPopup(
                'Phát sinh lỗi vui lòng thử lại',
                POPUP_ERROR_TYPE
            );
            yield put({ type: actions.EXPORT_WISHLIST_FOR_SALE_FAILURE, error });
        }
    });
}
export default function* rootSaga () {
    yield all([
        fork(getWishList),
        fork(removeItemWishlist),
        fork(addWishlist),
        fork(exportExcelWishlistForSale),
        
    ]);
}
