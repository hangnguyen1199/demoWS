const WalletContainer = dynamic(() => import('@spo/containers/wallet'), {
    ssr: true,
});
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { routeGuard } from '../../shared/library/helper';

const Wallet = (props) => {
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB  }Ví FM`}</title>
                <meta name="keywords" content='Ví FM'></meta>
                <meta property="og:title" content={`Ví FM`} />
                <meta property="og:type" content="Ví FM"></meta>
            </Head>
            <WalletContainer />
        </>
    );
};

Wallet.Layout = SpoLayout;

export async function getServerSideProps(ctx) {
    return await routeGuard(ctx, 'user');
}
export default Wallet;
