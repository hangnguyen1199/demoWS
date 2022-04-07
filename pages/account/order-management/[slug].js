const OrderDetailContainer = dynamic(
    () => import('@spo/containers/order-detail'),
    { ssr: false },
);
import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';
import React from 'react';
import { useRouter } from 'next/router';
import constants from '@spo/config/constants';
import Head from 'next/head';
import { routeGuard } from '../../../shared/library/helper';

const Order = (props) => {
    const router = useRouter();
    const orderId = router?.query?.slug;
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB} Chi tiết đơn hàng`}</title>
            </Head>
            <OrderDetailContainer orderId={orderId}/>
        </>
    );
};
Order.Layout = SpoLayout;
export async function getServerSideProps(ctx) {
    return await routeGuard(ctx, 'user');
}
export default Order;
