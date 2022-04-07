import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';
import { routeGuard } from '@spo/lib/helper';
import constants from '@spo/config/constants';
import Head from 'next/head';

const OrderManagementContainer = dynamic(() => import('@spo/containers/account/order-management'), {
    ssr: false,
});

const OrderManagement = () => {
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB} Quản lý đơn hàng`}</title>
            </Head>
            <OrderManagementContainer />
        </>
    );
};
OrderManagement.Layout = SpoLayout;
export async function getServerSideProps(ctx) {
    return await routeGuard(ctx, 'user');
}
export default OrderManagement;
