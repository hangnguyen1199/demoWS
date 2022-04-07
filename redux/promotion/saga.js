import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import Actions from './action'
import Factories from './factory'

export function* getPromotionList() {
    yield takeEvery(Actions.LOAD_PROMOTION_LIST, function* (payload) {
        try {
            yield put({ type: Actions.LOADING_PROMOTION_LIST})
            const { data } = payload
            const response = yield call(() => Factories.getPromotionList(data))
            yield put({
                type: Actions.LOAD_PROMOTION_LIST_RESPONSE,
                payload: response.data,
            })
        } catch (error) {
            yield put({ type: Actions.LOAD_PROMOTION_LIST_FAIL})
        }
    })
}

export function* getPromotionListMobile() {
    yield takeEvery(Actions.LOAD_PROMOTION_LIST_MOBILE, function* (payload) {
        try {
            const { data } = payload
            const response = yield call(() => Factories.getPromotionList(data))
            yield put({
                type: Actions.LOAD_PROMOTION_LIST_RESPONSE_MOBILE,
                payload: response.data,
            })
        } catch (error) {
            yield put({ type: Actions.LOAD_PROMOTION_LIST_FAIL_MOBILE})
        }
    })
}
export function* getPromotionOther() {
    yield takeEvery(Actions.LOAD_OTHER_PROMOTION, function* (payload) {
        const { callback, data } = payload
        try {
            const response = yield call(() => Factories.getPromotionList(data))
            callback?.success && callback?.success(response?.data?.Promotions)
        } catch (error) {
            callback?.error && callback?.error()
        } finally {
            callback?.finaly && callback?.finaly()
        }
    })
}
export default function* rootSaga() {
    yield all([fork(getPromotionList), fork(getPromotionOther),fork(getPromotionListMobile)])
}
