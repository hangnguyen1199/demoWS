import { all, takeEvery, fork, put, call } from 'redux-saga/effects';
import actions from './action';
import factories from './factory';
import AppConfig from './../../shared/config/AppConfig';
import Utils from './../../shared/utils/utils';

export function* getCategory() {
    yield takeEvery(actions.LOAD_CATEGORY_MASTER, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_CATEGORY_MASTER });
            let response = yield call(() => factories.requestGetCategory(data));
            yield put({
                type: actions.LOAD_CATEGORY_MASTER_SUCCESS,
                items: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_CATEGORY_MASTER_FAILURE, error });
        }
    });
}
export function* getCategoryByGender() {
    yield takeEvery(
        actions.LOAD_CATEGORY_MASTER_BY_GENDER,
        function* (payload) {
            try {
                const { data } = payload;
                let response = yield call(() =>
                    factories.requestGetCategoryByGender(data),
                );
                yield put({
                    type: actions.LOAD_CATEGORY_MASTER_BY_GENDER_SUCCESS,
                    items: response.data,
                });
            } catch (error) {
                yield put({
                    type: actions.LOAD_CATEGORY_MASTER_FAILURE,
                    error,
                });
            }
        },
    );
}
export function* getSetting() {
    yield takeEvery(actions.LOAD_SETTING_MASTER, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_SETTING_MASTER });
            let response = yield call(() => factories.requestGetSetting(data));
            AppConfig.BLACK_LIST_STRING =
                response?.data?.Setting.BlackListString;
            AppConfig.COUNTDOWN_RESEND_IF_ERROR =
                response?.data?.Setting?.CountdownResendIfError ?? 10;
            AppConfig.COUNTDOWN_RESEND_OTP =
                response?.data?.Setting?.ResendOTPTime ?? 300;
            AppConfig.MIN_AGE = response?.data?.Setting?.MinAge ?? 11;
            AppConfig.CAPTCHA_SITE_KEY = response?.data?.Setting?.CapchaBaseKey;
            AppConfig.CAPTCHA_BASE_URL = response?.data?.Setting?.CapchaSiteUrl;
            AppConfig.MAX_MONEY_FILTER =
                response?.data?.Setting?.MaxMoneyFilter;

            // SOCIAL SETTING
            AppConfig.AUTH_GOOGLE_CLIENT_ID =
            response?.data?.Setting?.GoogleClientId;
            AppConfig.AUTH_FACEBOOK_APP_ID =
            response?.data?.Setting?.FacebookAppId;
            // GUI SETTING
            handleSaveGuiCache(response?.data?.Gui);
            // UPLOAD FILE
            const resUploadSetting = yield call(() =>
                factories.requestUserReviewsSetting(),
            );
            AppConfig.MAX_FILE_UPLOAD = resUploadSetting?.UploadFileLimit;
            AppConfig.MAX_SIZE_UPLOAD = resUploadSetting?.UploadFileSizeLimit;
            AppConfig.REVIEW_CONTENT_LENGTH =
                resUploadSetting?.ContentLengthLimit;
            // AppConfig.PAGE_ID_FB=response?.data?.Setting?.CapchaSiteUrl;
            // AppConfig.APP_ID_FB=response?.data?.Setting?.CapchaSiteUrl;
            yield put({
                type: actions.LOAD_SETTING_MASTER_SUCCESS,
                items: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_SETTING_MASTER_FAILURE, error });
        }
    });
}
export function* getRank() {
    yield takeEvery(actions.LOAD_RANK_CONFIG_MASTER, function* (payload) {
        try {
            yield put({ type: actions.LOADING_RANK_CONFIG_MASTER });
            let response = yield call(() => factories.requestGetRankConfig());
            yield put({
                type: actions.LOAD_RANK_CONFIG_MASTER_SUCCESS,
                items: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_RANK_CONFIG_MASTER_FAILURE, error });
        }
    });
}
export function* getUnitShipment() {
    yield takeEvery(actions.LOAD_UNIT_SHIPMENT, function* (payload) {
        try {
            yield put({ type: actions.LOADING_UNIT_SHIPMENT });
            yield put({
                type: actions.LOAD_UNIT_SHIPMENT_SUCCESS,
                items: factories.requestGetUnitShipment(),
            });
        } catch (error) {
            yield put({ type: actions.LOAD_UNIT_SHIPMENT_FAILURE, error });
        }
    });
}
export function* getShipStatus() {
    yield takeEvery(actions.LOAD_SHIP_STATUS, function* (payload) {
        try {
            yield put({ type: actions.LOADING_SHIP_STATUS });
            yield put({
                type: actions.LOAD_SHIP_STATUS_SUCCESS,
                items: factories.requestGetShipStatus(),
            });
        } catch (error) {
            yield put({ type: actions.LOAD_SHIP_STATUS_FAILURE, error });
        }
    });
}
export function* getPaymentStatus() {
    yield takeEvery(actions.LOAD_PAYMENT_STT, function* (payload) {
        try {
            yield put({ type: actions.LOADING_PAYMENT_STT });
            yield put({
                type: actions.LOAD_PAYMENT_STT_SUCCESS,
                items: factories.requestGetPaymentStatus(),
            });
        } catch (error) {
            yield put({ type: actions.LOAD_PAYMENT_STT_FAILURE, error });
        }
    });
}
export function* getItemType() {
    yield takeEvery(actions.LOAD_ITEM_TYPE, function* (payload) {
        try {
            yield put({ type: actions.LOADING_ITEM_TYPE });
            yield put({
                type: actions.LOAD_ITEM_TYPE_SUCCESS,
                items: factories.requestGetItemType(),
            });
        } catch (error) {
            yield put({ type: actions.LOAD_ITEM_TYPE_FAILURE, error });
        }
    });
}
export function* getGender() {
    yield takeEvery(actions.LOAD_GENDER, function* (payload) {
        try {
            yield put({ type: actions.LOADING_GENDER });
            yield put({
                type: actions.LOAD_GENDER_SUCCESS,
                items: factories.requestGetGender(),
            });
        } catch (error) {
            yield put({ type: actions.LOAD_GENDER_FAILURE, error });
        }
    });
}
export function* getBrand() {
    yield takeEvery(actions.LOAD_BRAND_MASTER_FULL, function* (payload) {
        try {
            // const {data} = payload;
            const response = yield call(() => factories.requestGetBrand());
            yield put({
                type: actions.LOAD_BRAND_MASTER_FULL_SUCCESS,
                data: response,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_BRAND_MASTER_FULL_FAILURE, error });
        }
    });
}

export function* getHottrend() {
    yield takeEvery(actions.LOAD_HOTTREND, function* () {
        try {
            yield put({ type: actions.LOADING_HOTTREND });
            const response = yield call(() => factories.requestGetHottrend());
            yield put({
                type: actions.LOAD_HOTTREND_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_HOTTREND_FAILURE, error });
        }
    });
}

export function* getImpressShop() {
    yield takeEvery(actions.LOAD_IMPRESS_SHOP, function* () {
        try {
            yield put({ type: actions.LOADING_IMPRESS_SHOP });
            const response = yield call(() =>
                factories.requestGetImpressShop(),
            );
            yield put({
                type: actions.LOAD_IMPRESS_SHOP_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_IMPRESS_SHOP_FAILURE, error });
        }
    });
}

export function* getCollection() {
    yield takeEvery(actions.LOAD_COLLECTION, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_COLLECTION });
            const response = yield call(() =>
                factories.requestGetCategory(data),
            );
            yield put({
                type: actions.LOAD_COLLECTION_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_COLLECTION_FAILURE, error });
        }
    });
}
export function* getTopBrand() {
    yield takeEvery(actions.LOAD_TOP_BRAND, function* () {
        try {
            yield put({ type: actions.LOADING_TOP_BRAND });
            const response = yield call(() => factories.requestGetTopBrand());
            yield put({
                type: actions.LOAD_TOP_BRAND_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_TOP_BRAND_FAILURE, error });
        }
    });
}

export function* getSpoBrand() {
    yield takeEvery(actions.LOAD_SPO_BRAND, function* (payload) {
        try {
            // const {data} = payload;
            const response = yield call(() =>
                factories.requestGetBrandFilter(),
            );
            yield put({
                type: actions.LOAD_SPO_BRAND_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_SPO_BRAND_FAILURE, error });
        }
    });
}

export function* getSize() {
    yield takeEvery(actions.LOAD_SIZE, function* (payload) {
        try {
            const { data } = payload;
            const response = yield call(() => factories.requestGetSize(data));
            const result = response.data;
            yield put({ type: actions.LOAD_SIZE_SUCCESS, data: result });
        } catch (error) {
            yield put({ type: actions.LOAD_SIZE_FAILURE, error });
        }
    });
}

export function* getSizeColorFilter() {
    yield takeEvery(actions.LOAD_SIZE_COLOR_FILTER, function* (payload) {
        try {
            const { data } = payload;
            const response = yield call(() =>
                factories.requestGetSizeColorFilter(data),
            );
            yield put({
                type: actions.LOAD_SIZE_COLOR_FILTER_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_SIZE_COLOR_FILTER_FAILURE, error });
        }
    });
}
export function* getSizeFilter() {
    yield takeEvery(actions.LOAD_SIZE_FILTER, function* (payload) {
        try {
            const { data } = payload;
            const response = yield call(() =>
                factories.requestGetSizeFilter(data),
            );
            yield put({
                type: actions.LOAD_SIZE_FILTER_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_SIZE_FILTER_FAILURE, error });
        }
    });
}
export function* getColorFilter() {
    yield takeEvery(actions.LOAD_COLOR_FILTER, function* (payload) {
        try {
            const { data } = payload;
            const response = yield call(() =>
                factories.requestGetColorFilter(data),
            );
            yield put({
                type: actions.LOAD_COLOR_FILTER_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_COLOR_FILTER_FAILURE, error });
        }
    });
}

export function* getColor() {
    yield takeEvery(actions.LOAD_COLOR, function* (payload) {
        try {
            const { data } = payload;
            const response = yield call(() => factories.requestGetColor(data));
            const result = response.data;
            yield put({ type: actions.LOAD_COLOR_SUCCESS, data: result });
        } catch (error) {
            yield put({ type: actions.LOAD_COLOR_FAILURE, error });
        }
    });
}

export function* getBankingMaster() {
    yield takeEvery(actions.LOAD_BANKING_MASTER, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_BANKING_MASTER });
            let response = yield call(() => factories.requestGetBanking(data));
            yield put({
                type: actions.LOAD_BANKING_MASTER_SUCCESS,
                items: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_BANKING_MASTER_FAILURE, error });
        }
    });
}
export function* getBranchBankingMaster() {
    yield takeEvery(actions.LOAD_BRANCH_MASTER, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_BRANCH_MASTER });
            let response = yield call(() =>
                factories.requestGetBranchBanking(data),
            );
            yield put({
                type: actions.LOAD_BRANCH_MASTER_SUCCESS,
                items: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_BRANCH_MASTER_FAILURE, error });
        }
    });
}
export function* getSlide() {
    yield takeEvery(actions.LOAD_SLIDE, function* () {
        try {
            yield put({ type: actions.LOADING_SLIDE });
            let response = yield call(() => factories.requestGetSlide());
            yield put({
                type: actions.LOAD_SLIDE_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_SLIDE_FAILURE, error });
        }
    });
}

export function* getSizeMaster() {
    yield takeEvery(actions.LOAD_SIZE_MASTER, function* (payload) {
        try {
            const { data } = payload;
            const response = yield call(() => factories.requestGetSizeMaster(data));
            const result = response.data;
            yield put({ type: actions.LOAD_SIZE_MASTER_SUCCESS, data: result });
        } catch (error) {
            yield put({ type: actions.LOAD_SIZE_MASTER_FAILURE, error });
        }
    });
}

export function* getCategoryMasterAll() {
    yield takeEvery(actions.LOAD_CATEGORY_MASTER_ALL, function* (payload) {
        try {
            const { data } = payload;
            let response = yield call(() => factories.requestGetCategoryMasterAll(data));
            yield put({
                type: actions.LOAD_CATEGORY_MASTER_ALL_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            
        }
    });
}

const handleSaveGuiCache = (data) => {
    let oldVersion =  AppConfig.APP_VERSION;
    if (oldVersion != data?.Version) {
        localStorage.setItem('AppVersion', data?.Version);
        localStorage.setItem('AppLogo', data?.Logo);
        localStorage.setItem('AppHeaderBgColor', data?.HeaderBgColor);
        localStorage.setItem('AppHeaderTextColor', data?.HeaderTextColor);
        localStorage.setItem('AppCartBadgeBgColor', data?.CartBadgeBgColor);
        localStorage.setItem('AppCartBadgeTextColor', data?.CartBadgeTextColor);
        AppConfig.APP_LOGO = data?.Logo;
        AppConfig.APP_HEADER_BG_COLOR = data?.HeaderBgColor;
        AppConfig.APP_HEADER_TEXT_COLOR = data?.HeaderTextColor;
        AppConfig.APP_CART_BADGE_BG_COLOR = data?.CartBadgeBgColor;
        AppConfig.APP_CART_BADGE_TEXT_COLOR = data?.CartBadgeTextColor;
        AppConfig.APP_VERSION = data?.Version;
        AppConfig.APP_HEADER_TEXT_COLOR_HOVER = data?.HeaderTextHoverColor;
        // Utils.alertPopup("Hệ thống đã cập nhật giao diện mới",null,()=>{
        //     window.location.reload()
        // });
    }
};

export function* getReturnReasonSetting() {
    yield takeEvery(actions.LOAD_RETURN_REASON_SETTING, function* (payload) {
        try {
            const { data } = payload;
            let response = yield call(() => factories.requestGetReturnReasonSetting(data));
            yield put({
                type: actions.LOAD_RETURN_REASON_SETTING_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            
        }
    });
}

export function* getShoppingGuide() {
    yield takeEvery(actions.LOAD_SHOPPING_GUIDE, function* (payload) {
        try {
            const { data } = payload;
            yield put({ type: actions.LOADING_SHOPPING_GUIDE });
            let response = yield call(() => factories.requestGetShoppingGuide(data));
            yield put({
                type: actions.LOAD_SHOPPING_GUIDE_SUCCESS,
                data: response.data,
            });
        } catch (error) {
            yield put({ type: actions.LOAD_SHOPPING_GUIDE_FAILURE, error });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getUnitShipment),
        fork(getShipStatus),
        fork(getPaymentStatus),
        fork(getItemType),
        fork(getGender),
        fork(getCategory), // HAIDT
        fork(getSetting), // HAIDT
        fork(getBrand),
        fork(getHottrend),
        fork(getImpressShop),
        fork(getCollection),
        fork(getTopBrand),
        fork(getSpoBrand),
        fork(getSize),
        fork(getColor),
        fork(getBankingMaster),
        fork(getBranchBankingMaster),
        // fork(getSizeColorFilter),
        fork(getSizeFilter),
        fork(getColorFilter),
        fork(getSlide),
        fork(getCategoryByGender),
        fork(getRank), // HAIDT
        fork(getSizeMaster), // DungNT add
        fork(getCategoryMasterAll),
        fork(getReturnReasonSetting),
        fork(getShoppingGuide),
    ]);
}
