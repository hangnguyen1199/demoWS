import UserLoggedActions from '@spo/redux/user-logged/action';
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';

export function* filterItem() {
    yield takeEvery(actions.FILTER_ITEM, function* (payload) {
        try {
            const { data } = payload;
            yield put({
                type: actions.FILTERRING_ITEM,
            });
            //Call api
            let response = yield call(() => factories.requestFilterItem(data));
            yield put({
                type: actions.FILTER_ITEM_SUCCESS,
                response: response.data,
            });
            // Redirect home
        } catch (error) {
            yield put({ type: actions.FILTER_ITEM_FAILURE, error });
        }
    });
}

export function* filterItemLoadMore() {
    yield takeEvery(actions.FILTER_ITEM_LOAD_MORE, function* (payload) {
        try {
            const { data } = payload;
            yield put({
                type: actions.FILTERRING_ITEM_LOAD_MORE,
            });
            //Call api
            let response = yield call(() => factories.requestFilterItem(data));
            yield put({
                type: actions.FILTER_ITEM_LOAD_MORE_SUCCESS,
                response: response.data,
            });
            // Redirect home
        } catch (error) {
            yield put({ type: actions.FILTER_ITEM_LOAD_MORE_FAILURE, error });
        }
    });
}

export function* getCurrentCategory() {
    yield takeEvery(actions.GET_CURRENT_CATEGORY, function* (payload) {
        try {
            const { data } = payload;
            yield put({
                type: actions.GETTING_CURRENT_CATEGORY,
            });
            //Call api
            let response = yield call(() =>
                factories.requestGetCurrentCategory(data),
            );
            yield put({
                type: actions.GET_CURRENT_CATEGORY_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            yield put({ type: actions.GET_CURRENT_CATEGORY_FAILURE, error });
        }
    });
}

export function* getBrandName() {
    yield takeEvery(actions.GET_BRAND_NAME, function* (payload) {
        try {
            const { data } = payload;
            yield put({
                type: actions.GETTING_BRAND_NAME,
            });
            //Call api
            let response = yield call(() => factories.requestGetBrandName(data));
            yield put({
                type: actions.GET_BRAND_NAME_SUCCESS,
                response: response.data,
            });
        } catch (error) {
            yield put({ type: actions.GET_BRAND_NAME_FAILURE, error });
        }
    });
}
export function* getCategoryName() {
    yield takeEvery(actions.GET_CATEGORY_NAME, function* (payload) {
        try {
            const { data } = payload;
            yield put({
                type: actions.GETTING_CATEGORY_NAME,
            });
            //Call api
            let response = yield call(() => factories.requestGetCategoryName(data));
            yield put({
                type: actions.GET_CATEGORY_NAME_SUCCESS,
                response: {
                    category_name: response.data.category_name,
                    category_slug: data,
                },
            });
        } catch (error) {
            yield put({ type: actions.GET_CATEGORY_NAME_FAILURE, error });
        }
    });
}
export default function* rootSaga() {
    yield all([
        fork(filterItem),
        fork(getCurrentCategory),
        fork(getBrandName),
        fork(getCategoryName),
        fork(filterItemLoadMore),
    ]);
}
