import dynamic from 'next/dynamic';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Actions from '@spo/redux/promotion/action';
import SpoLayout from '@spo/containers/layout/spo-layout';
import constants from '@spo/config/constants';
import Head from 'next/head';

const PromotionContainer = dynamic(() => import('@spo/containers/promotion'));
import { useRouter } from 'next/router';
import useWindowSize from '@spo/lib/use-window-size';
import UserFirstLoad from '../../shared/library/use-first-load';

const Promotion = ({ list }) => {
    const dispatch = useDispatch();
    const router=useRouter();
    const {width }=useWindowSize();
    const firstLoad=UserFirstLoad(width);
    useEffect(() => {
        if(firstLoad){
            if( width > constants.WINDOW_SIZE.MEDIUM){
                dispatch({
                    type: Actions.LOAD_PROMOTION_LIST,
                    data:{
                        ...router.query
                    }
                });
            }
            if(width < constants.WINDOW_SIZE.MEDIUM){
                dispatch({
                    type:Actions.LOAD_PROMOTION_LIST_MOBILE,
                    data:{
                        ...router.query
                    },
                    isLoadMore: true
                })
            }
        }
    }, [router.query,firstLoad]);
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB} Khuyến mãi`}</title>
            </Head>
            <PromotionContainer />
        </>
    );
};
Promotion.Layout = SpoLayout;

// export async function getServerSideProps(ctx) {
//     const {
//         query: { BranchId, Title, Limit, Offset },
//     } = { ...ctx };

//     const list = await axios
//         .get(`${process.env.API_URL}/news/promotions`, {
//             params: {
//                 BranchId,
//                 Title,
//                 Offset,
//             },
//         })
//         .then((res) => res.data);

//     return {
//         props: {
//             list,
//         },
//     };
// }
export default Promotion;
