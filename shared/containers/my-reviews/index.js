import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyReviewsActions from '@spo/redux/my-reviews/action';

import { useRouter } from 'next/router';
import BreadCrumb from '@spo/components/common/breadcrumb';
import VerticalTab from '@spo/components/spo-layout/vertical-tab';
import CommonNavs from '@spo/components/common/navs';
import ListReviewOrder from '@spo/components/my-reviews/list-review-order';
import ListReviewChat from '@spo/components/my-reviews/list-review-chat';
import Display from './../../components/common/display';

const navs = [
    {
        Id: 1,
        Name: 'Đơn hàng'
    },
    {
        Id: 2,
        Name: 'Góp ý'
    },
    {
        Id: 3,
        Name: 'Khiếu nại'
    },
    {
        Id: 4,
        Name: 'Giải đáp'
    }
];

const data_bread_crumb = [
    { name: 'Trang chủ', path_name: '/' },
    { name: 'Tài khoản', path_name: '/account' },
];

const MyReviewsContainer = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [queryParams, setQueryParams] = useState({});
    const [navsActive, setNavsActive] = useState(0);
    const { data } = useSelector((state) => state.MyReviews);
    const LIMIT = 200;

    useEffect(() => {
        let index =
            router.query?.index && router.query?.index < 4
                ? router.query?.index
                : 0;
        let pageNo = router.query?.page ? router.query?.page : 1;
        let query = {
            index: index,
            page: pageNo,
        };
        setNavsActive(index);
        setQueryParams(query);
        getReview(query);
    }, []);

    const handleChangeActiveNavs = (index) => {
        if (index != navsActive) {
            setNavsActive(index);
            handleChangeRouter({ index, page: 1 });
        }
    };

    const handleChangeRouter = (data) => {
        let query = { ...queryParams, ...data };
        setQueryParams(query);
        getReview(query);
        delete router.query.paramName;
        router.replace(
            {
                pathname: router.pathname,
                query: {
                    ...query,
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const reloadReview = () => {
        getReview(query);
    }

    const getReview = (queryParams) => {
        let Type = 1;
        let Offset = 0;
        let index = queryParams.index && queryParams.index < 4 ? queryParams.index : 0;
        let pageNo = queryParams.page ? queryParams.page : 1;
        if (index > 0) {
            Type = index * 10;
        }
        if (pageNo > 1) {
            Offset = (pageNo - 1) * LIMIT;
        }
        if (index == 0) {
            dispatch({
                type: MyReviewsActions.LOAD_REVIEWS_FOR_ORDER,
                queryParams: { Type, Offset, Limit: LIMIT }
            });
        }
        else {
            dispatch({
                type: MyReviewsActions.LOAD_REVIEWS_FOR_CHAT,
                queryParams: { Type, Offset, Limit: LIMIT, Status: 30 }
            });
        }
    };

    return (

        <div>
            <BreadCrumb data={data_bread_crumb} />
            <div className="bg-white account-info">
                <div className="px-0">
                    <div className="page-body">
                        <Display>
                            <div className="col-12 col-lg-3 px-0">
                                <VerticalTab index={4} />
                            </div>
                        </Display>
                        <div className="col-12 p-0 p-md-1 col-md-9 container-left-table">
                            <div className="my-reviews">
                                <CommonNavs
                                    data={navs}
                                    onPress={handleChangeActiveNavs}
                                    active={navsActive}
                                />
                                {navsActive == 0 ?
                                    <ListReviewOrder
                                        data={data.reviewsForOrder}
                                    /> :
                                    <ListReviewChat
                                        data={data.reviewsForChat}
                                        reloadReview={reloadReview}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MyReviewsContainer;