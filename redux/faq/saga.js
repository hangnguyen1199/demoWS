import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import FaqActions from './action';

import factories from './factory';


export function* getTopic() {
    yield takeEvery(FaqActions.LOAD_FAQ_TOPIC, function* (payload) {
        const { callback, data, final } = payload;
        try {
            const response = yield call(() => factories.requestGetTopic(data));
            yield put({
                type: FaqActions.LOAD_FAQ_TOPIC_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            yield put({ type: FaqActions.LOAD_FAQ_TOPIC_FAILURE });
        } finally {
            if (final) {
                final();
            }
        }
    });
}
export function* getQuestions() {
    yield takeEvery(FaqActions.LOAD_FAQ_QUESTIONS, function* (payload) {
        const { callback, data, final } = payload;
        try {
            const response = yield call(() =>
                factories.requestGetQuestions(data),
            );
            yield put({
                type: FaqActions.LOAD_FAQ_QUESTIONS_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            yield put({ type: FaqActions.LOAD_FAQ_QUESTIONS_FAILURE });
        } finally {
            if (final) {
                final();
            }
        }
    });
}
export function* getAnswer() {
    yield takeEvery(FaqActions.LOAD_FAQ_ANSWER, function* (payload) {
        const { callback, data, final } = payload;
        try {
            const response = yield call(() => factories.requestGetAnswer(data));
            yield put({
                type: FaqActions.LOAD_FAQ_ANSWER_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            yield put({ type: FaqActions.LOAD_FAQ_ANSWER_FAILURE });
        } finally {
            if (final) {
                final();
            }
        }
    });
}
export function* searchFAQ() {
    yield takeEvery(FaqActions.SEARCH_FAQ, function* (payload) {
        const { callback, data, final } = payload;
        try {
            const response = yield call(() =>
                factories.requestGetQuestions(data),
            );
            yield put({
                type: FaqActions.SEARCH_FAQ_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            
        } finally {
            if (final) {
                final();
            }
        }
    });
}
export function* searchFAQByType() {
    yield takeEvery(FaqActions.SEARCH_FAQ_BY_TYPE, function* (payload) {
        const { callback, data, final } = payload;
        try {
            const response = yield call(() =>
                factories.requestGetQuestions(data),
            );
            yield put({
                type: FaqActions.SEARCH_FAQ_BY_TYPE_SUCCESS,
                payload: response.data,
                typeName: data?.TypeName
            });
        } catch (error) {
            
        } finally {
            if (final) {
                final();
            }
        }
    });
}
export default function* rootSaga() {
    yield all([
        fork(getTopic),
        fork(getQuestions),
        fork(getAnswer),
        fork(searchFAQ),
        fork(searchFAQByType)
    ]);
}
