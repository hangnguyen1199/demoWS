import helpCenterSaga from '@spo/redux/help-center/saga';
import newsSaga from '@spo/redux/news/saga';
import promotionSaga from '@spo/redux/promotion/saga';
import recruitmentSaga from '@spo/redux/recruitment/saga';
import regulationSaga from '@spo/redux/regulation/saga';
import searchItemSaga from '@spo/redux/search-item/saga';
import searchShopSaga from '@spo/redux/search-shop/saga';
import signInSaga from '@spo/redux/sign-in/saga';
import signUpSaga from '@spo/redux/sign-up/saga';
import { all } from 'redux-saga/effects';
import 'regenerator-runtime/runtime';
import accountSaga from './account/saga';
import appSagas from './app/saga';
import authSaga from './auth/saga';
import cartSagas from './cart/saga';
import commonSaga from './common/saga';
import faqSaga from './faq/saga';
import homeSagas from './home/saga';
import itemDetailSagas from './item-detail/saga';
import locationSaga from './location/saga';
import mailBoxSaga from './mail-box/saga';
import walletSaga from './wallet/saga';
import masterSaga from './master/saga';
import myReviewsSaga from './my-reviews/saga';
import notificationSaga from './notification/saga';
import orderDetailSagas from './order-detail/saga';
import orderSagas from './order/saga';
import productListWatchedSagas from './product-list-watched/saga';
import menuSearchSaga from './top-search-menu/saga';
import userLoggedSaga from './user-logged/saga';
import wishlistSaga from './wishlist/saga';
import rewardSaga from './reward/saga';
import productListTypeSaga from './product-list/saga';
import trackingOrderSaga from './tracking-order/saga';
import registerEmailSaga from './register-email/saga';

export default function* rootSaga(getState) {
    yield all([
        appSagas(),
        homeSagas(),
        itemDetailSagas(),
        orderDetailSagas(),
        cartSagas(),
        orderSagas(),
        wishlistSaga(),
        commonSaga(),
        userLoggedSaga(),
        signInSaga(),
        signUpSaga(),
        searchItemSaga(),
        regulationSaga(),
        searchShopSaga(),
        notificationSaga(),
        newsSaga(),
        helpCenterSaga(),
        productListWatchedSagas(),
        promotionSaga(),
        recruitmentSaga(),
        locationSaga(),
        authSaga(),
        masterSaga(),
        accountSaga(),
        myReviewsSaga(),
        mailBoxSaga(),
        menuSearchSaga(),
        faqSaga(),
        walletSaga(),
        rewardSaga(),
        productListTypeSaga(),
        trackingOrderSaga(),
        registerEmailSaga()
    ]);
}
