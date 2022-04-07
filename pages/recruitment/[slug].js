import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import RecruitmentActions from '@spo/redux/recruitment/action';
import SpoLayout from '@spo/containers/layout/spo-layout';

const RecruitmentDetailContainer = dynamic(() =>
    import('@spo/containers/recruitment/detail'),
);

const RecruitmentDetail = ({ data, list, slides }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: RecruitmentActions.LOAD_RECRUITMENT_DETAIL_RESPONSE,
            payload: data,
        });
        dispatch({
            type: RecruitmentActions.LOAD_RECRUITMENT_LIST_RESPONSE,
            payload: list,
        });
    }, []);
    return <RecruitmentDetailContainer />;
};
RecruitmentDetail.Layout = SpoLayout;
// RecruitmentDetail.getInitialProps = async (context) => {
//     const { query } = context;
//     let url = process.env.API_URL;
//     const data = await axios
//         .get(`${url}/news/recruitments/${query?.slug}`)
//         .then((res) => res.data)
//         .catch((err) => {});
//     const list = await axios
//         .get(`${url}/news/recruitments/`)
//         .then((res) => res.data)
//         .catch((err) => {});
//     return {
//         data,
//         list,
//     };
// };

export async function getServerSideProps(ctx) {
    const { query } = ctx;
    let url = process.env.API_URL;
    const data = await axios
        .get(`${url}/news/recruitments/${query?.slug}`)
        .then((res) => res.data)
        .catch((err) => {});
    const list = await axios
        .get(`${url}/news/recruitments/`)
        .then((res) => res.data)
        .catch((err) => {});
    return {
        props: {
            data,
            list,
        },
    };
}
export default RecruitmentDetail;
