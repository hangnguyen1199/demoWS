import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useCustomRoute } from '../../library/use-custom-route';
import CustomFrame from '../common/custom-frame';
import Image from '../common/image';
import Utils from '../../utils/utils';
import styles from '../../../public/css/news/news.module.css';
import PageList from '../../config/PageList';
import navigate, { getUrlDynamic } from '../../library/navigate';

UpdatedNews.propTypes = {};

function UpdatedNews(props) {
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

    const splitString = (str, max_length = 30) => {
        try {
            if (str) {
                const splitArr = str.split(' ');
                //
                if (splitArr.length < max_length) {
                    return str;
                }
                //
                const shortArr = splitArr.slice(0, max_length - 1);
                return `${shortArr.join(' ')} ...`;
            }
            return str;
        } catch {
            return str;
        }
    };

    const _renderVerticalView = () => {
        return (
            <>
                <Link
                    prefetch={false}
                    className="pointer"
                    href={`${
                        prefix == 'news'
                            ? PageList.NEWS_SLUG.INDEX
                            : PageList.PROMOTION_SLUG.INDEX
                    }${props.item.Slug}`}
                >
                    <a onClick={(e) => gotoDetail(props.item.Slug, e)}>
                        <div className="d-flex flex-column">
                            <div>
                                <CustomFrame ratio={440 / 860}>
                                    <Image
                                        className="w-100 h-100"
                                        lazyLoad={false}
                                        src={props.item?.Image}
                                        seo={props.item?.Title}
                                    />
                                </CustomFrame>
                            </div>

                            <div
                                className={`d-flex flex-column text-left ${styles.vertical_view_content}`}
                            >
                                <div
                                    className={`${styles.vertical_view_header}`}
                                >
                                    {props.item?.Title}
                                </div>
                                <div
                                    className={`${styles.vertical_view_descript}`}
                                >
                                    {splitString(props.item?.Descriptions)}
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            </>
        );
    };

    const _renderHorizontalView = () => {
        return (
            <>
                <Link
                    prefetch={false}
                    className="pointer"
                    href={`${
                        prefix == 'news'
                            ? PageList.NEWS_SLUG.INDEX
                            : PageList.PROMOTION_SLUG.INDEX
                    }${props.item.Slug}`}
                >
                    <a onClick={(e) => gotoDetail(props.item.Slug, e)}>
                        <div className="d-flex pointer">
                            <div
                                className=""
                                style={{
                                    width: '100%',
                                    maxWidth: `${(679 / 1859) * 100}%`,
                                }}
                            >
                                <CustomFrame ratio={450 / 860}>
                                    <Image
                                        className="w-100 h-100"
                                        lazyLoad={false}
                                        src={props.item?.Image}
                                        seo={props.item?.Title}
                                    />
                                </CustomFrame>
                            </div>

                            <div
                                className={`d-flex flex-column justify-content-center text-left ${styles.horizontal_view_content}`}
                            >
                                <div
                                    className={`${styles.horizontal_view_header}`}
                                >
                                    {props.item?.Title}
                                </div>
                                <div
                                    className={`${styles.horizontal_view_descript}`}
                                >
                                    {splitString(props.item?.Descriptions, 150)}
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            </>
        );
    };

    return (
        <div className={` ${styles.childNew}`}>
            {props?.index === 0
                ? _renderHorizontalView()
                : _renderVerticalView()}
        </div>
    );
}

export default UpdatedNews;
