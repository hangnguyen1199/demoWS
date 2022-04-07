const CartContainer = dynamic(() => import('@spo/containers/cart'), {
    ssr: false,
});
import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import SpoLayout from '@spo/containers/layout/spo-layout';
import constants from '@spo/config/constants';
import { routeGuard } from '../../shared/library/helper';

const Cart = () => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB}Giỏ hàng`}</title>
            </Head>
            <CartContainer />
        </>
    );
};

Cart.Layout = SpoLayout;
// export async function getServerSideProps(ctx) {
//     return await routeGuard(ctx, 'user');
// }
export default Cart;
