const ItemDetailContainer = dynamic(
    () => import('@spo/containers/item-detail'),
    { ssr: true },
);
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import { decodeJWT } from '@spo/lib/helper';
import ItemDetailActions from '@spo/redux/item-detail/action';
import axios from 'axios';
import Cookies from 'js-cookie';
import serverCookies from 'next-cookies';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Error from '../_error';
import AppConfig from './../../shared/config/AppConfig';

const Item = (props) => {
    const { item, errorCode } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        if (item) {
            dispatch({
                type: ItemDetailActions.LOAD_PRODUCT_DETAIL_SUCCESS,
                data: item,
            });
            let paramRelative = {};
            paramRelative.Limit = 12;
            paramRelative.Type = 8;
            dispatch({
                type: ItemDetailActions.LOAD_RELATIVE_PRODUCT,
                data: paramRelative,
            });
        }
    }, [item]);
    if (errorCode) {
        return <Error statusCode={errorCode} />;
    }
    return (
        <>
            <Head>
                <title>{constants.TITLE_TAB + item?.Name}</title>
                <meta name="keywords" content={item?.Name}></meta>
                <meta
                    property="og:image"
                    content={`${item?.Images[0]?.Thumb}`}
                />
                <meta property="og:title" content={`${item?.Name}`} />
                <meta property="og:type" content="product"></meta>
            </Head>
            <ItemDetailContainer onClickChat={() => {
                // if(FB?.CustomerChat){
                //     FB.CustomerChat.showDialog();
                // }
            }}/>        
        </>
    );
};

Item.Layout = SpoLayout;
// Item.getInitialProps = async (ctx) => {
//     let item = null;
//     let errorCode = false;
//     try {
//         let url = process.env.API_URL;
//         const { token } = serverCookies(ctx);
//         const jwtDecodeValue = decodeJWT(token);
//         // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
//         // axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
//         if (!token || jwtDecodeValue.isExpired) {
//             Cookies.remove('token');
//         }
//         let resDetail = await axios({
//             method: 'GET',
//             url: `${url}/online/products/${ctx.query.slug}`,
//         });
//         if (!resDetail?.data?.Id) {
//             errorCode = 404;
//             return { errorCode };
//         }
//         let resInfo = await axios({
//             method: 'GET',
//             url: `${url}/online/products/product-info`,
//             params: { ProductId: resDetail?.data?.Id },
//         });
//         if (!resDetail.data && !resInfo.data) {
//             errorCode = !resDetail.status;
//         } else {
//             item = resDetail.data;
//             item.info = resInfo.data;
//         }
//     } catch (error) {
//         errorCode = 404;
//     }
//     return { errorCode, item: item };
// };
export async function getServerSideProps(ctx) {
    let item = null;
    let errorCode = false;
    try {
        let url = process.env.API_URL;
        const { token } = serverCookies(ctx);
        const jwtDecodeValue = decodeJWT(token);
        // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
        // axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        if (!token || jwtDecodeValue.isExpired) {
            Cookies.remove('token');
            AppConfig.ACCESS_TOKEN = "";
        }
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        AppConfig.ACCESS_TOKEN = token;
        let resDetail = await axios({
            method: 'GET',
            url: `${url}/online/products/${ctx.query.slug}`,
        });
        if (!resDetail?.data?.Id) {
            errorCode = 404;
            return { errorCode };
        }
        let resInfo = await axios({
            method: 'GET',
            url: `${url}/online/products/product-info`,
            params: { ProductId: resDetail?.data?.Id },
        });
        if (!resDetail.data && !resInfo.data) {
            errorCode = !resDetail.status;
        } else {
            item = resDetail.data;
            item.info = resInfo.data;
        }
    } catch (error) {
        errorCode = 404;
    }
    return { props: { errorCode, item: item } };
}
export default Item;
