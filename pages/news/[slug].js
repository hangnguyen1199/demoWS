import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';
import NewsActions from '@spo/redux/news/action';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const NewsDetailContainer = dynamic(() =>
    import('@spo/containers/news/detail'),
);

const NewsDetail = ({ detail }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: NewsActions.LOAD_NEWS_DETAIL_RESPONSE,
            response: detail,
        });
    }, [detail]);
    return <NewsDetailContainer />;
};
NewsDetail.Layout = SpoLayout;
// NewsDetail.getInitialProps = async (context) => {
//     const { query } = context;

//     const detail = await axios
//         .get(`https://api.fmplustest.xyz/api/1.0/news/news/${query?.slug}`)
//         .then((res) => res.data)
//         .catch((err) => {
//             console.log('Error In News Page', err);
//             return {};
//         });
//     return {
//         detail,
//     };
// };

export async function getServerSideProps(ctx) {
    const { query } = ctx;
    let url = process.env.API_URL;
    const detail = await axios
        .get(`${url}/news/news/${query?.slug}`)
        .then((res) => res.data)
        .catch((err) => {
            console.log('Error In News Page', err);
            return {};
        });
    return {
        props: {
            detail,
        },
    };
}
export default NewsDetail;
