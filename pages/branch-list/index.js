const BranchListContainer = dynamic(
    () => import('@spo/containers/branch-list'),
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

const BranchList = () => {
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB  }Hệ thống cửa hàng`}</title>
            </Head>
            <BranchListContainer />
        </>
    );
};

BranchList.Layout = SpoLayout;

export default BranchList;
