const Image = dynamic(() => import('@spo/components/common/image'), {
    ssr: false,
});
import useWindowSize from '@spo/lib/use-window-size';
import constants from '@spo/config/constants';
import { Router } from '@spo/routes';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
import News from './news';
import ItemLoader from './item-loader';
import IconChevronRight from './../common/icon-chevron-right';
import { useDispatch } from 'react-redux';
import { useCustomRoute } from './../../library/use-custom-route';
import Display from '../common/display';
import NewsMobile from './news-mobile';
import UpdatedNews from './updated-news';
import PromotionLoader from '../../containers/home/components/loader/promotion-leader';

const ListNews = (props) => {
    const { prefix } = props;
    const windowSize = useWindowSize();
    const router = useRouter();
    const dispatch = useDispatch();
    const handleSeeMore = (e) => {
        e.preventDefault();
        e.stopPropagation();
        useCustomRoute(dispatch, props.seeAllPath);
    };


    return (
        (props.loading || props.items?.length > 0) && (
            <div
                className={`section w-100 ${props.isBorderTop ? 'border-top' : ''
                }`}>
                {props?.sectionTitle && (
                    <div className="section-header text-center font-title list-item-header">
                        <div className={`list-item-header-content`}>
                            <div
                                className={`${props.seeAllPath
                                    ? 'hover-color-svg'
                                    : ''
                                } d-flex`}
                                style={{ alignItems: 'center' }}>
                                {props?.sectionTitle && (
                                    <div
                                        className=""
                                        style={{
                                            // color: props.textColor,
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                        }}>
                                        <span
                                            onClick={handleSeeMore}>
                                            {props.sectionTitle}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <Link prefetch={false} href={`${props.seeAllPath}`} onClick={handleSeeMore}>
                                <a
                                    className="see-all pointer d-flex hover-color-svg"
                                >
                                    Xem thêm &nbsp;{' '}
                                    <IconChevronRight fontSize={16} />
                                </a>
                            </Link>
                        </div>
                    </div>
                )}
                <LazyLoad height={props.lazy_height} offset={props.lazy_offset}>
                    {props.loading ? (
                        <PromotionLoader/>
                    ) : (
                        <>
                            <Display>
                                <div className="list-new-group">
                                    <div
                                        className={`${windowSize &&
                                            windowSize.width &&
                                            windowSize.width >=
                                            constants.WINDOW_SIZE.MEDIUM
                                            ? 'px-0'
                                            : 'wrap_item_mobile'
                                        }`}>
                                        <div className=" d-flex flex-wrap">
                                            {/*  for backup */}
                                            {/* {
                                                props.items.length == 2 ? <>
                                                    {props.items.map((item, index) => (
                                                        <div key={index} className={`${(prefix == "promotion") ? "col-lg-12" : "col-lg-6"} px-0`}
                                                            style={{ paddingBottom: (index == 0 && prefix == "promotion") ? 5 : 0 }}
                                                        >
                                                            <News item={item} prefix={prefix} />
                                                        </div>
                                                    ))}
                                                </> : <>
                                                    {props.items.map((item, index) => (
                                                        <div key={index} className={`${(index == 0 || prefix == "promotion") ? "col-lg-12" : "col-lg-6"} px-0`}
                                                            style={{ paddingBottom: (index == 0 && prefix == "promotion") ? 5 : 0 }}
                                                        >
                                                            <News item={item} prefix={prefix} />
                                                        </div>
                                                    ))}
                                                </>
                                            } */}

                                            {/* Show Promotion List */}
                                            {
                                                prefix === "promotion" && (
                                                //     props.items.length == 2 ?
                                                //     <>
                                                //         {props.items.map((item, index) => (
                                                //             <div key={index} className={`col-lg-12 px-0`}
                                                //                 style={{ paddingBottom: (index == 0) ? 5 : 0 }}
                                                //             >
                                                //                 <News  item={item} prefix={prefix} />
                                                //             </div>
                                                //         ))}
                                                //     </>
                                                // :   <>
                                                //     </>
                                                    <>
                                                        {props.items.map((item, index) => (
                                                            <div key={index} className={`${props.items.length  == 1 ? "col-lg-12" : "col-lg-6"} px-0`}
                                                                // style={{ paddingBottom: (index == 0) ? 20 : 0}}
                                                            >
                                                                <News index={index} item={item} prefix={prefix} length={props.items.length} />
                                                            </div>
                                                        ))}
                                                    </>
                                                )
                                            }
                                            {/* Show News List */}
                                            {
                                                prefix !== "promotion" 
                                                && <div 
                                                    style={{ 
                                                        display: 'flex', 
                                                        flexWrap: 'wrap', 
                                                        justifyContent: 'space-between', 
                                                        width: '100%'}}>
                                                    {
                                                        props.items.map((item, index) => {
                                                            return <UpdatedNews key={index} index={index} item={item} prefix={prefix}></UpdatedNews>
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Display>
                            <Display mobile={true}>
                                <div className="list-new-group">
                                    <div
                                        className="wrap_item_mobile">
                                        <div className="_common_row d-flex flex-wrap">
                                            {props.items.map((item, index) => (
                                                index <= 1 && <div
                                                    className="col-12 _common_col"
                                                    key={index}>
                                                    <NewsMobile item={item} prefix={prefix} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Display>
                        </>
                    )}
                </LazyLoad>
            </div>
        )
    );
};

ListNews.propTypes = {
    sectionTitle: PropTypes.any,
    loading: PropTypes.bool,
    isBorderTop: PropTypes.bool,
    textColor: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            Id: PropTypes.number.isRequired,
        })
    ),
    seeAllPath: PropTypes.string,
};

ListNews.defaultProps = {
    sectionTitle: '',
    loading: false,
    isBorderTop: true,
    textColor: '#ffffff',
    items: [],
    lazy_offset: 200,
    lazy_height: 800,
    seeAllPath: '',
};

export default ListNews;
