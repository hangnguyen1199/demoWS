const ChallengeContainer = dynamic(() => import('@spo/containers/challenge'), {
    ssr: true,
});
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import { routeGuard } from '../../shared/library/helper';

const Challenge = (props) => {
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB  }Thử thách`}</title>
                <meta name="keywords" content='Thử thách'></meta>
                <meta property="og:title" content={`Thử thách`} />
                <meta property="og:type" content="Thử thách"></meta>
            </Head>
            <ChallengeContainer />
        </>
    );
};

Challenge.Layout = SpoLayout;

export async function getServerSideProps(ctx) {
    return await routeGuard(ctx, 'user');
}
export default Challenge;
