const ProductListMatBeYouCareContainer = dynamic(
    () => import('@spo/containers/product-list-may-be-you-care'),
    { ssr: true },
);
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProducListTypeActions from '@spo/redux/product-list/action';
import { useRouter } from 'next/router';

const ProductListMayBeYouCare = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch({
            type: ProducListTypeActions.LOAD_PRODUCT_LIST_WITH_TYPE_START,
            data: {
                data: router.query,
                Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_CARE
            },
        });
    }, [router.query]);
    return (
        <>
            <Head>
                <title>Có thể bạn quan tâm</title>
                <meta name="keywords" content={'Có thể bạn quan tâm'}></meta>
                <meta property="og:title" content={`Có thể bạn quan tâm`} />
                <meta property="og:type" content="product"></meta>
            </Head>
            <ProductListMatBeYouCareContainer />
        </>
    );
};

ProductListMayBeYouCare.Layout = SpoLayout;
export default ProductListMayBeYouCare;
