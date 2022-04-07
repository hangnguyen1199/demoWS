
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import HomeActions from '@spo/redux/home/action';
import { useRouter } from 'next/router';
import constants from '@spo/config/constants';
import CommonActions from '@spo/redux/common/action';

const Content = dynamic(() => import('./components/content.js'), { ssr: false });
const Header = dynamic(() => import('@spo/components/spo-layout/header'), {
    ssr: false,
});

/**
 * ****************************************************************************
 * HAIDT Index CODE
 * index.js
 *
 * description		:
 * created at		:	2021-11-11
 * created by		:	HAIDT
 * package			:	spo\shared\containers\home\index.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const HomeContainer = (props) => {
    const {
        loading: { loadingSlide },
        data: { Setting },
    } = useSelector((state) => state.Common);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: CommonActions.LOAD_SLIDE,
        });
    }, []);
    useEffect(() => {
        // let topParam = {};
        // topParam.Type = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_TOP;
        // topParam.Limit = 12;
        // topParam.Offset = 0;
        // dispatch({
        //     type: HomeActions.LOAD_TOP_VIEWED_PRODUCT,
        //     data: { data: topParam },
        // }); // TODO

        // let newestParam = {};
        // newestParam.Type = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_NEW;
        // newestParam.Limit = 12;
        // newestParam.Offset = 0;
        // dispatch({
        //     type: HomeActions.LOAD_NEWEST_PRODUCT,
        //     data: { data: newestParam },
        // });
        // let goldenHourParam = {};
        // goldenHourParam.TypeOfPromotion = constants.TYPE_SEARCH.PROMOTION.PROMOTION_GOLDEN_HOUR;
        // goldenHourParam.Limit = 12;
        // goldenHourParam.Offset = 0;
        // dispatch({
        //     type: HomeActions.LOAD_GOLDEN_HOUR_PRODUCT,
        //     data: { data: goldenHourParam },
        // });
        // let supperSaleParam = {};
        // supperSaleParam.TypeOfPromotion = constants.TYPE_SEARCH.PROMOTION.PROMOTION_SUPPER_SALE;
        // supperSaleParam.Limit = 12;
        // supperSaleParam.Offset = 0;
        // dispatch({
        //     type: HomeActions.LOAD_SUPPER_SALE_PRODUCT,
        //     data: { data: supperSaleParam },
        // });
        // let trendingParam = {};
        // trendingParam.Type = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_TREND;
        // trendingParam.Limit = 12;
        // trendingParam.Offset = 0;
        // dispatch({
        //     type: HomeActions.LOAD_TRENDING_PRODUCT,
        //     data: { data: trendingParam },
        // });

        let newsParam = {};
        newsParam.Limit = 4;
        newsParam.Offset = 0;
        dispatch({
            type: HomeActions.LOAD_NEWS,
            data: { data: newsParam },
        });

        let promotionParam = {};
        promotionParam.Limit = 2;
        promotionParam.Offset = 0;
        dispatch({
            type: HomeActions.LOAD_PROMOTION,
            data: { data: promotionParam },
        });

        let searchTopParam = {};
        searchTopParam.Type = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_SEARCH_TOP;
        searchTopParam.Limit = 12;
        searchTopParam.Offset = 0;
        dispatch({
            type: HomeActions.LOAD_PRODUCT_FILTER,
            data: { data: searchTopParam },
        }); // TODO
    }, []);
    return (
        <>
            {/* <Header /> */}
            <div className="d-flex flex-wrap home-container">
                <Content Gender={null} />
            </div>
        </>
    );
};

export default HomeContainer;
