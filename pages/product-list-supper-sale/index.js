const ProductListSupperSaleContainer = dynamic(
    () => import('@spo/containers/product-list-supper-sale'),
    { ssr: true },
);
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductListActions from '@spo/redux/product-list/action';
import { useRouter } from 'next/router';

const ProductListSupperSale = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        let params = {
            ...router.query
        };
        params[constants.ROUTER_NAME.PROMOTION] = constants.PRODUCT_TYPE.SUPPER_SALE
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
                <title>Danh sách sản phẩm siêu sale</title>
                <meta name="keywords" content={'Danh sách sản phẩm siêu sale'}></meta>
                <meta property="og:title" content={`Danh sách sản phẩm siêu sale`} />
                <meta property="og:type" content="product"></meta>
            </Head>
            <ProductListSupperSaleContainer />
        </>
    );
};

ProductListSupperSale.Layout = SpoLayout;
export default ProductListSupperSale;
