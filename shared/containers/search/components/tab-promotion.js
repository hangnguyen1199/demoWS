import PromotionActions from '@spo/redux/promotion/action';
import Link from 'next/link';
import { useEffect } from 'react';
import { FormattedDate } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import CustomFrame from './../../../components/common/custom-frame';
import CustomPagination from './../../../components/common/custom-pagination';
import Image from './../../../components/common/image';
import PageList from '../../../config/PageList';
import ButtonMain from '../../../components/common/button-main';

const TabPromotion = (props) => {
    const dispatch = useDispatch();
    const { Keyword } = props;
    const { list } = useSelector((state) => state.Promotion);
    useEffect(() => {
        dispatch({
            type: PromotionActions.LOAD_PROMOTION_LIST,
            data: {
                Offset: 0,
                Limit: list?.Limit,
                Keyword: Keyword,
            },
            isLoadMore: false,
        });
    }, []);
    const handlePagination = (pageNo) => {
        let Offset = (pageNo - 1) * list?.Limit;
        dispatch({
            type: PromotionActions.LOAD_PROMOTION_LIST,
            data: {
                Offset: Offset,
                Limit: list?.Limit,
                Keyword: Keyword,
            },
            isLoadMore: false,
        });
    };

    return (
        <div className="tab-news">
            <div className="news-list-inner">
                {list?.Promotions?.length > 0 ? (
                    list?.Promotions?.map((item, index) => (
                        <div className="news-item" key={index}>
                            <div className="news-item-img">
                                <Link
                                    prefetch={false}
                                    href={`${PageList.PROMOTION_SLUG.INDEX}${item?.Slug}`}>
                                    <a>
                                        <CustomFrame className="d-flex" ratio={263 / 387}>
                                            <Image
                                                className="w-100 h-100"
                                                src={item?.Image}
                                                alt={item?.Title}
                                            />
                                        </CustomFrame>
                                    </a>
                                </Link>
                            </div>
                            <div className="wrap_news_info">
                                <div className="news-item-content">
                                    <p className="date">
                                        <FormattedDate value={item?.CreatedAt} />
                                    </p>
                                    <Link
                                        prefetch={false}
                                        href={`${PageList.PROMOTION_SLUG.INDEX}${item?.Slug}`}>
                                        <a>
                                            <p className="title">{item.Title}</p>
                                        </a>
                                    </Link>

                                    <p className="desc">{item.Descriptions}</p>
                                    <div className="wrap_action">
                                        <Link
                                            prefetch={false}
                                            href={`${PageList.PROMOTION_SLUG.INDEX}${item?.Slug}`}>
                                            <a>
                                                <ButtonMain
                                                    title="Đọc thêm"
                                                    className="btn-shared"
                                                    style={{
                                                        margin: 0,
                                                    }}/>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Chưa có bài viết nào</div>
                )}
            </div>
            {list?.Total > 0 && (
                <div className="wrap_search_pagination">
                    <CustomPagination
                        limit={list.Limit}
                        total={list.Total}
                        pageRangeDisplayed={4}
                        onChange={handlePagination}
                    />
                </div>
            )}
        </div>
    );
};
export default TabPromotion;
