import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import Factories from './factories';

export function* getFaqs() {
    yield takeEvery(actions.GET_FAQ, function* (payload) {
        const { keyword } = payload;
        try {
            const response = yield call(() => Factories.getFaq(keyword));
            yield put({
                type: actions.GET_FAQ_RESPONSE,
                payload: response.data,
            });
        } catch (error) {
            console.log('Get Faqs Error: ', error.message);
        }
    });
}
export default function* rootSaga() {
    yield all([fork(getFaqs)]);
}
