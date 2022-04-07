import constants from '@spo/config/constants';
import useWindowSize from '@spo/lib/use-window-size';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import LazyLoad from 'react-lazyload';
import { useDispatch } from 'react-redux';

const Item = dynamic(() => import('@spo/components/item'), { ssr: false });
const CustomSlideLive = dynamic(() => import('@spo/components/item/custom-slide-live'), {
    ssr: false,
});
const Display = dynamic(() => import('@spo/components/common/display'), {
    ssr: false,
});
const InfiniteScroll = dynamic(
    () => import('react-infinite-scroll-component'),
    { ssr: false },
);
const LoaderMore = dynamic(() => import('@spo/components/common/loader-more'), {
    ssr: false,
});
const ItemLoader = dynamic(() => import('@spo/components/item/item-loader'), {
    ssr: false,
});
const ButtonLight = dynamic(() => import('./../common/button-light'), {
    ssr: false,
});
const Image = dynamic(() => import('@spo/components/common/image'), {
    ssr: false,
});
const CountDownTime = dynamic(
    () => import('@spo/components/spo-layout/count-down-time'),
    { ssr: false },
);
const IconChevronLeft = dynamic(
    () => import('@spo/components/common/icon-chevron-left'),
    {
        ssr: false,
    },
);
const IconChevronRight = dynamic(
    () => import('@spo/components/common/icon-chevron-right'),
    {
        ssr: false,
    },
);

const ListLive = (props) => {
    const windowSize = useWindowSize();
    const router = useRouter();
    const {
        sectionTitle,
        sectionType,
        wishlist,
        lazy_offset,
        lazy_height,
    } = props;
    const dispatch = useDispatch();
    return (
        (props.loading || props.items?.length > 0) && (
            <div className={`section w-100 ${props.isBorderTop ? 'border-top' : ''}`} style={{paddingTop: 20, paddingBottom: 20}}>
                {props?.sectionTitle && (
                    <div className="section-header text-center font-title list-item-header ">
                        <div className={`list-item-header-content`}>
                            <div className="hover-color-svg d-flex" style={{alignItems: 'center'}}>
                                <div className="" style={{color: props.textColor, fontWeight: 500, textTransform: 'uppercase'}}>{props.sectionTitle}</div>
                            </div>
                        </div>
                    </div>
                )}
                <LazyLoad height={lazy_height} offset={lazy_offset}>
                    {props.loading ? (
                        <div className="grid-products grid--view-items ">
                            <div className="flex-wrap">
                                <ItemLoader className={props.className} />
                                <ItemLoader className={props.className} />
                                <ItemLoader className={props.className} />
                                <ItemLoader className={props.className} />
                            </div>
                        </div>
                    ) : (
                        <div className="">
                            <div>
                                <CustomSlideLive
                                    items={props.items}
                                    settings={props.settings}
                                    isViewInSlider={true}
                                    wishlist={wishlist}
                                    className={props.className}
                                />
                            </div>
                        </div>
                    )
                    }
                </LazyLoad>
            </div>
        )
    );
};

ListLive.propTypes = {
    sectionTitle  : PropTypes.any,
    typeView      : PropTypes.string,
    className     : PropTypes.string,
    isViewInSlider: PropTypes.bool,
    settings      : PropTypes.object,
    loading       : PropTypes.bool,
    isShowMore    : PropTypes.bool,
    isBorderTop   : PropTypes.bool,
    items         : PropTypes.arrayOf(
        PropTypes.shape({
            id          : PropTypes.number.isRequired,
            name        : PropTypes.string.isRequired,
            image       : PropTypes.string.isRequired,
            hoverImage  : PropTypes.string,
            description : PropTypes.string,
            oldPrice    : PropTypes.number,
            price       : PropTypes.number.isRequired,
            start       : PropTypes.number,
            isSales     : PropTypes.bool,
            isHot       : PropTypes.bool,
            isNew       : PropTypes.bool,
            isPopular   : PropTypes.bool,
            salesPercent: PropTypes.number,
        }),
    ),
    icon: PropTypes.object,
};

ListLive.defaultProps = {
    sectionTitle  : '',
    typeView      : constants.TYPE_VIEW_ITEM.GRID,
    className     : 'col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xlg-2 px-1',
    isViewInSlider: false,
    loading       : false,
    isShowMore    : false,
    isBorderTop   : true,
    type          : '',
    textColor     : '#ffffff',
    settings      : {
        dots          : false,
        infinite      : true,
        speed         : 500,
        slidesToShow  : 4,
        slidesToScroll: 1,
        responsive    : [
            {
                breakpoint: 1441,
                settings  : {
                    slidesToShow: 4,
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
                    slidesToShow : 1,
                    centerMode   : true,
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
    icon          : {
    }
};

export default ListLive;
