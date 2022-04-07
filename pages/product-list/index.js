const ProductListContainer = dynamic(
    () => import('@spo/containers/product-list-with-category'),
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
import ProductListActions from '@spo/redux/product-list/action';

const ProductList = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: ProductListActions.LOAD_PRODUCT_LIST_WITH_TYPE_START,
            data: {
                data: router.query,
            },
        });
    }, [router.query]);


    return (
        <>
            <Head>
                <title>Danh sách sản phẩm</title>
                <meta name="keywords" content={'Danh sách sản phẩm'}></meta>
                <meta property="og:title" content={`Danh sách sản phẩm`} />
                <meta property="og:type" content="product"></meta>
            </Head>
            <ProductListContainer />
        </>
    );
};

ProductList.Layout = SpoLayout;
export default ProductList;
