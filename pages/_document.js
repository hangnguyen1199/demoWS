import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import constants from '@spo/config/constants';

class SpoDocument extends Document {
    render() {
        return (
            <Html className="scroll-overlay" lang="vi">
                <Head>
                    
                </Head>
                <body className="template-index belle template-index-belle">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default SpoDocument;
