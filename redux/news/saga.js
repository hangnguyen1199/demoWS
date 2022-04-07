import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import actions from './action'
import factories from './factory'

export function* getNewsList() {
    yield takeEvery(actions.LOAD_NEWS_LIST, function* (payload) {
        const { data, isLoadMore, callback } = payload
        try {
            yield put({ type: actions.LOADING_NEWS_LIST })
            const response = yield call(() => factories.requestNewsList(data))
            yield put({
                type: actions.LOAD_NEWS_RESPONSE,
                payload: response.data,
            })
        } catch (error) {
            yield put({ type: actions.LOAD_NEWS_LIST_FAIL})
        } finally {
            if (callback) {
                callback()
            }
        }
    })
}
export function* getNewsListLoadMore() {
    yield takeEvery(actions.LOAD_NEWS_MOBILE, function* (payload) {
        const { data, isLoadMore, callback } = payload
        try {
            // yield put({ type: actions.LOADING_NEWS_LIST })
            const response = yield factories.requestNewsList(data);
            yield put({
                type: actions.LOAD_NEWS_RESPONSE_MOBILE,
                payload: response.data,
                isLoadMore,
            })
            callback && callback()
        } catch (error) {
            yield put({ type: actions.LOAD_NEWS_LIST_FAIL})
        } finally {
            if (callback) {
                callback()
            }
        }
    })
}
export function* getNewsDetail() {
    yield takeEvery(actions.LOAD_NEWS_DETAIL, function* (payload) {
        const { Id, callback } = payload
        try {
            const response = yield call(() => factories.requestNewsDetail(Id))
            yield put({
                type: actions.LOAD_NEWS_DETAIL_SUCCESS,
                response: response.data,
            })
        } catch (error) {
            console.log('Error in News Detail', error)
        } finally {
            if (callback) {
                callback()
            }
        }
    })
}
export function* getNewsSlide() {
    yield takeEvery(actions.LOAD_NEWS_SLIDE, function* (payload) {
        const { callback } = payload
        try {
            const response = yield call(() => factories.requestNewsSlide())
            yield put({
                type: actions.LOAD_NEWS_SLIDE_RESPONSE,
                payload: response.data,
            })
        } catch (error) {
            yield put({ type: actions.LOAD_NEWS_SLIDE_FAIL })
        } finally {
            if (callback) {
                callback()
            }
        }
    })
}
export function* getOtherNews() {
    yield takeEvery(actions.LOAD_OTHER_NEWS, function* (payload) {
        const { callback, data } = payload
        try {
            const response = yield call(() => factories.requestNewsList(data))
            callback?.success && callback?.success(response?.data?.NewsList)
        } catch (error) {
            callback?.error && callback?.error()
        } finally {
            callback?.finaly && callback?.finaly()
        }
    })
}

export default function* rootSaga() {
    yield all([
        fork(getNewsList),
        fork(getNewsDetail),
        fork(getNewsSlide),
        fork(getOtherNews),
        fork(getNewsListLoadMore)
    ])
}
