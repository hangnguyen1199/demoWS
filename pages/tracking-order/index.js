const SearchContainer = dynamic(
    () => import('@spo/containers/tracking-order/tracking-order'),
    { ssr: true },
);
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { routeGuard } from '../../shared/library/helper';
import PageList from './../../shared/config/PageList';

const TrackingOrder = (props) => {
    return (
        <>
            <Head>
                <title>Tìm kiếm đơn hàng</title>
                <meta name="keywords" content={'Tìm kiếm đơn hàng'}></meta>
                <meta property="og:title" content={`Tìm kiếm đơn hàng`} />
                <meta property="og:type" content="product"></meta>
            </Head>
           <SearchContainer />
        </>
    );
};

TrackingOrder.Layout = SpoLayout;
export async function getServerSideProps (ctx) {
    return await routeGuard(ctx, PageList.TRACKING_ORDER.SERVER);
}
export default TrackingOrder;
