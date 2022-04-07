import constants from '@spo/config/constants';
import useWindowSize from '@spo/lib/use-window-size';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import LazyLoad from 'react-lazyload';
import { useDispatch } from 'react-redux';
import { scrollTop } from '../../library/helper';
import Display from '../common/display';
import useCustomRoute from './../../library/use-custom-route';
import IconChevronRight from './../common/icon-chevron-right';
import TopLoader from '../../containers/home/components/loader/search-top-loader';

const Item = dynamic(() => import('@spo/components/item'), { ssr: false });
const CustomSlide = dynamic(() => import('@spo/components/item/custom-slide'), {
    ssr: false,
});

const ItemLoader = dynamic(() => import('@spo/components/item/item-loader'), {
    ssr: false,
});
const CountDownTimeFlip = dynamic(
    () => import('@spo/components/spo-layout/flip-clock'),
    { ssr: false },
);

const ListItems = (props) => {
    const windowSize = useWindowSize();
    const router = useRouter();
    const { lazy_offset, lazy_height } = props;
    const dispatch = useDispatch();
    const onGoPath = (path) => {
        if (path) {
            useCustomRoute(dispatch, path);
        }
    };
    const renderSlide = () => {
        return <div className={`${props.isFullWidth ? '' : ''}`}>
            <div>
                <CustomSlide
                    items={props.items}
                    settings={props.settings}
                    isViewInSlider={props.isViewInSlider}
                    className={props.className}
                />
            </div>
        </div>
    }
    const renderGrid = () => {
        return <div
            className={`grid-products grid--view-items ${props.isFullWidth ? '' : ''}`}>
            <div
                className={` ${windowSize &&
                    windowSize.width &&
                    windowSize.width >=
                    constants.WINDOW_SIZE.MEDIUM
                    ? 'px-0'
                    : 'wrap_item_mobile'
                }`}>
                <div className="_common_row">
                    {props.items.map((item, index) => (
                        <div
                            className={`${props.typeDisplay == 5
                                ? props.className
                                : 'col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xlg-2 px-3 _common_col'
                            }`}
                            key={index}>
                            <Item
                                key={index}
                                class={props.className}
                                item={item}
                                type={props.type}
                                isShowSaleOrGoldenHour={
                                    props.isShowSaleOrGoldenHour
                                }
                                typeDisplay={
                                    props.typeDisplay
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    }
    const handleRedirect = (path, e, params) => {
        if (path) {
            e.preventDefault();
            e.stopPropagation();
            useCustomRoute(dispatch, path, params, null, null, 3)
            scrollTop()
        }
    }
    return (
        (props.loading || props.items?.length > 0) && (
            <div
                className={`section ${props.paddingTop} w-100 ${props.isBorderTop ? 'border-top' : ''
                }`}
            // style={{ paddingTop: 20 }}
            >
                {props?.sectionTitle && (
                    <div className="section-header text-center font-title list-item-header ">
                        <div className={`list-item-header-content`}>
                            <div className="list-item-header-content-row">
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
                                                fontWeight   : 600,
                                                textTransform: 'uppercase',
                                            }}>
                                            <span
                                                onClick={(e) =>
                                                    handleRedirect(props.seeAllPath, e, props.params)
                                                }>
                                                {props.sectionTitle}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {props.isShowCountTime && (
                                    <div className="px-3">
                                        <Display>
                                            <CountDownTimeFlip
                                                endTime={
                                                    props.items[0].PromotionTo
                                                }
                                                fontSize={20}
                                                background={'#FF2C00'}
                                            />
                                        </Display>
                                        <Display mobile={true}>
                                            <CountDownTimeFlip
                                                endTime={
                                                    props.items[0].PromotionTo
                                                }
                                                fontSize={15}
                                                background={'#FF2C00'}
                                            />
                                        </Display>
                                    </div>
                                )}
                            </div>
                            {props.seeAllPath &&
                                (
                                    <Link
                                        onClick={(e) => handleRedirect(props.seeAllPath, e, props.params)}
                                        prefetch={false}
                                        href={{
                                            pathname: props.seeAllPath,
                                            query   : props.params
                                        }}>
                                        <div className="see-all pointer d-flex hover-color-svg">
                                            Xem thêm &nbsp;{' '}
                                            <Display>
                                                <IconChevronRight fontSize={16} />
                                            </Display>
                                            <Display mobile={true}>
                                                <IconChevronRight fontSize={13} />
                                            </Display>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                )}
                <div className="clearfix">
                    <>
                        {props.loading ? (
                            <div
                                className={`grid-products grid--view-items ${props.isFullWidth ? '' : ''
                                }`}>
                                <TopLoader/>
                            </div>
                        ) : <>
                            {
                                props.isViewInSlider ? <>
                                    <Display>
                                        {
                                            props.items.length > 5 ? renderSlide() : renderGrid()
                                        }
                                    </Display>
                                    <Display mobile={true}>
                                        {
                                            props.items.length > 0 ? renderSlide() : renderGrid()
                                        }


                                    </Display>

                                </> : renderGrid()
                            }
                        </>}
                    </>
                </div>
            </div>
        )
    );
};

ListItems.propTypes = {
    sectionTitle          : PropTypes.any,
    typeView              : PropTypes.string,
    className             : PropTypes.string,
    backgroundHeader      : PropTypes.string,
    isViewInSlider        : PropTypes.bool,
    settings              : PropTypes.object,
    loading               : PropTypes.bool,
    isShowMore            : PropTypes.bool,
    isFullWidth           : PropTypes.bool,
    isBorderTop           : PropTypes.bool,
    isShowSaleOrGoldenHour: PropTypes.bool,
    seeAllPath            : PropTypes.string,
    typeDisplay           : PropTypes.number,
    items                 : PropTypes.arrayOf(
        PropTypes.shape({
            ProductId   : PropTypes.number.isRequired,
            Name        : PropTypes.string.isRequired,
            Thumb       : PropTypes.string.isRequired,
            hoverImage  : PropTypes.string,
            SKU         : PropTypes.string,
            MaxPrice    : PropTypes.number,
            MinPrice    : PropTypes.number.isRequired,
            isSales     : PropTypes.bool,
            isTop       : PropTypes.bool,
            isGoldenHour: PropTypes.bool,
            isTrend     : PropTypes.bool,
            isNew       : PropTypes.bool,
        }),
    ),
    icon: PropTypes.object,
};

ListItems.defaultProps = {
    sectionTitle: '',
    typeView    : constants.TYPE_VIEW_ITEM.GRID,
    className   :
        'col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xlg-2-5 px-3 _common_col',
    isViewInSlider        : false,
    loading               : false,
    isShowMore            : false,
    isBorderTop           : true,
    isShowCountTime       : false,
    isShowSaleOrGoldenHour: false,
    textColor             : '#ffffff',
    seeAllPath            : '',
    typeDisplay           : 5,
    settings              : {
        dots          : false,
        infinite      : true,
        speed         : 500,
        slidesToShow  : 5,
        slidesToScroll: 1,
        centerMode    : false,
        centerPadding : '0px',
        responsive    : [
            {
                breakpoint: 1441,
                settings  : {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 992,
                settings  : {
                    slidesToShow : 2,
                    centerMode   : true,
                    centerPadding: '40px',
                },
            },
            {
                breakpoint: 768,
                settings  : {
                    slidesToShow : 2,
                    centerMode   : true,
                    centerPadding: '40px',
                },
            },
            {
                breakpoint: 576,
                settings  : {
                    slidesToShow : 2,
                    centerMode   : true,
                    slidesToScroll: 2,
                    swipeToSlide: true,
                    centerPadding: '40px',
                },
            },
        ],
    },
    items         : [],
    scrollLoad    : false,
    scrollLoadStop: false,
    lazy_offset   : 200,
    lazy_height   : 800,
    icon          : {},
};

export default ListItems;
