import React, { useState ,useEffect} from 'react';
import { FormattedDate } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroller';
import Link from 'next/link';
import NewsActions from '@spo/redux/news/action';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PageList from '../../../config/PageList';
import constants from './../../../config/constants';

const NewsList = (props) => {
    const dispatch = useDispatch();
    const [checkedLoad, setCheckedLoad] = useState(true)
    const { list } = props;
    const [hasMore, setHasMore] = useState(list?.NewsList.length < list.Total);
    const loadData = async  ( pageNo) => {
        let loadMore = list?.NewsList.length < list.Total;
        if (loadMore && checkedLoad) {
            let params={}
            params[constants.ROUTER_NAME.PAGE] = pageNo;
            setCheckedLoad(false)
            dispatch({
                type:NewsActions.LOAD_NEWS_MOBILE,
                data: params,
                isLoadMore: loadMore,
                callback:()=>{
                    setCheckedLoad(true)
                }
            })
        }
    };
    return (
        <InfiniteScroll
            className="news-list-inner"
            pageStart={1}
            loadMore={(page) => loadData(page)}
            hasMore={hasMore}
            scrollableTarget="scrollableDiv"
            dataLength={list?.NewsList.length}
            loader={ list?.NewsList.length < list.Total && <h4 key={1211123}>Loading...</h4>}
        >
            {list.NewsList?.map((item, index) => {
                return (
                    <Link
                        prefetch={false}
                        href={`${PageList.NEWS.SERVER}/${item.Slug}`}
                        key={item.Id}>
                        <div className="d-flex news-item">
                            <div className="news-item-img">
                                <div className="container-ratio">
                                    <div className="ratio">
                                        <img src={item?.Image} alt={item?.Title} />
                                    </div>
                                </div>
                            </div>
                            <div className="news-item-content">
                                <p className="date">
                                    <FormattedDate value={item?.CreatedAt} />
                                </p>
                                <p className="title">{item.Title}</p>
                                <p className="desc">{item.Descriptions}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </InfiniteScroll>
    );
};
export default NewsList;
