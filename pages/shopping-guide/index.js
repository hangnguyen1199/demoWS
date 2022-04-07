const ShoppingGuideContainer = dynamic(() => import('@spo/containers/shopping-guide'), {
    ssr: false,
});
import React from 'react'
import Head from 'next/head';
import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';
import constants from '@spo/config/constants';

function ShoppingGuide() {
    return (
        <>
            <Head>
                <title>
                    {`${constants.TITLE_TAB  }Hướng dẫn mua hàng`}
                </title>
            </Head>
            <ShoppingGuideContainer />
        </>
    )
}

ShoppingGuide.Layout = SpoLayout;
export default ShoppingGuide;