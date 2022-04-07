import { all, takeEvery, fork, put, call } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';

export function* getTopProduct() {
    yield takeEvery(actions.LOAD_TOP_VIEWED_PRODUCT, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_TOP_VIEWED_PRODUCT });
            const response = yield call(() =>
                factories.requestGetProductWithType(data),
            );
            editTypeListProduct(response, 'top')
            yield put({
                type: actions.LOAD_TOP_VIEWED_PRODUCT_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_TOP_VIEWED_PRODUCT_FAILURE, error });
        }
    });
}
export function* getNewestProduct() {
    yield takeEvery(actions.LOAD_NEWEST_PRODUCT, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_NEWEST_PRODUCT });
            const response = yield call(() =>
                factories.requestGetProductWithType(data),
            );
            editTypeListProduct(response, 'new')
            yield put({
                type: actions.LOAD_NEWEST_PRODUCT_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_NEWEST_PRODUCT_FAILURE, error });
        }
    });
}
export function* getGoldenHourProduct() {
    yield takeEvery(actions.LOAD_GOLDEN_HOUR_PRODUCT, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_GOLDEN_HOUR_PRODUCT });
            const response = yield call(() =>
                factories.requestGetProductWithType(data),
            );
            editTypeListProduct(response, 'golden')
            yield put({
                type: actions.LOAD_GOLDEN_HOUR_PRODUCT_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_GOLDEN_HOUR_PRODUCT_FAILURE, error });
        }
    });
}
export function* getSupperSaleProduct() {
    yield takeEvery(actions.LOAD_SUPPER_SALE_PRODUCT, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_SUPPER_SALE_PRODUCT });
            const response = yield call(() =>
                factories.requestGetProductWithType(data),
            );
            editTypeListProduct(response, 'sale')
            yield put({
                type: actions.LOAD_SUPPER_SALE_PRODUCT_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_SUPPER_SALE_PRODUCT_FAILURE, error });
        }
    });
}
export function* getTrendingProduct() {
    yield takeEvery(actions.LOAD_TRENDING_PRODUCT, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_TRENDING_PRODUCT });
            const response = yield call(() =>
                factories.requestGetProductWithType(data),
            );
            editTypeListProduct(response, 'trend')
            yield put({
                type: actions.LOAD_TRENDING_PRODUCT_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_TRENDING_PRODUCT_FAILURE, error });
        }
    });
}

export function* getListNews() {
    yield takeEvery(actions.LOAD_NEWS, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_NEWS });
            const response = yield call(() =>
                factories.requestGetNews(data),
            );
            yield put({
                type: actions.LOAD_NEWS_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_NEWS_FAILURE, error });
        }
    });
}
export function* getListPromotion() {
    yield takeEvery(actions.LOAD_PROMOTION, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_PROMOTION });
            const response = yield call(() =>
                factories.requestGetPromotions(data),
            );
            yield put({
                type: actions.LOAD_PROMOTION_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_PROMOTION_FAILURE, error });
        }
    });
}
function editTypeListProduct(res, type) {
    if (res && res.data && res.data.List) {
        res.data.List.forEach(item => {
            switch (type) {
                case 'top':
                    item.isTop = true;
                    break;
                case 'sale':
                    item.isSales = true;
                    break;
                case 'golden':
                    item.isGoldenHour = true;
                    break;
                case 'trend':
                    item.isTrend = true;
                    break;
                case 'new':
                    item.isNew = true;
                    break;
                default:
                    break;
            }
        });
    }
}
export function* getMayBeYouCareProduct() {
    yield takeEvery(actions.LOAD_MAY_BE_YOU_CARE_PRODUCT, function* (payload) {
        try {
            const { data } = payload;
            const response = yield call(() =>
                factories.requestGetProductWithType(data),
            );
            yield put({
                type: actions.LOAD_MAY_BE_YOU_CARE_PRODUCT_SUCCESS,
                response: response.data,
            });
        } catch (error) {
           
        }
    });
}

export function* getProductFilter() {
    yield takeEvery(actions.LOAD_PRODUCT_FILTER, function* (payload) {
        try {
            const { data } = payload;
            const response = yield call(() =>
                factories.requestGetProductWithType(data),
            );
            editTypeListProduct(response, 'top')
            yield put({
                type: actions.LOAD_PRODUCT_FILTER_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            
        }
    });
}

export function* getProductInHome() {
    yield takeEvery(actions.GET_PRODUCT_IN_HOME, function* (payload) {
        const { data, callback } = payload;
        try {
            const response = yield call(() => factories.requestFilterProduct(data));
            if (response?.status === 200) {
                yield put({
                    type: actions.GET_PRODUCT_IN_HOME_SUCCESS,
                    payload: {
                        Gender: data?.GenderText,
                        TypeFilter: data?.TypeText,
                        List: response?.data?.List,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (callback) {
                setTimeout(() => {
                    callback();
                }, 1000);
            }
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getTopProduct),
        fork(getNewestProduct),
        fork(getGoldenHourProduct),
        fork(getSupperSaleProduct),
        fork(getTrendingProduct),
        fork(getListNews),
        fork(getListPromotion),
        fork(getMayBeYouCareProduct),
        fork(getProductFilter),
        fork(getProductInHome),
    ]);
}
