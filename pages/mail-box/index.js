const MailBoxContainer = dynamic(() => import('@spo/containers/mail-box'), {
    ssr: true,
});
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import MailBoxActions from '../../redux/mail-box/action';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { routeGuard } from '../../shared/library/helper';

const MailBox = (props) => {
    const { item, errorCode } = props;
    const dispatch = useDispatch();

    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB  }Hộp thư`}</title>
                <meta name="keywords" content='Hộp thư'></meta>
                <meta property="og:title" content={`Hộp thư`} />
                <meta property="og:type" content="Hộp thư"></meta>
            </Head>
            <MailBoxContainer />
        </>
    );
};

MailBox.Layout = SpoLayout;
// MailBox.getInitialProps = async (ctx) => {
//     let item = null;
//     let errorCode = false;
//     try {
//         process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
//         let url = constants.BASE_API_URL;
//         if (typeof window == 'undefined') {
//             url = constants.LOCAL_HOST;
//         }
//     } catch (error) {
//         errorCode = 404;
//     }
//     return { errorCode, item: item };
// };

export async function getServerSideProps(ctx) {
    return await routeGuard(ctx, 'user');
}
export default MailBox;
