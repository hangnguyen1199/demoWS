const SignInContainer = dynamic(() => import('@spo/containers/sign-in'), {
    ssr: false,
});
import Head from 'next/head';
import SpoLayout from '@spo/containers/layout/spo-layout';
import Cookies from 'js-cookie';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AuthActions from '../../redux/auth/action';
import constants from '@spo/config/constants';

const SignIn = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        let token = Cookies.get('token');
        if (!_.isNil(token)) {
            dispatch({ type: AuthActions.GET_USER });
        }
    }, []);
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB} Đăng nhập`}</title>
            </Head>
            <SignInContainer />
        </>
    );
};
SignIn.Layout = SpoLayout;
// SignIn.getInitialProps = async (ctx) => {
//     await routeGuard(ctx, 'guest');
//     return { initData: null };
// };
// export async function getServerSideProps(ctx) {
//     return await routeGuard(ctx, 'guest');
// }
export default SignIn;
