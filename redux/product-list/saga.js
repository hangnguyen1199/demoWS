
import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';
import constants from './../../shared/config/constants';



function* getProductListType() {
    yield takeEvery(yield actions.LOAD_PRODUCT_LIST_WITH_TYPE_START, function* (payload) {
        try {
            yield put({
                type: actions.LOAD_PRODUCT_LIST_WITH_TYPE_LOADING
            })
            const response = yield factories.requestGetProductWithFilter(payload.data)
            yield put({
                type: actions.LOAD_PRODUCT_LIST_WITH_TYPE_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            yield put({
                type: actions.LOAD_PRODUCT_LIST_WITH_TYPE_FAIL
            })
        }
    })
}

export function* getProductListSupperSale() {
    yield takeEvery(actions.LOAD_PRODUCT_LIST_WITH_SALE_TYPE_START, function* (payload) {
        try {
            const { data } = payload;
            let param = {};
            param['Type'] = data.data[constants.ROUTER_NAME.PROMOTION];
            const responsePromotion = yield call(() =>
                factories.requestGetPromotionTime(param),
            );
            yield put({ type: actions.LOAD_PRODUCT_LIST_WITH_SALE_TYPE_LOADING });
            const response = yield call(() =>
                factories.requestGetProductWithFilter(data),
            );
            yield put({
                type: actions.LOAD_PRODUCT_LIST_WITH_SALE_TYPE_SUCCESS,
                response: {...response.data, ...responsePromotion.data},
            });
        } catch (error) {
            yield put({ type: actions.LOAD_PRODUCT_LIST_WITH_SALE_TYPE_FAIL, error });
        }
    });
}
export default function* rootSaga() {
    yield all([
        getProductListType(),
        getProductListSupperSale()
    ])
}