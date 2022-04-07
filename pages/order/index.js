const OrderContainer = dynamic(() => import('@spo/containers/order'), {
    ssr: false,
});
import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';
import constants from '@spo/config/constants';
import { routeGuard } from '../../shared/library/helper';
import PageList from '../../shared/config/PageList';
import OrderHeader from '../../shared/components/spo-layout/order-header';

const Order = () => {

    useEffect(() => {
        // catch event click button back on browser
        window.addEventListener('popstate', (event) => {
            const currentURL = window.location.pathname;
            if (currentURL == PageList.ORDER.INDEX || currentURL == PageList.ORDER.SERVER) {
                window.location.pathname = PageList.CART.SERVER;
            }
        });
    }, []);

    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB}Mua hàng`}</title>
            </Head>
            <OrderContainer />
        </>
    );
};

Order.Layout = SpoLayout;
Order.TopHeader = OrderHeader
// export async function getServerSideProps (ctx) {
//     return await routeGuard(ctx, PageList.ORDER.SERVER);
// }
export default Order;
