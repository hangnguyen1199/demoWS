import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import RecruitmentActions from '@spo/redux/recruitment/action';
import { useEffect } from 'react';
import { routeGuard } from '../../shared/library/helper';
import constants from '@spo/config/constants';
import Head from 'next/head';

const RecruitmentFormContainer = dynamic(() =>
    import('@spo/containers/recruitment/form'),
);

const RecruitmentForm = ({ data }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: RecruitmentActions.LOAD_RECRUITMENT_DETAIL_RESPONSE,
            payload: data,
        });
    }, []);

    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB} Ứng tuyển`}</title>
            </Head>
            <RecruitmentFormContainer />
        </>
    );
  
  
};
RecruitmentForm.Layout = SpoLayout;
export async function getServerSideProps(ctx) {
    // let user = await routeGuard(ctx, 'user-profile');
    // if (user?.redirect) {
    //     return user;
    // }

    const {
        query: { slug },
    } = ctx;
    let url = process.env.API_URL;

    if (!slug) {
        return {
            redirect: {
                destination: '/recruitment',
                permanent: false,
            },
        };
    }

    const data = await axios
        .get(`${url}/news/recruitments/${slug}`)
        .then((res) => res.data)
        .catch((err) => {});

    if (!data) {
        return {
            redirect: {
                destination: '/recruitment',
                permanent: false,
            },
        };
    }
    return {
        props: {
            data,
        },
    };
}
export default RecruitmentForm;
