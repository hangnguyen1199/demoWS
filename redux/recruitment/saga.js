import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { GetMsg } from '../../shared/config/Message';
import RecruitmentActions from './action';
import Factories from './factory';

export function* getRecruitmentList() {
    yield takeEvery(
        RecruitmentActions.LOAD_RECRUITMENT_LIST,
        function* (payload) {
            const { data, isLoadMore } = payload;
            try {
                yield put({
                    type:RecruitmentActions.LOAD_RECRUITMENT_LIST_LOADING
                })
                const response = yield call(() => Factories.getRecruitmentList(data));
                yield put({
                    type: RecruitmentActions.LOAD_RECRUITMENT_LIST_RESPONSE,
                    payload: response.data,
                    isLoadMore: isLoadMore,
                });
            } catch (error) {
                console.log('Error', error);
            }
        },
    );
}
export function* getRecruitmentListMobile() {
    yield takeEvery(
        RecruitmentActions.LOAD_RECRUITMENT_LIST_MOBILE,
        function* (payload) {
            const { data, isLoadMore } = payload;
            try {
                const response = yield call(() => Factories.getRecruitmentList(data));
                yield put({
                    type: RecruitmentActions.LOAD_RECRUITMENT_LIST_MOBILE_RESPONSE,
                    payload: response.data,
                    isLoadMore: isLoadMore,
                });
            } catch (error) {
                console.log('Error', error);
                yield put({
                    type:RecruitmentActions.LOAD_RECRUITMENT_LIST_MOBILE_FAIL
                })
            }
        },
    );
}

export function* getPositionsList() {
    yield takeEvery(RecruitmentActions.LOAD_POSITION_TYPE, function* () {
        try {
            const response = yield call(() => Factories.getPositionsList({ Type: 1 }));
            yield put({
                type: RecruitmentActions.LOAD_POSITION_TYPE_RESPONSE,
                payload: response.data,
            });
        } catch (error) {
            console.log('Error', error);
        }
    });
}

export function* onRecruitmentApply() {
    yield takeEvery(RecruitmentActions.RECRUITMENT_APPLY, function* (payload) {
        const { data, callback, fallback } = payload;
        try {
            const response = yield call(() => Factories.onApply(data));
            if (response.data.Code == 200) {
                if (callback) {
                    callback();
                }
            } else if (fallback) {
                let msg = GetMsg(response.data.Msg);
                fallback(msg);
            }
        } catch (error) {
            if (fallback) {
                let msg = "Vui lòng thử lại sau !"
                fallback(msg);
            }
        }
    });
}
export default function* rootSaga() {
    yield all([
        fork(getRecruitmentList),
        fork(getPositionsList),
        fork(onRecruitmentApply),
        fork(getRecruitmentListMobile)
    ]);
}
