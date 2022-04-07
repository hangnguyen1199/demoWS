import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import RecruitmentActions from '../../redux/recruitment/action';
import Head from 'next/head';

const url = process.env.API_URL;
const RecruitmentContainer = dynamic(() =>
    import('@spo/containers/recruitment'),
);
import useWindowSize from '@spo/lib/use-window-size';
import { useRouter } from 'next/router';
import UserFirstLoad from './../../shared/library/use-first-load';
import constants from './../../shared/config/constants';

const Recruitment = ({ data }) => {
    const dispatch = useDispatch();
    const {width}=useWindowSize();
    const router=useRouter();
    const loadFirst=UserFirstLoad(width);
    useEffect(() => {
        if(loadFirst){
            if(width > constants.WINDOW_SIZE.MEDIUM){
                dispatch({
                    type: RecruitmentActions.LOAD_RECRUITMENT_LIST,
                    data:{
                        isLoadMore:false,
                        ...router.query
                    }
                });
            }
            if(width < constants.WINDOW_SIZE.MEDIUM){
                dispatch({
                    type: RecruitmentActions.LOAD_RECRUITMENT_LIST_MOBILE,
                    data:{
                        isLoadMore : true,
                        ...router.query
                    }
                });
            }
        }
    }, [router.query,loadFirst]);
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB}Tuyển dụng`}</title>
            </Head>
            <RecruitmentContainer />
        </>
    );
};
Recruitment.Layout = SpoLayout;
// export async function getServerSideProps(ctx) {
//     const {
//         query: { Limit, Offset, ProviceId, Position },
//     } = ctx;
//     const data = await axios
//         .get(`${process.env.API_URL}/news/recruitments`, {
//             params: { Limit, Offset, ProviceId, Position },
//         })
//         .then((res) => res.data);
//     return {
//         props: {
//             data,
//         },
//     };
// }
export default Recruitment;
