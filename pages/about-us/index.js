const AboutUsContainer = dynamic(
    () => import('@spo/containers/about-us'),
    {
        ssr: true,
    },
);
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import AboutUsActions from '@spo/redux/about-us/action';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getShortDescription } from '../../shared/library/helper';
import Error from '../_error';

const ProductList = (props) => {
    const { item, errorCode } = props;
    const dispatch = useDispatch();
    const router = useRouter();
    const pid = router?.query?.slug;

    let newsParam = {};
    newsParam['Limit'] = 4;
    newsParam['Offset'] = 0;
    useEffect(() => {
        dispatch({
            type: 'LOAD_NEWS',
            data: { data: newsParam },
        });
    });

    return (
        <>
            <Head>
                <title>
                    {constants.TITLE_TAB + item?.item_name}
                </title>
                <meta
                    name="keywords"
                    content={item?.item_name}></meta>
                <meta
                    property="og:image"
                    content={`${item?.images[0].image_s}`}
                />
                <meta
                    property="og:title"
                    content={`${item?.item_name}`}
                />
                <meta
                    property="og:type"
                    content="product"></meta>
            </Head>
            <AboutUsContainer />
        </>
    );
};

ProductList.Layout = SpoLayout;
ProductList.getInitialProps = async (ctx) => {
    let item = null;
    let errorCode = false;
    try {
        process.env[
            'NODE_TLS_REJECT_UNAUTHORIZED'
        ] = 0;
        let url = constants.BASE_API_URL;
        if (typeof window == 'undefined') {
            url = constants.LOCAL_HOST;
        }
    } catch (error) {
        errorCode = 404;
    }
    return { errorCode, item: item };
};
export default ProductList;
