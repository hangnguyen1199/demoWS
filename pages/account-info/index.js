import SpoLayout from '@spo/containers/layout/spo-layout';
import { Cookies } from 'js-cookie';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { routeGuard } from '../../shared/library/helper';
import constants from '@spo/config/constants';
import Head from 'next/head';

const AccountInfoContainer = dynamic(() =>
    import('@spo/containers/account-info'),
);

const AccountInfo = (props) => {
    return(
        <>
            <Head>
                <title>{`${constants.TITLE_TAB} Thông tin cá nhân`}</title>
            </Head>
            <AccountInfoContainer />;
        </>
    );
};

AccountInfo.Layout = SpoLayout;
// AccountInfo.getInitialProps = async (context) => {
//     await routeGuard(context, 'user-profile');
//     return {};
// };

export async function getServerSideProps(ctx) {
    let res = await routeGuard(ctx, 'user-profile');
    return res
}

export default AccountInfo;
