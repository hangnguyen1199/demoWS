const ListNews = dynamic(() => import('@spo/components/item/list-news-promo'), {
    ssr: false,
})
import Head from 'next/head'
import { FormattedDate } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import Breadcrumb from '@spo/components/common/breadcrumb'
import Image from './../../components/common/image'
import { FacebookShareButton } from 'react-share'
import IconShare from '@spo/components/common/icon-share'
import PageList from '../../config/PageList'
import Link from 'next/link'
import IconChevronRight from '../../components/common/icon-chevron-right'
import useCustomRoute from '../../library/use-custom-route'
import dynamic from 'next/dynamic'
import ItemLoader from '../../components/item/item-loader'
import HomeActions from '@spo/redux/home/action'
import { useEffect, useState } from 'react'
import UpdatedNews from '../../components/item/updated-news'
import NewsActions from '../../../redux/news/action'
import constants from '../../config/constants'

const EmptyMessage = ({ message }) => {
    return <div style={{ textAlign: 'center' }}>{message}</div>
}

const NewsDetailContainer = (props) => {
    const { detail } = useSelector((state) => state.News)
    const [list, setList] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if (detail?.Id) {
            let newsParam = {}
            newsParam.Limit = 3
            newsParam.Offset = 0
            newsParam.Type = constants.FILTER_NEWS_TYPE.OTHER
            newsParam.Exclude = detail?.Id
            dispatch({
                type: NewsActions.LOAD_OTHER_NEWS,
                data: newsParam,
                callback: {
                    success: (res) => {
                        setList(res)
                    },
                },
            })
        }
    }, [detail?.Id])

    return (
        <>
            <Head>
                <title>{detail?.Title ? detail?.Title : 'FM Plus'}</title>
                <meta name="description" content={detail?.Descriptions}></meta>
                <meta name="keywords" content={detail?.Keywords}></meta>
                <meta property="og:image" content={detail?.Image}></meta>
                <meta
                    property="og:title"
                    content={detail?.Title ? detail?.Title : 'FM Plus'}
                    key="title"
                />
            </Head>
            <div className="common-detail-page news-detail--page">
                <Breadcrumb
                    data={[
                        { name: 'Trang chủ', query: '', path_name: '/' },
                        {
                            name: 'Tin tức',
                            query: '',
                            path_name: PageList.NEWS.SERVER,
                        },
                        {
                            name: 'Chi tiết tin tức',
                            query: '',
                            path_name: '/',
                        },
                    ]}
                />
                {detail ? (
                    <>
                        {/* DESKTOP */}
                        <div className="d-none d-md-block">
                            <div className="row m-0">
                                <div className="col-8 col-lg-8 col-xl-8 p-0 detail-new-editor">
                                    <div className="pd-lr-common common-detail--banner">
                                        <Image
                                            lazyLoad={false}
                                            width={400}
                                            height={400}
                                            sizes="(max-width: 500px) 200px, 500px"
                                            seo={detail?.Slug}
                                            className="w-100 detail-img"
                                            src={detail?.DetailImage}
                                        />
                                    </div>
                                    <div className="pd-lr-common common-detail--inner detail-news">
                                        <p className="date">
                                            <FormattedDate
                                                value={detail?.CreatedAt}
                                                day="2-digit"
                                                month="2-digit"
                                                year="numeric"
                                            />
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            {/* <p className="tag">NEWS</p> */}
                                            <h3 className="title mb-4">
                                                {detail?.Title}
                                            </h3>
                                            {/* {typeof window != 'undefined' && (
                                                <FacebookShareButton
                                                    url={window.location.href}
                                                    quote={detail?.Title}
                                                    hashtag={'#FM'}
                                                    description={
                                                        detail?.Descriptions
                                                    }
                                                >
                                                    <button
                                                        className="btn-share pointer"
                                                        type="button"
                                                    >
                                                        <IconShare
                                                            color="#000"
                                                            fontSize={15}
                                                        />
                                                    </button>
                                                </FacebookShareButton>
                                            )} */}
                                        </div>
                                        {/* <h3 className="title">{detail?.Title}</h3> */}
                                        <p className="description">
                                            {detail?.Descriptions}
                                        </p>
                                    </div>

                                    <div className="pd-lr-common container common-detail--inner">
                                        <div
                                            className="common-detail--content"
                                            dangerouslySetInnerHTML={{
                                                __html: detail?.Content,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="col-4 col-lg-4 col-xl-4 common-detail-right">
                                    <div className=" d-flex justify-content-between">
                                        <p
                                            className="text-uppercase other-posts"
                                            style={{
                                                color: '#00000',
                                                fontWeight: 600,
                                            }}
                                        >
                                            <Link
                                                href={{
                                                    pathname:
                                                        PageList.NEWS.SERVER,
                                                }}
                                            >
                                                <a className="see-all pointer d-flex hover-color-svg">
                                                    Bài viết khác
                                                </a>
                                            </Link>
                                        </p>
                                        <Link
                                            href={{
                                                pathname: PageList.NEWS.SERVER,
                                            }}
                                        >
                                            <a className="see-all pointer d-flex hover-color-svg">
                                                Xem thêm &nbsp;{' '}
                                                <IconChevronRight
                                                    fontSize={16}
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="detail-list-news">
                                        {list?.map((items, index) => (
                                            <div className="detail-list-news-item">
                                                <UpdatedNews
                                                    item={items}
                                                    key={index}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* DESKTOP */}
                        {/* MOBILE */}
                        <div className="d-block d-md-none">
                            <div className="common-detail--banner">
                                <img src={detail?.MobileImage} />
                            </div>
                            <div className="container common-detail--inner detail-new-editor">
                                <h3>{detail?.Title}</h3>
                                <p className="date">
                                    <FormattedDate
                                        value={detail?.CreatedAt}
                                        day="2-digit"
                                        month="2-digit"
                                        year="numeric"
                                    />
                                </p>
                                <div
                                    className="common-detail--content"
                                    dangerouslySetInnerHTML={{
                                        __html: detail?.Content,
                                    }}
                                ></div>
                            </div>
                        </div>
                        {/* MOBILE */}
                    </>
                ) : (
                    <EmptyMessage message="Không có bài viết nào được tìm thấy" />
                )}
            </div>
        </>
    );
}
export default NewsDetailContainer
