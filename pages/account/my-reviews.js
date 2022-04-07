const MyReviewsContainer = dynamic(() => import('@spo/containers/my-reviews'), {
    ssr: false,
});
import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';
import constants from '@spo/config/constants';
import { routeGuard } from '../../shared/library/helper';

const MyReviews = () => {
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB  }Đánh giá của tôi`}</title>
            </Head>
            <MyReviewsContainer />
        </>
    );
};

MyReviews.Layout = SpoLayout;
export async function getServerSideProps(ctx) {
    return await routeGuard(ctx, 'user');
}
export default MyReviews;
