const ProductListGoldenHourContainer = dynamic(
    () => import('@spo/containers/product-list-golden-hour'),
    { ssr: true },
);
import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import constants from '@spo/config/constants';
import ProductListActions from '@spo/redux/product-list/action';

const ProductListGoldenHour = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        let params = {
            ...router.query,
        }
        params[constants.ROUTER_NAME.PROMOTION] = constants.PRODUCT_TYPE.GOLDEN_HOUR
        dispatch({
            type: ProductListActions.LOAD_PRODUCT_LIST_WITH_SALE_TYPE_START,
            data: {
                data: params
            },
        });
    }, [router.query]);
    return (
        <>
            <Head>
                <title>Danh sách sản giờ vàng</title>
                <meta name="keywords" content={'Danh sách sản giờ vàng'}></meta>
                <meta property="og:title" content={`Danh sách sản giờ vàng`} />
                <meta property="og:type" content="product"></meta>
            </Head>
            <ProductListGoldenHourContainer />
        </>
    );
};

ProductListGoldenHour.Layout = SpoLayout;
export default ProductListGoldenHour;
