import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import AppConfig from '../../shared/config/AppConfig';
import actions from './action';
import factories from './factory';

export function* getGenderMaster() {
    yield takeEvery(actions.GET_GENDER_MASTER, function* (payload) {
        try {
            let response = yield call(() => factories.requestGetUserProfile());
            console.log(response)
            yield put({
                type: actions.GET_USER_PROFILE_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            // yield put({ type: actions.LOAD_USER_LOGGED_FAILURE, error });
        }
    });
}
export function* getProvinceMaster() {
    yield takeEvery(actions.GET_PROVINCE_MASTER, function* (payload) {
        try {
            let response = yield call(() => factories.requestGetProvinceMaster());
            yield put({
                type: actions.GET_PROVINCE_MASTER_SUCCESS,
                data: response.data,
            });
            payload.success && payload.success(response.data)
        } catch (error) {
            // yield put({ type: actions.LOAD_USER_LOGGED_FAILURE, error });
        }
    });
}
export function* getDistrictMaster() {
    yield takeEvery(actions.GET_DISTRICT_MASTER, function* (payload) {
        try {
            const {data, success} = payload
            let response = yield call(() => factories.requestGetDistrictMaster(data));
            success && success(response.data)
        } catch (error) {
            // yield put({ type: actions.LOAD_USER_LOGGED_FAILURE, error });
        }
    });
}
export function* getCommuneMaster() {
    yield takeEvery(actions.GET_COMMUNE_MASTER, function* (payload) {
        try {
            const {data, success} = payload
            let response = yield call(() => factories.requestGetCommunesMaster(data));
            success && success(response.data)
        } catch (error) {
            // yield put({ type: actions.LOAD_USER_LOGGED_FAILURE, error });
        }
    });
}


export default function* rootSaga() {
    yield all([
        fork(getGenderMaster),
        fork(getProvinceMaster),
        fork(getCommuneMaster),
        fork(getDistrictMaster),
    ]);
}
