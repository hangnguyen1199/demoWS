import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';

export function* searchShop () {
    yield takeEvery(actions.SEARCH_SHOP, function* (payload) {
        try {
            const { data } = payload;
            yield put({
                type: actions.SEARCHING_SHOP,
            });
            //Call api
            let response = yield call(() => factories.requestSearchShop(data));
            yield put({
                type: actions.SEARCH_SHOP_SUCCESS,
                response: response.data
            });
        } catch (error) {
            yield put({ type: actions.SEARCH_SHOP_FAILURE, error });
        }
    });
}
export default function* rootSaga () {
    yield all([
        fork(searchShop),
    ]);
}
