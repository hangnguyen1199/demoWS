import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import Actions from './action';
import Factories from './factory';

export function* getRecruitmentCities() {
    yield takeEvery(Actions.GET_CITY_RECRUITMENT, function* (payload) {
        try {
            const { data } = payload;
            const response = yield call(() => Factories.getCity(data));
            yield put({
                type: Actions.GET_CITY_RECRUITMENT_SUCCESS,
                payload: response?.data,
            });
        } catch (error) {
            console.log(error);
        }
    });
}
export function* getCities() {
    yield takeEvery(Actions.GET_CITY, function* (payload) {
        const { data } = payload;
        try {
            const response = yield call(() => Factories.getCity(data));
            if (response?.status === 200) {
                yield put({
                    type: Actions.GET_CITY_SUCCESS,
                    payload: response?.data,
                });
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    });
}

export function* getDistricts() {
    yield takeEvery(Actions.GET_DISTRICT, function* (payload) {
        const { data } = payload;
        try {
            const response = yield call(() => Factories.getDistricts(data));
            if (response?.status === 200) {
                yield put({
                    type: Actions.GET_DISTRICT_SUCCESS,
                    payload: response?.data,
                });
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    });
}
export function* getWards() {
    yield takeEvery(Actions.GET_WARD, function* (payload) {
        const { data } = payload;
        try {
            const response = yield call(() => Factories.getWards(data));
            if (response?.status === 200) {
                yield put({
                    type: Actions.GET_WARD_SUCCESS,
                    payload: response?.data,
                });
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    });
}
export default function* locationSaga() {
    yield all(
        [fork(getCities),
            fork(getDistricts),
            fork(getWards),
            fork(getRecruitmentCities),
        ]);
}
