import NewsActions from '@spo/redux/news/action';
import Link from 'next/link';
import { useEffect } from 'react';
import { FormattedDate } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { scrollTop } from '../../../library/helper';
import CustomFrame from './../../../components/common/custom-frame';
import CustomPagination from './../../../components/common/custom-pagination';
import Image from './../../../components/common/image';
import PageList from '../../../config/PageList';
import ButtonMain from '../../../components/common/button-main';

const TabNews = (props) => {
    const dispatch = useDispatch();
    const { Keyword } = props;
    const { list } = useSelector((state) => state.News);
    useEffect(() => {
        dispatch({
            type: NewsActions.LOAD_NEWS_LIST,
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
            type: NewsActions.LOAD_NEWS_LIST,
            data: {
                Offset: Offset,
                Limit: list?.Limit,
                Keyword: Keyword,
            },
            isLoadMore: false,
        });
        scrollTop()
    };

    return (
        <div className="tab-news">
            <div className="news-list-inner">
                {list?.NewsList?.length > 0 ? (
                    list?.NewsList?.map((item, index) => (
                        <div className="news-item" key={index}>
                            <div className="news-item-img">
                                <Link
                                    prefetch={false}
                                    href={`${PageList.NEWS_SLUG.INDEX}${item?.Slug}`}>
                                    <a>
                                        <CustomFrame
                                            className="d-flex"
                                            ratio={263 / 387}>
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
                                        <FormattedDate
                                            value={item?.CreatedAt}
                                        />
                                    </p>
                                    <Link
                                        prefetch={false}
                                        href={`${PageList.NEWS_SLUG.INDEX}${item?.Slug}`}>
                                        <a>
                                            <p className="title">
                                                {item.Title}
                                            </p>
                                        </a>
                                    </Link>

                                    <p className="desc">{item.Descriptions}</p>
                                    <div className="wrap_action">
                                        <Link
                                            prefetch={false}
                                            href={`${PageList.NEWS_SLUG.INDEX}${item?.Slug}`}>
                                            <a>
                                                <ButtonMain
                                                    title="?????c th??m"
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
                    <div>Ch??a c?? b??i vi???t n??o</div>
                )}
            </div>
            {list?.Total > 0 && (
                <div className='wrap_search_pagination'>
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
export default TabNews;
