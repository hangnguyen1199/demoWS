import { all, takeEvery, fork, put, call, delay } from 'redux-saga/effects';
import constants from '../../shared/config/constants';
import actions from './action';
import factories from './factory';

export function* getProductListWatched() {
    yield takeEvery(actions.LOAD_WATCHED_PRODUCT_LIST, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_WATCHED_PRODUCT_LIST });
            const response = yield call(() =>
                factories.requestGetProductWithFilter(data),
            );
            if (response) {
                let paramRelative = {};
                paramRelative['Limit'] = constants.PAGINATION.LIMIT;
                paramRelative['Type'] = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_CARE;
                let responseRelative = yield call(() => factories.requestGetRelativeProduct(paramRelative));
                yield put({
                    type: actions.LOAD_WATCHED_PRODUCT_LIST_SUCCESS,
                    response: {watched: response.data, relative: responseRelative.data},
                });
            }
        } catch (error) {
            yield put({ type: actions.LOAD_WATCHED_PRODUCT_LIST_FAILURE, error });
        }
    });
}
export default function* rootSaga () {
    yield all([
        fork(getProductListWatched),

    ]);
}
