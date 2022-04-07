import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Actions from '@spo/redux/promotion/action';

const PromotionContainer = dynamic(() =>
    import('@spo/containers/promotion/detail'),
);
const PromotionDetail = ({ data }) => {
    return <PromotionContainer data={data} />;
};

PromotionDetail.Layout = SpoLayout;
// PromotionDetail.getInitialProps = async (context) => {
//     const { query } = context;
//     let url = process.env.API_URL;
//     const data = await axios
//         .get(`${url}/news/promotions/${query?.slug}`)
//         .then((res) => res.data)
//         .catch((err) => {
//             console.log(err);
//             return {};
//         });

//     return {
//         data,
//     };
// };

export async function getServerSideProps(ctx) {
    const { query } = ctx;
    let url = process.env.API_URL;
    const data = await axios
        .get(`${url}/news/promotions/${query?.slug}`)
        .then((res) => res.data)
        .catch((err) => {
            console.log(err);
            return {};
        });

    return {
        props: {
            data,
        },
    };
}

export default PromotionDetail;
