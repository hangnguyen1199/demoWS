import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useCustomRoute } from '../../library/use-custom-route';
import CustomFrame from '../common/custom-frame';
import Image from '../common/image';
import Utils from '../../utils/utils';
import PageList from '../../config/PageList';
import navigate, { getUrlDynamic } from '../../library/navigate';

const News = (props) => {
    const { prefix = 'news' } = props;
    const gotoDetail = (slug, e) => {
        e.preventDefault();
        e.stopPropagation();
        let _field =
            prefix == 'news'
                ? PageList.NEWS_SLUG.NAME
                : PageList.PROMOTION_SLUG.NAME;
        navigate({ ...getUrlDynamic(_field, slug) });
    };
    return (
        <div
            className="news-info mobile"
            style={{
                borderRadius: 0,
                marginRight: prefix != 'news' && props.length > 1 && props.index == 0 ? 10 : 0,
                marginLeft: prefix != 'news' && props.length > 1 && props.index == 1 ? 10 : 0,
            }}
        >
            <Link
                prefetch={false}
                href={`${
                    prefix == 'news'
                        ? PageList.NEWS_SLUG.INDEX
                        : PageList.PROMOTION_SLUG.INDEX
                }${props.item.Slug}`}
            >
                <a
                    className="w-100 h-100"
                    onClick={(e) => gotoDetail(props.item.Slug, e)}
                >
                    {prefix == 'news' ? (
                        <CustomFrame ratio={620 / 1860}>
                            <Image
                                className="w-100 h-100"
                                src={props.item.Image}
                                seo={props.item?.Title}
                            />
                        </CustomFrame>
                    ) : (
                        <>
                            {props.index < 2 && (
                                <div
                                    style={{
                                        width: '100%',
                                        position: 'relative',
                                        maxWidth: `${(920 / 1860) * 100}`,
                                    }}
                                >
                                    <Image
                                        lazyLoad={false}
                                        className="w-100 h-100"
                                        src={props.item.Image}
                                        seo={props.item?.Title}
                                    />
                                    <div className="linear-gradient position-img-promotion">
                                        <p>{props.item.Title?.toLowerCase()}</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </a>
            </Link>
            {prefix == 'news' ? (
                <>
                    <div className="news-content">
                        <Link
                            prefetch={false}
                            href={`/${prefix}/[slug]`}
                            as={`/${prefix}/${props.item.Slug}`}
                        >
                            <a
                                onClick={(e) => gotoDetail(props.item.Slug, e)}
                                className="d-start news-post-title"
                                style={{ fontSize: 18 }}
                            >
                                {props.item.Title}
                            </a>
                        </Link>

                        <div className="news-post-time d-start fontsize14">
                            {Utils._formatDate(new Date(props.item.CreatedAt))}
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

News.propTypes = {
    Id: PropTypes.number,
    Title: PropTypes.string,
    Slug: PropTypes.string,
    Image: PropTypes.string,
    Descriptions: PropTypes.string,
    ViewCount: PropTypes.string,
    CreatedAt: PropTypes.string,
    AuthorName: PropTypes.string,
};

News.defaultProps = {
    Id: 0,
    Title: '',
    Slug: '',
    Image: '',
    Descriptions: '',
    ViewCount: '',
    CreatedAt: '',
    AuthorName: '',
};

export default News;
