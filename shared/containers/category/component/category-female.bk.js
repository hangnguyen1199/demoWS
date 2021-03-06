import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import constants from '@spo/config/constants';
import ListItemChildGender from '../../../components/category/list-item-child-gender';
import HomeActions from '@spo/redux/home/action';

let categoryList = [
    {
        image: '/images/icon/category/sweater-women.png',
        imageMobile: '/images/icon/category/sweater-women-mobile.png',
        GenderId: 2,
        Slug: 'ao-khoac',
    },
    {
        image: '/images/icon/category/tshirt-women.png',
        imageMobile: '/images/icon/category/tshirt-women-mobile.png',
        GenderId: 2,
        Slug: 'ao-so-mi',
    },
    {
        image: '/images/icon/category/baggy-women.png',
        imageMobile: '/images/icon/category/baggy-women-mobile.png',
        GenderId: 2,
        Slug: 'quan-baggy',
    },
    {
        image: '/images/icon/category/dress-women.png',
        imageMobile: '/images/icon/category/dress-women-mobile.png',
        GenderId: 2,
        Slug: 'vay-dam',
    },
    {
        image: '/images/icon/category/tshirt-men.png',
        imageMobile: '/images/icon/category/tshirt-men-mobile.png',
        GenderId: 1,
        Slug: 'ao-so-mi',
    },
    {
        image: '/images/icon/category/polo-men.png',
        imageMobile: '/images/icon/category/polo-men-mobile.png',
        GenderId: 1,
        Slug: 'ao-thun',
    },
    {
        image: '/images/icon/category/jean-men.png',
        imageMobile: '/images/icon/category/jean-men-mobile.png',
        GenderId: 1,
        Slug: 'quan',
    },
    {
        image: '/images/icon/category/polo-couple.png',
        imageMobile: '/images/icon/category/polo-couple-mobile.png',
        GenderId: 4,
        Slug: 'do-bo',
    },
    {
        image: '/images/icon/category/dress-girl.png',
        imageMobile: '/images/icon/category/dress-girl-mobile.png',
        GenderId: 6,
        Slug: '',
    },
    {
        image: '/images/icon/category/dress-boy.png',
        imageMobile: '/images/icon/category/dress-boy-mobile.png',
        GenderId: 5,
        Slug: '',
    },
];

function CategoryFemaleContainer(props) {
    const { Gender } = props;

    const dispatch = useDispatch();
    const router = useRouter();
    const common = useSelector((state) => state.Common);
    const { loading, data } = useSelector((state) => state.Home);
    const {
        data: { wishlistProducts },
    } = useSelector((state) => state.Wishlist);
    const {
        loading: { loadingSlide },
        data: { settingMaster },
    } = useSelector((state) => state.Common);

    const BgCategory=`/images/category/female.jpg`
    useEffect(() => {

        const params = {
            Limit: 12,
            Offset: 0,
            Gender: Gender
        }

        dispatch({
            type: HomeActions.LOAD_TOP_VIEWED_PRODUCT,
            data: {
                data: {
                    ...params,
                    Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_TOP,
                }
            },
        }); // TODO

        dispatch({
            type: HomeActions.LOAD_NEWEST_PRODUCT,
            data: {
                data: {
                    ...params,
                    Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_NEW,
                }
            },
        });

        dispatch({
            type: HomeActions.LOAD_GOLDEN_HOUR_PRODUCT,
            data: {
                data: {
                    ...params,
                    TypeOfPromotion: constants.TYPE_SEARCH.PROMOTION.PROMOTION_GOLDEN_HOUR,
                }
            },
        });

        dispatch({
            type: HomeActions.LOAD_SUPPER_SALE_PRODUCT,
            data: {
                data: {
                    ...params,
                    TypeOfPromotion: constants.TYPE_SEARCH.PROMOTION.PROMOTION_SUPPER_SALE,
                }
            },
        });

        dispatch({
            type: HomeActions.LOAD_TRENDING_PRODUCT,
            data: {
                data: {
                    ...params,
                    Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_TREND,
                }
            },
        });

        dispatch({
            type: HomeActions.LOAD_NEWS,
            data: {
                data: {
                    ...params,
                    Limit: 4
                }
            },
        });

        dispatch({
            type: HomeActions.LOAD_PROMOTION,
            data: {
                data: {
                    ...params,
                    Limit: 2
                }
            },
        });

        dispatch({
            type: HomeActions.LOAD_PRODUCT_FILTER,
            data: {
                data: {
                    ...params,
                    Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_SEARCH_TOP,
                }
            },
        }); // TODO
    }, []);

    return (
        <>
            <ListItemChildGender
                dataTopSearch={data.listSearchTop}
                dataHourGold={data.goldenHourProducts}
                dataLive={[]}
                dataSale={data.supperSaleProducts}
                dataTrend={data.trendingProducts}
                dataProductNews={data.newestProducts}
                dataPromotion={data.listPromotion}
                wishlistProducts={wishlistProducts}
                loading={loading}
                categoryList={categoryList}
                backgroundTop={BgCategory} />
        </>
    )
}
export default CategoryFemaleContainer;