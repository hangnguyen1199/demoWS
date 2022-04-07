const HomeContainer = dynamic(() => import('@spo/containers/home'), {
    ssr: true,
});
// const SpoLayout = dynamic(() => import('@spo/containers/layout/spo-layout'), {
//     ssr: false,

// });
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';

const Home = () => {
    return (
        <>
            <Head>
                <title>{constants.TITLE}</title>
            </Head>
            <HomeContainer />
        </>
    );
};

Home.Layout = SpoLayout;

export default Home;
