const SizeGuideContainer = dynamic(() => import('@spo/containers/size-guide'), {
    ssr: false,
});
import React from 'react'
import Head from 'next/head';
import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';
import constants from '@spo/config/constants';

function SizeGuide() {
    return (
        <>
            <Head>
                <title>
                    {`${constants.TITLE_TAB  }Hướng dẫn chọn size`}
                </title>
            </Head>
            <SizeGuideContainer />
        </>
    )
}

SizeGuide.Layout = SpoLayout;
export default SizeGuide;