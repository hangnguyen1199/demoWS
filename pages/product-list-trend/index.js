const ProductListTrendContainer = dynamic(
    () => import('@spo/containers/product-list-trend'),
    { ssr: true },
);
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductListActions from '@spo/redux/product-list/action';
import { useRouter } from 'next/router';

const ProductListTrend = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: ProductListActions.LOAD_PRODUCT_LIST_WITH_TYPE_START,
            data: {
                data: router.query,
                Type: constants.PRODUCT_TYPE.TREND,
            },
        });
    }, [router.query]);


    return (
        <>
            <Head>
                <title>Danh sách sản phẩm mới</title>
                <meta name="keywords" content={'Danh sách sản phẩm mới'}></meta>
                <meta property="og:title" content={`Danh sách sản phẩm mới`} />
                <meta property="og:type" content="product"></meta>
            </Head>
            <ProductListTrendContainer />
        </>
    );
};

ProductListTrend.Layout = SpoLayout;
export default ProductListTrend;
