import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class SpoDocument extends Document {
    static async getInitialProps(ctx) {
        const props = await super.getInitialProps(ctx);
        const {
            req: { locale, localeDataScript },
        } = ctx;
        return {
            ...props,
            locale,
            localeDataScript,
        };
    }

    render() {
        // Polyfill Intl API for older browsers
        const polyfill = `https://cdn.polyfill.io/v3/polyfill.min.js?features=Intl.~locale.${this.props.locale}`;
        return (
            <Html>
                <Head>
                    
                </Head>
                <body className="template-index belle template-index-belle">
                    <Main />
                    <script src={polyfill} />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: this.props.localeDataScript,
                        }}
                    />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default SpoDocument;
