import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '@spo/components/common/breadcrumb';
import NewsList from './components/list';
import NewsSlides from './components/slides';
import { FormattedDate } from 'react-intl';
import Link from 'next/link';
import Pagination from 'react-js-pagination';
import NewsActions from '../../../redux/news/action';
import IconShare from '@spo/components/common/icon-share';
import CustomPagination from '../../components/common/custom-pagination';
import { FacebookShareButton } from 'react-share';
import EmptyDataComponent from '../../components/common/empty-data';
import PageList from '../../config/PageList';
import ButtonMain from '../../components/common/button-main';
import ListLoader from './components/loader/list-loader';
import Display from '../../components/common/display';

const NewsContainer = () => {
    const { slides, list, listMobile, loading } = useSelector((state) => state.News);
    return (
        <div className="news-page">
            <Breadcrumb
                data={[
                    { name: 'Trang chủ', query: '', path_name: '/' },
                    {
                        name: 'Tin tức',
                        query: '',
                        path_name: PageList.NEWS.SERVER,
                    },
                ]}
            />
            {loading ? (
                <ListLoader />
            ) : (
                <>
                    {/* DESKTOP */}
                    <Display>
                        <div className="">
                            <div className="container _container">
                                <div className="news-list-inner">
                                    {list?.NewsList?.length > 0 && !loading ? (
                                        list?.NewsList?.map((item, index) => (
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
                                                                    href={`${PageList.NEWS_SLUG.INDEX}${item?.Slug}`}
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
                                                            href={`${PageList.NEWS_SLUG.INDEX}${item?.Slug}`}
                                                        >
                                                            <a>
                                                                <p className="title">
                                                                    {item.Title}
                                                                </p>
                                                            </a>
                                                        </Link>

                                                        <p className="desc">
                                                            {item.Descriptions}
                                                        </p>
                                                        <div
                                                            className="d-flex align-items-center"
                                                            style={{
                                                                marginTop: 30,
                                                            }}
                                                        >
                                                            <Link
                                                                prefetch={false}
                                                                href={`${PageList.NEWS_SLUG.INDEX}${item?.Slug}`}
                                                            >
                                                                <a>
                                                                    <ButtonMain
                                                                        onClick={() => {}}
                                                                        title="Đọc thêm"
                                                                        className="btn-more-mobile btn-shared"
                                                                        style={{
                                                                            margin: 0,
                                                                        }}
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
                                                                hashtag={'#FM'}
                                                                description={
                                                                    item.Descriptions
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
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                    {!loading && list?.length == 0 && (
                                        <EmptyDataComponent message="Không có bài viết" />
                                    )}
                                </div>
                                {list?.Total > 0 && (
                                    <CustomPagination
                                        limit={list.Limit}
                                        total={list.Total}
                                        pageRangeDisplayed={4}
                                        // onChange={handlePagination}
                                    />
                                )}
                            </div>
                        </div>
                    </Display>
                    {/* DESKTOP */}
                    {/* MOBILE */}

                    <Display mobile>
                        <div className="">
                            <NewsSlides slides={slides} />
                            <div className="common-list" id="scrollableDiv">
                                <h3 className="title">Tất cả tin tức</h3>
                                {listMobile?.NewsList?.length > 0 && (
                                    <NewsList list={listMobile} />
                                )}

                                {!loading && listMobile.Total == 0 && (
                                    <EmptyDataComponent message="Không có bài viết" />
                                )}
                            </div>
                        </div>
                    </Display>
                    {/* MOBILE */}
                </>
            )}
        </div>
    );
};
export default NewsContainer;
