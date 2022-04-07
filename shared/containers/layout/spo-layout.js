const Preloader = dynamic(
    () => import('@spo/components/spo-layout/pre-loader'),
    { ssr: false }
);
const Top = dynamic(() => import('@spo/components/spo-layout/top'), {
    ssr: false,
});

const Footer = dynamic(() => import('@spo/components/spo-layout/footer'), {
    ssr: false,
});
const FooterMobile = dynamic(
    () => import('@spo/components/spo-layout/footer-mobile'),
    {
        ssr: false,
    }
);

const Overlay = dynamic(() => import('@spo/components/common/overlay'), {
    ssr: false,
});
// const Loader = dynamic(() => import('@spo/components/spo-layout/loader'), {
//     ssr: false,
// });
const FloatButtonGroup = dynamic(
    () => import('@spo/components/float-button/float-button-group'),
    { ssr: false }
);
const Display = dynamic(() => import('@spo/components/common/display'), {
    ssr: false,
});
const ModalPickStock = dynamic(
    () => import('@spo/components/spo-layout/modal-pick-stock'),
    { ssr: false }
);
import useWindowSize from '@spo/lib/use-window-size';
import constants from '@spo/config/constants';
import AppActions from '@spo/redux/app/action';
import CartActions from '@spo/redux/cart/action';
import CommonActions from '@spo/redux/common/action';
import NotificationActions from '@spo/redux/notification/action';
import UserLoggedActions from '@spo/redux/user-logged/action';
import WishlistActions from '@spo/redux/wishlist/action';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@spo/components/common/alert';
import SignInActions from '@spo/redux/sign-in/action';
import * as ga from '@spo/lib/ga';
import CommonPopup from '../../components/common/popups/common-popup';
import AppConfig from './../../config/AppConfig';
import AuthActions from '../../../redux/auth/action';

import MenuActions from '../../../redux/top-search-menu/action';
import Loader from './../../components/spo-layout/loader';
// import Header from './../home/components/header';
import Header from './../../components/spo-layout/header';
import useCustomRoute from '../../library/use-custom-route';
import PageList from '../../config/PageList';
import EventRegister, {
    EVENT_SHOW_POPUP,
    FIRST_POPUP,
    SECOND_POPUP,
    SHOW_LOADING,
} from '../../utils/EventRegister';
import Utils from '../../utils/utils';
import CartDrawer from '../../components/spo-top/cart-drawer';
import GTAG from '../../utils/gtag';

const SpoLayout = (props) => {
    const { TopHeader = Top } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const pageWrapper = useRef(null);
    const { loading, alert, data, overlay, loader } = useSelector(
        (state) => state.App
    );
    const user_profile = useSelector(
        (state) => state.UserLogged.data.user_info
    );
    const {
        data: { wishlistProducts },
    } = useSelector((state) => {
        return state.Wishlist;
    });
    const {
        data: { resultSearchShop },
        loading: { loadingSearchShop },
    } = useSelector((state) => {
        return state.SearchShop;
    });
    const isAuthenticated = !!useSelector(
        (state) => state.UserLogged.data.user_info.user_id
    );
    const { notifications, count_unread } = useSelector(
        (state) => state.Notification.data
    );
    const {
        showPickStock,
        loading: { loadingCart },
        data: { cartProducts, currentItem },
    } = useSelector((state) => state.Cart);

    const {
        data: { information },
    } = useSelector((state) => state.Regulation);
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        dispatch(AppActions.closeLoading());
        dispatch({
            type: CartActions.LOAD_CART_SYNC_PRODUCT,
        });
        // dispatch({
        //     type: CartActions.LOAD_CART,
        // });
        dispatch({
            type: CommonActions.LOAD_CATEGORY_MASTER,
        });
        dispatch({
            type: CommonActions.LOAD_SETTING_MASTER,
        });
        dispatch({
            type: CommonActions.LOAD_SIZE_MASTER,
        });
        dispatch({
            type: CommonActions.LOAD_CATEGORY_MASTER_ALL,
            data: {
                Recursive: false,
            },
        });
        dispatch({
            type: CommonActions.LOAD_RETURN_REASON_SETTING,
        });
        dispatch({
            type: CommonActions.LOAD_RANK_CONFIG_MASTER,
        });
        // dispatch({
        //     type: CommonActions.LOAD_SIZE,
        // });
        if (AppConfig.ACCESS_TOKEN) {
            dispatch({
                type: AuthActions.GET_USER,
                callback: (res) => {
                    // if (res?.IsVerifyAccount != constants.V002.VERIFYED) {
                    //     Utils.showPopupRequestVerifyPhone();
                    // }
                },
            });
        }
    }, []);
    useEffect(() => {
        if (loadingCart) {
            dispatch(AppActions.callLoader());
        } else {
            dispatch(AppActions.closeLoader());
        }
    }, [loadingCart]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({
                type: SignInActions.REFRESH_TOKEN,
            });
        }, constants.TIME_REFRESH_TOKEN);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (isAuthenticated) {
            dispatch({ type: NotificationActions.LOAD_USER_NOTIFICATION });
        }
    }, [isAuthenticated]);
    // Google Analysic
    useEffect(() => {
        const handleRouteChange = (url) => {
            GTAG.pageview(url)
            dispatch(AppActions.closeLoading());
            setTimeout(() => {
                window.scroll({
                    top: 0,
                    left: 0,
                });
            }, 0);
        };
        // When the component is mounted, subscribe to router changes
        // and log those page views
        router.events.on('routeChangeComplete', handleRouteChange);

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);
    useEffect(() => {
        const reloadEvent = EventRegister.on(SHOW_LOADING, (isShow) => {
            if(isShow){
                dispatch(AppActions.callLoading());
            }else{
                dispatch(AppActions.closeLoading());
            }
        });
        return () => {
            EventRegister.off(reloadEvent);
        };
    }, []);

    //----------------------------------------------
    // Function
    //----------------------------------------------

    const handleClickOnWrapper = () => {
        dispatch({
            type: MenuActions.CLOSE_SEARCH_INPUT,
        });
    };

    function createMarkup() {
        return {
            __html: `<div class="zalo-chat-widget" data-oaid="2785293697542795629" data-welcome-message="Rất vui khi được hỗ trợ bạn!" data-autopopup="0" data-width="350" data-height="420"></div>`,
        };
    }
    return (
        <>
            <Head>
                <meta
                    property="og:viewport"
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                {/* <link
                    className="spo_css"
                    rel="stylesheet"
                    href="/css/style.css"
                /> */}
                {/* <link
                    className="spo_css"
                    rel="stylesheet"
                    href="/css/sonmbg.css"
                /> */}
                {/* <link
                    className="spo_css"
                    rel="stylesheet"
                    href="/css/chinhvn.css"
                /> */}
                {/* <link
                    className="spo_css"
                    rel="stylesheet"
                    href="/css/signin-signup-responsive.css"
                />
                <link
                    className="spo_css"
                    rel="stylesheet"
                    href="/css/responsive.css"
                /> */}
                {/* <link
                    className="dungnt_css"
                    rel="stylesheet"
                    href="/css/dungnt.css"
                /> */}
                {/* <link
                    className="dungnt_res_css"
                    rel="stylesheet"
                    href="/css/dungnt-responsive.css"
                /> */}
                {/* <link
                    className="kyvd_css"
                    rel="stylesheet"
                    href="/css/kyvd.css"
                /> */}
            </Head>
            <div id="spo-layout">
                <Display>
                    <CartDrawer carts={cartProducts} />
                </Display>
                <TopHeader carts={cartProducts} />
                {/* <Header /> */}
                <div
                    className="pageWrapper"
                    ref={pageWrapper}
                    onClick={handleClickOnWrapper}
                    id="body"
                >
                    <div id="page-content">{props.children}</div>
                </div>
                <Display>
                    <Footer />
                </Display>
                <Display mobile={true}>
                    <FooterMobile />
                </Display>
                <Overlay overlay={overlay} />
                {/* <Preloader loading={loading || loader} /> */}
                <Loader loading={loading || loader} />
                <ModalPickStock
                    show={showPickStock}
                    data={{ currentItem: currentItem }}
                />
                <Alert alert={alert} data={data} />
                <FloatButtonGroup />
                <CommonPopup _key={FIRST_POPUP} />
                <CommonPopup _key={SECOND_POPUP} />
            </div>
        </>
    );
};

export default SpoLayout;
