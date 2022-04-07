const SearchContainer = dynamic(
    () => import('@spo/containers/search'),
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
import ProducListCategoryActions from '@spo/redux/product-list/action';

const Search = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const gender = constants.GENDER_SLUG[router?.query?.gt];
    const category = router?.query?.sp;

    useEffect(() => {

        if(router.query?.tab && router.query?.tab != '1'){
            return;
        };
        dispatch({
            type: ProducListCategoryActions.LOAD_PRODUCT_LIST_WITH_TYPE_START,
            data: { data: router.query },
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
            <SearchContainer gender={gender} category={category} />
        </>
    );
};

Search.Layout = SpoLayout;
export default Search;
