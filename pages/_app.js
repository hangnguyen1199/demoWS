import constants from '@spo/config/constants';
import ConnectedIntlProvider from '@spo/config/translation/ConnectedIntlProvider';
import { initStore } from '@spo/redux/store';
// import withReduxStore from '@spo/redux/with-redux-store';
import axios from 'axios';
import Cookies from 'js-cookie';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import AppConfig from '../shared/config/AppConfig';
import Utils from '../shared/utils/utils';
import { POPUP_ERROR_TYPE } from './../shared/utils/EventRegister';
import '../public/css/bootstrap.min.css';
import '../public/css/common.css';
import '../public/css/style.css';
// import '../public/css/plugins.css'
import '../public/css/responsive.css';
import '../public/css/order/order.css';
import '../public/css/account/my-reviews.css';
import '../public/css/branch-list/branch-list.css';
import '../public/css/challenge/challenge.css';
import '../public/css/flipclock.css';

import '../public/css/dungnt.css';
import '../public/css/dungnt-responsive.css';
import '../public/css/sonmbg.css';
import '../public/css/chinhvn.css';
import '../public/css/kyvd.css';
import '../public/css/signin-signup-responsive.css';
import PageList from '../shared/config/PageList';
import Top from '../shared/components/spo-layout/top';

const REDIRECT_TO_APP = process.env.REDIRECT_TO_APP;
const APP_ANDROID = process.env.APP_ANDROID;
const APP_IOS = process.env.APP_IOS;
const API_KEY = process.env.API_KEY;
// import '@spo/public/css/bootstrap.min.css';
// import '@spo/public/css/common.css';
const Noop = ({ children }) => children;
// Add a request interceptor

axios.interceptors.request.use(
    function (config) {
        config.headers['x-requestid'] = uuidv4();
        config.headers['x-apikey'] = API_KEY;
        config.headers['x-fromWeb'] = true;
        if (typeof window !== 'undefined') {
            config.headers.Authorization = `Bearer ${AppConfig.ACCESS_TOKEN}`;
        }
        // Do something before request is sent
        return config;
    },
    function (error) {
        if (typeof window !== 'undefined') {
            // console.log("interceptors: ", error);
        }
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Nếu status code == 401
        if (response?.status == 401) {
            // Cookies.remove('token');
        }
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        if (typeof window !== 'undefined') {
            // console.log("interceptors2: ", error);
        } else if (error?.response?.status == 401) {
            return Promise.reject(error);
        }
        // Nếu gọi auth/me trả về lỗi 401 thì xóa token
        if (
            error?.response?.status == 401 ||
            error?.status == 401
            // && error.response.config.url.includes('auth/user')
        ) {
            Utils.alertPopup(
                'Phiên đăng nhập đã hết hiệu lực. Quý khách vui lòng đăng nhập lại !'
            );
            Cookies.remove('token');
            AppConfig.ACCESS_TOKEN = '';
        }

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error?.response ?? error);
    }
);
class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const { req } = ctx;
        let isAndroid =
            (req ? ctx.req.headers['user-agent'] : navigator.userAgent)
                .toLowerCase()
                .indexOf('android') > -1;
        let isIOS =
            (req ? ctx.req.headers['user-agent'] : navigator.userAgent)
                .toLowerCase()
                .indexOf('iphone') > -1;
        // Handle for route order
        if (
            req?.url == PageList.ORDER.INDEX ||
            req?.url == PageList.ORDER.SERVER
        ) {
            if (ctx.res && typeof ctx.res.writeHead == 'function') {
                ctx.res.writeHead(302, {
                    Location: PageList.CART.SERVER,
                });
                ctx.res.end();
            }
        }
        return { isAndroid, isIOS };
    }

    componentDidMount() {
        const token_header = Cookies.get('token') ?? '';
        AppConfig.ACCESS_TOKEN = token_header;
        localStorage.setItem('isAndroid', this.props.isAndroid);
        localStorage.setItem('isIOS', this.props.isIOS);
        // axios.defaults.headers.common = {
        //     Authorization: `Bearer ${token_header}`,
        // };
        // const { isAndroid, isIOS } = this.props;
        // if (REDIRECT_TO_APP) {
        //     if(isAndroid){
        //         window.location.href = APP_ANDROID;
        //     }
        //     if(isIOS){
        //         window.location.href = APP_IOS;
        //     }
        // }
        AppConfig.APP_LOGO = localStorage.getItem('AppLogo');
        AppConfig.APP_HEADER_BG_COLOR =
            localStorage.getItem('AppHeaderBgColor');
        AppConfig.APP_HEADER_TEXT_COLOR =
            localStorage.getItem('AppHeaderTextColor');
        AppConfig.APP_CART_BADGE_BG_COLOR = localStorage.getItem(
            'AppCartBadgeBgColor'
        );
        AppConfig.APP_CART_BADGE_TEXT_COLOR = localStorage.getItem(
            'AppCartBadgeTextColor'
        );
        AppConfig.APP_VERSION = localStorage.getItem('AppVersion');
    }

    render() {
        const { Component, pageProps, store, isAndroid, isIOS } = this.props;
        const Layout = Component.Layout || Noop;
        const TopHeader = Component.TopHeader || Top;
        return (
            <>
                <Head>
                    <meta
                        httpEquiv="Content-Type"
                        content="text/html; charset=utf-8"
                    />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta
                        property="og:viewport"
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta property="og:image" content={AppConfig.APP_LOGO} />
                    <meta name="image" content={AppConfig.APP_LOGO} />
                    <meta property="og:title" content={constants.TITLE} />
                    <meta name="title" content={constants.TITLE} />
                    <meta property="og:description" content={constants.TITLE} />
                    <meta name="description" content={constants.TITLE} />
                    <meta name="robots" content="noodp,index,follow" />
                    <meta name="revisit-after" content="1 days" />
                    <meta httpEquiv="content-language" content="vi" />
                    <link
                        rel="shortcut icon"
                        href={AppConfig.APP_FAVICON}
                        type="image/x-icon"
                    />
                    {/* <link
                        rel="preload"
                        as="style"
                        href="/css/bootstrap.min.css"></link>
                    <link
                        rel="preload"
                        as="style"
                        href="/css/common.css"></link>
                    <link
                        rel="preload"
                        as="style"
                        href="/css/plugins.css"></link>
                    <link rel="preload" as="style" href="/css/style.css"></link> */}
                    {/* <link
                        rel="preload"
                        as="style"
                        href="/css/sonmbg.css"></link> */}
                    {/* <link
                        rel="preload"
                        as="style"
                        href="/css/responsive.css"></link>
                    <link rel="stylesheet" href="/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="/css/common.css" /> */}
                    <link
                        className=""
                        rel="stylesheet"
                        href="/css/plugins.css"
                    />
                    {/* <link
                        className=""
                        rel="stylesheet"
                        href="/css/order/order.css"
                    /> */}
                    {/* <link
                        className=""
                        rel="stylesheet"
                        href="/css/account/my-reviews.css"
                    /> */}
                    {/* <link
                        className=""
                        rel="stylesheet"
                        href="/css/branch-list/branch-list.css"
                    />
                    <link
                        className=""
                        rel="stylesheet"
                        href="/css/challenge/challenge.css"
                    />
                    <link
                        className=""
                        rel="stylesheet"
                        href="/css/flipclock.css"
                    /> */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.GA_ID}', {
                                page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />
                    <script
                        defer
                        type="text/javascript"
                        src={`https://www.google.com/recaptcha/api.js?render=${AppConfig.CAPTCHA_SITE_KEY}`}
                        id="recaptcha-key"
                        gapi_processed="true"
                    ></script>
                    <script
                        defer
                        type="text/javascript"
                        src={`/js/setting.js`}
                        id="setting"
                    ></script>
                    <script
                        defer
                        type="text/javascript"
                        src={`/js/flipclock.min.js`}
                        id="clock"
                    ></script>
                    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
                </Head>
                <Provider store={store}>
                    <ConnectedIntlProvider
                        locale={this.props.router.query.language || 'vi-vn'}
                    >
                        {/* {REDIRECT_TO_APP && (isAndroid || isIOS) ?
                            <div className="download-app">
                                {isAndroid ?
                                    <a href={APP_ANDROID} style={{display:'inline-block'}}>
                                        <img src="/images/footer/google-play.png" alt="FM Plus-Android" width={300}/>
                                    </a> :
                                    <a href={APP_IOS} style={{display:'inline-block'}}>
                                        <img src="/images/footer/apple-store.png" alt="FM Plus-IOS" width={300}/>
                                    </a>
                                }
                            </div> :
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        } */}
                        <Layout TopHeader={TopHeader}>
                            <Component {...pageProps} />
                        </Layout>
                    </ConnectedIntlProvider>
                </Provider>
            </>
        );
    }
}
export default withRedux(initStore)(MyApp);
//export default withReduxStore(MyApp);
