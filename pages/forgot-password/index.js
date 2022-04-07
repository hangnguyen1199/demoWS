// const SpoLayout = dynamic(() => import('@spo/containers/layout/spo-layout'), {
//     ssr: false,
// });
const ForgotPasswordContainer = dynamic(
    () => import('@spo/containers/forgot-password'),
    { ssr: false },
);
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import { useDispatch } from 'react-redux';
import { routeGuard } from '../../shared/library/helper';
import Header from '@spo/components/spo-layout/header';

const ForgotPassword = (props) => {
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch({ type: UserLoggedActions.LOGOUT });
    // }, [])
    return (
        <>
            <ForgotPasswordContainer />
        </>
    );
};
ForgotPassword.Layout = SpoLayout;
// ForgotPassword.getInitialProps = async (ctx) => {
//     await routeGuard(ctx, "guest")
//     return { initData: null }
// }

export async function getServerSideProps(ctx) {
    await routeGuard(ctx, "guest")
    return {
        props: { initData: null },
    };
}

export default ForgotPassword;
