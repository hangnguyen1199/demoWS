import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '@spo/redux/store';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
//import withReduxStore from '@spo/redux/with-redux-store';
import Head from 'next/head';

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache();
const Noop = ({ children }) => children;

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        // Get the `locale` and `messages` from the request object on the server.
        // In the browser, use the same values that the server serialized.
        const { req } = ctx;
        const { locale, messages } = req;

        return { pageProps, locale, messages };
    }
    render() {
        const { Component, pageProps, store, locale, messages } = this.props;
        const Layout = Component.Layout || Noop;
        const intl = createIntl(
            {
                locale,
                messages,
            },
            cache,
        );
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
                    <meta
                        property="og:image"
                        content="/images/icon/logo_fm_2.svg"
                    />
                    <meta property="og:title" content="Outfiz.vn" />
                    <meta property="og:description" content={constants.TITLE} />
                    <link
                        rel="shortcut icon"
                        href="/images/icon/logo_fm_2.svg"
                    />
                    <link rel="stylesheet" href="/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="/css/common.css" />
                    <link
                        className=""
                        rel="stylesheet"
                        href="/css/plugins.css"
                    />
                    <script
                        src="https://kit.fontawesome.com/04b6adbd6a.js"
                        crossOrigin="anonymous"></script>
                </Head>

                <Provider store={store}>
                    <RawIntlProvider value={intl}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </RawIntlProvider>
                </Provider>
            </>
        );
    }
}
export default withRedux(initStore)(MyApp);
//export default withReduxStore(MyApp);
