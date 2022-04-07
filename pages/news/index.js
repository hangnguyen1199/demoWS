import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NewsActions from '@spo/redux/news/action';
import Head from 'next/head';

const url = process.env.API_URL;
const NewsContainer = dynamic(() => import('@spo/containers/news'));
import { useRouter } from 'next/router';
import useWindowSize from '@spo/lib/use-window-size';
import constants from './../../shared/config/constants';
import UserFirstLoad from './../../shared/library/use-first-load';


const News = (props) => {
    const dispatch = useDispatch();
    const router=useRouter();
    const {width }=useWindowSize();
    const firstLoad=UserFirstLoad(width);
    useEffect(() => {
        if(firstLoad){
            if( width > constants.WINDOW_SIZE.MEDIUM){
                dispatch({
                    type: NewsActions.LOAD_NEWS_LIST,
                    data:{
                        ...router.query,
                        isLoadMore: false,
                    },
                });
            }
            if(width < constants.WINDOW_SIZE.MEDIUM){
                dispatch({
                    type:NewsActions.LOAD_NEWS_SLIDE
                })
                dispatch({
                    type: NewsActions.LOAD_NEWS_MOBILE,
                    data:{
                        ...router.query,
                        isLoadMore: false,
                    },
                });
            }
        }
    },[router.query,firstLoad]);

    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB} Tin tức`}</title>
            </Head>
            <NewsContainer />
        </>
    );
};

News.Layout = SpoLayout;
// export async function getServerSideProps (ctx) {
//     const { query } = ctx;

//     const lists = await axios
//         .get(`${url}/news/news`, {})
//         .then((res) => res.data)
//         .catch((err) => {
//             console.log('Error In News Page', err);
//             return {
//                 Total: 0,
//                 Offset: 0,
//                 Limit: 0,
//                 NewsList: [],
//             };
//         });

//     const slides = await axios
//         .get(`${url}/news/news/slide`)
//         .then((res) => res.data)
//         .catch((err) => {
//             console.log('Error In News Page:', err);
//             return [];
//         });

//     return {
//         props: {
//             lists,
//             slides,
//         },
//     };
// }

export default News;
