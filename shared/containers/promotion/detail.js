import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { FormattedDate } from 'react-intl'
import { useSelector , useDispatch } from 'react-redux'
import Breadcrumb from '@spo/components/common/breadcrumb'
import { FacebookShareButton } from 'react-share'
import IconShare from '@spo/components/common/icon-share'
import PageList from '../../config/PageList'
import Display from '../../components/common/display'
import Link from 'next/link'
import IconChevronRight from '../../components/common/icon-chevron-right'
import UpdatedNews from '../../components/item/updated-news'
import Image from '../../components/common/image'
import constants from '../../config/constants';
import PromotionActions from '../../../redux/promotion/action'

const EmptyMessage = ({ message }) => {
    return <div style={{ textAlign: 'center' }}>{message}</div>
}

const PromotionDetailContainer = (props) => {
    // const { detail } = useSelector((state) => state.Promotion)
    const detail = props?.data
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
                type: PromotionActions.LOAD_OTHER_PROMOTION,
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
            <div className="common-detail-page promotion-detail-page">
                <Breadcrumb
                    data={[
                        { name: 'Trang chủ', query: '', path_name: '/' },
                        {
                            name: 'Khuyến mãi',
                            query: '',
                            path_name: PageList.PROMOTION.SERVER,
                        },
                        {
                            name: 'Chi tiết khuyến mãi',
                            query: '',
                            path_name: '/',
                        },
                    ]}
                />

                {detail ? (
                    <>
                        <Display>
                            <div className="row m-0">
                                <div className="col-8 col-lg-8 col-xl-8 p-0">
                                    <div className="pd-lr-common common-detail--banner ">
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
                                            <h3 className="title mb-4">
                                                {detail?.Title}
                                            </h3>
                                        </div>
                                        <p className="description">
                                            {detail?.Descriptions}
                                        </p>
                                    </div>
                                    <div className="pd-lr-common container common-detail--inner detail-new-editor">
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
                                                    prefix="promotion"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Display>
                        <Display mobile={true}>
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
                                    className="common-detail--content "
                                    dangerouslySetInnerHTML={{
                                        __html: detail?.Content,
                                    }}
                                ></div>
                            </div>
                        </Display>
                    </>
                ) : (
                    <EmptyMessage message="Không có bài viết nào được tìm thấy" />
                )}
            </div>
        </>
    );
}
export default PromotionDetailContainer
