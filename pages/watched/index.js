const ProductListWatchedContainer = dynamic(
    () => import('@spo/containers/product-list-watched'),
    { ssr: true },
);
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProducListWatchedActions from '@spo/redux/product-list-watched/action';
import { routeGuard } from '../../shared/library/helper';
import { useRouter } from 'next/router';

const ProductListWatched = (props) => {
    const dispatch = useDispatch();
    const router=useRouter();
    useEffect(() => {
        let param = {};
        param['Limit'] = constants.PAGINATION.LIMIT;
        param['Offset'] = router.query?.Page ? ((router.query?.Page)-1)*constants.PAGINATION.LIMIT : constants.PAGINATION.OFFSET;
        dispatch({
            type: ProducListWatchedActions.LOAD_WATCHED_PRODUCT_LIST,
            data: { data: param },
        });
    }, [router.query]);

    return (
        <>
            <Head>
                <title>Danh sách sản phẩm đã xem</title>
                <meta name="keywords" content={'Danh sách sản phẩm đã xem'}></meta>
                <meta property="og:title" content={`Danh sách sản phẩm đã xem`} />
                <meta property="og:type" content="product"></meta>
            </Head>
            <ProductListWatchedContainer />
        </>
    );
};

ProductListWatched.Layout = SpoLayout;
// ProductListWatched.getInitialProps = async (ctx) => {
//     await routeGuard(ctx, "user")
//     return { initData: null }
// }
export async function getServerSideProps(ctx) {
    return await routeGuard(ctx, "user")
}
export default ProductListWatched;
