import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import constants from '@spo/config/constants';

const OrderSuccessContainer = dynamic(() => import('@spo/containers/order-success'), {
    ssr: false,

});
import SpoLayout from '@spo/containers/layout/spo-layout';

function OrderSuccess(props) {
    return (
        <>
            <Head>
                <title>{`Thông tin đơn hàng`}</title>
            </Head>
            <OrderSuccessContainer />
        </>
    );
}
OrderSuccess.Layout = SpoLayout;
export default OrderSuccess;
