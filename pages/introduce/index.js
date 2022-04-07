const IntroduceContainer = dynamic(
    () => import('@spo/containers/introduce'),
    {
        ssr: false,
    },
);
import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import SpoLayout from '@spo/containers/layout/spo-layout';
import constants from '@spo/config/constants';
import axios from 'axios';
  
const Introduce = (props) => {
    const { item } = props;
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB  }Giới thiệu`}</title>
            </Head>
            <IntroduceContainer
                content={item?.dataIntro?.FMPlusIntro}
            />
        </>
    );
};
  
Introduce.Layout = SpoLayout;
export async function getServerSideProps(ctx) {
    let item = {};
    let errorCode = false;
    try {
        let url = process.env.API_URL;
        let dataIntro = await axios({
            method: 'GET',
            url: `${url}/master/settings/fm-plus-intro`,
        });
        item.dataIntro = dataIntro.data;
    } catch (error) {
        errorCode = 404;
    }
    return {props:{ errorCode, item: item }};
}
export default Introduce;
  