import AppActions from '@spo/redux/app/action';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';
import { GetMsg } from '../../shared/config/Message';
import {
    POPUP_SUCCESS_TYPE,
    POPUP_WARNING_TYPE,
} from '../../shared/utils/EventRegister';
import Utils from '../../shared/utils/utils';

export function* getReviewsForOrder () {
    yield takeEvery(actions.LOAD_REVIEWS_FOR_ORDER, function* (payload) {
        try {
            let response = yield call(() =>
                factories.getReviewsForOrder(payload.queryParams),
            );
            yield put({
                type: actions.LOAD_REVIEWS_FOR_ORDER_SUCCESS,
                reviews: response.data,
            });
            if (payload.callback && payload.callback.success) {
                payload.callback.success(response);
            }
        } catch (error) {
            yield put({ type: actions.LOAD_REVIEWS_FOR_ORDER_FAILURE, error });
        }
    });
}

export function* getReviewsForChat () {
    yield takeEvery(actions.LOAD_REVIEWS_FOR_CHAT, function* (payload) {
        try {
            let response = yield call(() =>
                factories.getReviewsForChat(payload.queryParams),
            );
            yield put({
                type: actions.LOAD_REVIEWS_FOR_CHAT_SUCCESS,
                reviews: response.data,
            });
            if (payload.callback && payload.callback.success) {
                payload.callback.success(response);
            }
        } catch (error) {
            yield put({ type: actions.LOAD_REVIEWS_FOR_CHAT_FAILURE, error });
        }
    });
}

export function* getSettingReview () {
    yield takeEvery(actions.LOAD_SETTING_REVIEW, function* (payload) {
        try {
            let response = yield call(() =>
                factories.getSettingReview(),
            );
            yield put({
                type: actions.LOAD_SETTING_REVIEW_SUCCESS,
                setting: response.data,
            });
            if (payload.callback && payload.callback.success) {
                payload.callback.success(response);
            }
        } catch (error) {
            yield put({ type: actions.LOAD_SETTING_REVIEW_FAILURE, error });
        }
    });
}

export function* saveChatReview () {
    yield takeEvery(actions.SAVE_CHAT_REVIEW, function* (payload) {
        try {
            yield put({ type: AppActions.SHOW_LOADING, data: true });
            let response = yield call(() =>
                factories.saveChatReview(payload.data),
            );
            if (response.data.Code == 200) {
                Utils.alertPopup(
                    'Gửi đánh giá thành công!',
                    POPUP_SUCCESS_TYPE,
                );
                if (payload.callback && payload.callback.success) {
                    payload.callback.success(response);
                }
            } else {
                let msg = GetMsg(response.data.MsgNo);
                Utils.alertPopup(msg, POPUP_WARNING_TYPE);
            }
            yield put({
                type: actions.SAVE_CHAT_REVIEW_SUCCESS,
                setting: response.data,
            });
        } catch (error) {
            yield put({ type: actions.SAVE_CHAT_REVIEW_FAILURE, error });
        }
        finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}

export function* getChatDetail () {
    yield takeEvery(actions.GET_CHAT_DETAIL, function* (payload) {
        try {
            yield put({ type: AppActions.SHOW_LOADING, data: true });
            let response = yield call(() =>
                factories.getChatDetail(payload.queryParams),
            );
            yield put({
                type: actions.GET_CHAT_DETAIL_SUCCESS,
                chatDetail: response.data,
            });
            if (payload.callback && payload.callback.success) {
                payload.callback.success(response);
            }
        } catch (error) {
            yield put({ type: actions.GET_CHAT_DETAIL_FAILURE, error });
        }
        finally {
            yield put({ type: AppActions.SHOW_LOADING, data: false });
        }
    });
}

export default function* rootSaga () {
    yield all([
        fork(getReviewsForOrder),
        fork(getReviewsForChat),
        fork(getSettingReview),
        fork(saveChatReview),
        fork(getChatDetail)
    ]);
}
