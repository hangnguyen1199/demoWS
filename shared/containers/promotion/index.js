import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { FormattedDate } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroller';
import FilterIconUrl from '@spo/public/images/icon/ic_filter.svg';
import Image from 'next/image';
import CustomModalFilter from '@spo/components/common/custom-modal-filter';
import Actions from '@spo/redux/promotion/action';
import CommonActions from '@spo/redux/common/action';
import IconX from '@spo/components/common/icon-x';
import IconShare from '@spo/components/common/icon-share';
import CustomPagination from '@spo/components/common/custom-pagination';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FacebookShareButton } from 'react-share';
import Breadcrumb from '@spo/components/common/breadcrumb';
import EmptyDataComponent from '../../components/common/empty-data';
import PageList from '../../config/PageList';
import ButtonMain from '../../components/common/button-main';
import ListLoader from '../news/components/loader/list-loader';
import constants from '../../config/constants';
import Display from '../../components/common/display';

const url = process.env.API_URL;

const FilterIcon = () => (
    <Image src={FilterIconUrl} width={18} height={18} color="#000" />
);

let settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const PromotionContainer = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showFilter, setShowFilter] = useState(false);
    const [branchFilter, setBranchFilter] = useState({});
    const { list, listMobile, loading } = useSelector(
        (state) => state.Promotion
    );
    const { listBranch } = useSelector((state) => state.Common.data);
    const [hasMore, setHasMore] = useState(false);
    useEffect(() => {
        dispatch({
            type: CommonActions.LOAD_BRANCH_MASTER,
            data: {
                type: 2,
            },
        });
        setHasMore(listMobile?.Promotions.length < listMobile.Total);
    }, []);

    const handleShowFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleFilter = (item) => {
        let data = item?.Id ? { BranchId: item.Id } : {};
        setBranchFilter({ Id: item?.Id, Name: item?.Name });
    };

    const loadData = async (pageNo) => {
        let loadMore = listMobile?.Promotions.length < list.Total;
        const [checkedLoad, setCheckedLoad] = useState(true);

        setHasMore(loadMore);
        if (loadMore && checkedLoad) {
            let params = {};
            params[constants.ROUTER_NAME.PAGE] = pageNo;
            setCheckedLoad(false);
            dispatch({
                type: Actions.LOAD_PROMOTION_LIST_MOBILE,
                data: params,
                isLoadMore: loadMore,
                callback: () => {
                    setCheckedLoad(true);
                },
            });
        }
    };
    return (
        <div className="promotion-page">
            <Breadcrumb
                data={[
                    { name: 'Trang chủ', query: '', path_name: '/' },
                    {
                        name: 'Khuyến mãi',
                        query: '',
                        path_name: PageList.PROMOTION.SERVER,
                    },
                ]}
            />
            {loading ? (
                <ListLoader />
            ) : (
                <>
                    <React.Fragment>
                        {/* DESKTOP */}
                        <Display>
                            <div className="">
                                {list?.Promotions?.length > 0 && (
                                    <div className="container _container">
                                        <div className="news-list-inner">
                                            {list?.Promotions?.map(
                                                (item, index) => (
                                                    <div
                                                        className="row news-item"
                                                        key={index}
                                                    >
                                                        <div
                                                            className={`${
                                                                index == 0
                                                                    ? 'col-7'
                                                                    : 'col-5'
                                                            }`}
                                                        >
                                                            <div className="news-item-img">
                                                                <div className="container-ratio">
                                                                    <div className="ratio">
                                                                        <Link
                                                                            prefetch={
                                                                                false
                                                                            }
                                                                            href={`${PageList.PROMOTION_SLUG.INDEX}${item?.Slug}`}
                                                                        >
                                                                            <a>
                                                                                <img
                                                                                    src={
                                                                                        item?.Image
                                                                                    }
                                                                                    alt={
                                                                                        item?.Title
                                                                                    }
                                                                                />
                                                                            </a>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${
                                                                index == 0
                                                                    ? 'col-5'
                                                                    : 'col-7'
                                                            }`}
                                                        >
                                                            <div className="news-item-content">
                                                                <p className="date">
                                                                    <FormattedDate
                                                                        day="2-digit"
                                                                        month="2-digit"
                                                                        year="numeric"
                                                                        value={
                                                                            item?.CreatedAt
                                                                        }
                                                                    />
                                                                </p>
                                                                <Link
                                                                    prefetch={false}
                                                                    href={`${PageList.PROMOTION_SLUG.INDEX}${item?.Slug}`}
                                                                >
                                                                    <a>
                                                                        <p className="title">
                                                                            {
                                                                                item.Title
                                                                            }
                                                                        </p>
                                                                    </a>
                                                                </Link>

                                                                <p className="desc">
                                                                    {
                                                                        item.Descriptions
                                                                    }
                                                                </p>
                                                                <div
                                                                    className="d-flex align-items-center"
                                                                    style={{
                                                                        marginTop: 30,
                                                                    }}
                                                                >
                                                                    <Link
                                                                        prefetch={
                                                                            false
                                                                        }
                                                                        href={`${PageList.PROMOTION_SLUG.INDEX}${item?.Slug}`}
                                                                    >
                                                                        <a>
                                                                            <ButtonMain
                                                                                title="Đọc thêm"
                                                                                className="btn-shared"
                                                                            />
                                                                        </a>
                                                                    </Link>

                                                                    <FacebookShareButton
                                                                        url={
                                                                            window
                                                                                .location
                                                                                .href
                                                                        }
                                                                        quote={
                                                                            item?.Title
                                                                        }
                                                                        hashtag={
                                                                            '#FM'
                                                                        }
                                                                        description={
                                                                            item.Description
                                                                        }
                                                                    >
                                                                        <button
                                                                            className="btn-share pointer"
                                                                            type="button"
                                                                        >
                                                                            <IconShare
                                                                                color="#000"
                                                                                fontSize={
                                                                                    15
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </FacebookShareButton>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        {list?.Total > 0 && (
                                            <CustomPagination
                                                limit={
                                                    constants
                                                        .PAGINATION_PRODUCT_LIST
                                                        .LIMIT
                                                }
                                                total={list.Total}
                                                pageRangeDisplayed={4}
                                                onChange={() => {}}
                                            />
                                        )}
                                    </div>
                                )}
                                {
                                    !loading && list.Promotions.length == 0 &&  <EmptyDataComponent message="Không có tin khuyến mãi" />
                                }
                            </div>
                        </Display>
                        {/* DESKTOP */}
                        {/* MOBILE */}
                        <Display mobile>
                            <div className="">
                                {listMobile?.Promotions?.length > 0 && (
                                    <>
                                        {showFilter && (
                                            <CustomModalFilter
                                                handleShowFilter={handleShowFilter}
                                                masterData={listBranch}
                                                onSelect={handleFilter}
                                                title="Chọn cửa hàng áp dụng"
                                            />
                                        )}
                                        <div className="common-slides">
                                            {listMobile?.Promotions?.length > 0 && (
                                                <Slider
                                                    {...settings}
                                                    className="common-slides-inner"
                                                >
                                                    {listMobile?.Promotions?.map(
                                                        (item, index) => (
                                                            <Link
                                                                key={index}
                                                                prefetch={false}
                                                                href={`${PageList.PROMOTION_SLUG.INDEX}${item?.Slug}`}
                                                            >
                                                                <a>
                                                                    <div className="common-slides-item">
                                                                        <div className="common-slide-img">
                                                                            <div className="container-ratio">
                                                                                <div className="ratio">
                                                                                    <img
                                                                                        src={
                                                                                            item?.Image
                                                                                        }
                                                                                        alt={
                                                                                            item?.Title
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="common-slide-content">
                                                                            <p className="title">
                                                                                {
                                                                                    item?.Title
                                                                                }
                                                                            </p>
                                                                            <p className="date">
                                                                                <FormattedDate
                                                                                    value={
                                                                                        item?.StartFrom
                                                                                    }
                                                                                    day="2-digit"
                                                                                    month="2-digit"
                                                                                    year="numeric"
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </Link>
                                                        )
                                                    )}
                                                </Slider>
                                            )}
                                        </div>
                                        <div className="common-list">
                                            <h5>Tất cả ưu đãi</h5>
                                            <div
                                                className="list__filter__container"
                                                style={{ display: 'none' }}
                                            >
                                                <button
                                                    onClick={handleShowFilter}
                                                    type="button"
                                                >
                                                    <span
                                                        style={{ marginRight: 5 }}
                                                    >
                                                        Bộ lọc
                                                    </span>{' '}
                                                    <FilterIcon />
                                                </button>
                                                {branchFilter?.Name && (
                                                    <span className="filter-item">
                                                        {branchFilter?.Name}{' '}
                                                        <button
                                                            onClick={() =>
                                                                handleFilter()
                                                            }
                                                        >
                                                            <IconX
                                                                color="#fff"
                                                                fontSize={12}
                                                            />
                                                        </button>
                                                    </span>
                                                )}
                                            </div>
                                            <InfiniteScroll
                                                className="news-list-inner"
                                                pageStart={1}
                                                loadMore={(page) => loadData(page)}
                                                hasMore={hasMore}
                                                loader={
                                                    <h4 key={1211123}>
                                                        Loading...
                                                    </h4>
                                                }
                                            >
                                                {listMobile?.Promotions?.map(
                                                    (item) => {
                                                        return (
                                                            <Link
                                                                href={`${PageList.PROMOTION_SLUG.INDEX}${item?.Slug}`}
                                                                key={item.Id}
                                                            >
                                                                <div className="d-flex news-item">
                                                                    <div className="news-item-img">
                                                                        <div className="container-ratio">
                                                                            <div className="ratio">
                                                                                <img
                                                                                    src={
                                                                                        item?.Image
                                                                                    }
                                                                                    alt={
                                                                                        item?.Title
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="news-item-content">
                                                                        <p className="date">
                                                                            <FormattedDate
                                                                                value={
                                                                                    item?.StartFrom
                                                                                }
                                                                            />
                                                                            -
                                                                            <FormattedDate
                                                                                value={
                                                                                    item?.EndTo
                                                                                }
                                                                            />
                                                                        </p>
                                                                        <p className="title">
                                                                            {
                                                                                item.Title
                                                                            }
                                                                        </p>
                                                                        <p className="desc">
                                                                            {
                                                                                item?.Descriptions
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        );
                                                    }
                                                )}
                                            </InfiniteScroll>
                                        </div>
                                    </>
                                )}
                                {
                                    !loading && listMobile?.Promotions?.length == 0 && <EmptyDataComponent message="Không có tin khuyến mãi" />
                                }
                            </div>
                        </Display>
                        {/* MOBILE */}
                    </React.Fragment>
                </>
            )}
        </div>
    );
};

export default PromotionContainer;
