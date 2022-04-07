const ProductListTopContainer = dynamic(
    () => import('@spo/containers/product-list-top'),
    { ssr: true },
);
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import ProductListActions from '@spo/redux/product-list/action';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CommonActions from '@spo/redux/common/action';

const ProductListTop = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch({
            type: ProductListActions.LOAD_PRODUCT_LIST_WITH_TYPE_START,
            data: {
                data: router.query,
                Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_SEARCH_TOP,
            },
        });

        dispatch({
            type: CommonActions.LOAD_CATEGORY_MASTER_BY_GENDER,
            data: {
                Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_SEARCH_TOP,
                Gender: router.query[constants.ROUTER_NAME.GENDER]
            },
        });
        dispatch({
            type: CommonActions.LOAD_SIZE,
            data: {
                Gender: router.query[constants.ROUTER_NAME.GENDER],
                CategoryId: router.query[constants.ROUTER_NAME.CATEGORY]
            }
        });
    }, [router.query]);

    return (
        <>
            <Head>
                <title>Danh sách sản phẩm tìm kiếm hàng đầu</title>
                <meta name="keywords" content={'Danh sách sản phẩm tìm kiếm hàng đầu'}></meta>
                <meta property="og:title" content={`Danh sách sản phẩm tìm kiếm hàng đầu`} />
                <meta property="og:type" content="product"></meta>
            </Head>
            <ProductListTopContainer />
        </>
    );
};

ProductListTop.Layout = SpoLayout;
export default ProductListTop;
