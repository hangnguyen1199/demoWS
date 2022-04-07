import { all, takeEvery, fork, put, call, delay } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';

export function* getRelativeProduct() {
    yield takeEvery(actions.LOAD_RELATIVE_PRODUCT, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_RELATIVE_PRODUCT });
            const response = yield call(() => factories.requestGetRelativeProduct(data));
            yield put({
                type: actions.LOAD_RELATIVE_PRODUCT_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_RELATIVE_PRODUCT_FAILURE, error });
        }
    });
}

export function* getRecentlyProduct() {
    yield takeEvery(actions.LOAD_RECENTLY_PRODUCT, function* () {
        try {
            yield put({ type: actions.LOADING_RECENTLY_PRODUCT });
            yield put({
                type: actions.LOAD_RECENTLY_PRODUCT_SUCCESS,
                products: factories.requestGetRecentlyProduct(),
            });
        } catch (error) {
            yield put({ type: actions.LOAD_RECENTLY_PRODUCT_FAILURE, error });
        }
    });
}

export function* getProductDetail() {
    yield takeEvery(actions.LOAD_PRODUCT_DETAIL, function* (payload) {
        try {
            const { id } = payload.data;
            yield put({ type: actions.LOADING_PRODUCT_DETAIL });
            const response = yield call(() => factories.requestGetProductDetail(id));
            yield put({ type: actions.LOAD_PRODUCT_DETAIL_SUCCESS, data: response.data });
        } catch (error) {
            yield put({ type: actions.LOAD_PRODUCT_DETAIL_FAILURE, error });
        }
    });
}

export function* getProductDetailReview() {
    yield takeEvery(actions.LOAD_PRODUCT_DETAIL_REVIEW, function* (payload) {
        try {
            const param = payload.data;
            yield put({ type: actions.LOADING_PRODUCT_DETAIL_REVIEW });
            const response = yield call(() => factories.requestGetProductDetailReview(param));
            yield put({ type: actions.LOAD_PRODUCT_DETAIL_REVIEW_SUCCESS, data: response.data });
        } catch (error) {
            yield put({ type: actions.LOAD_PRODUCT_DETAIL_REVIEW_FAILURE, error });
        }
    });
}
export function* getStockInfo() {
    yield takeEvery(actions.LOAD_STOCK_INFO, function* (payload) {
        try {
            const {data, success} = payload;
            const response = yield call(() => factories.requestGetStockInfo(data));
            yield put({ type: actions.LOAD_STOCK_INFO_SUCCESS, data: response.data });
            success && success(response.data)
        } catch (error) {
            console.log(error)
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getRecentlyProduct),
        fork(getRelativeProduct),
        fork(getProductDetail),
        fork(getProductDetailReview),
        fork(getStockInfo),
    ]);
}
