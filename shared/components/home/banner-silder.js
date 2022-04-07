const IconChevronLeft = dynamic(
    () => import('@spo/components/common/icon-chevron-left'),
    {
        ssr: false,
    }
);
const IconChevronRight = dynamic(
    () => import('@spo/components/common/icon-chevron-right'),
    {
        ssr: false,
    }
);
const Image = dynamic(() => import('@spo/components/common/image'), {
    ssr: false,
});
const Display = dynamic(() => import('../common/display'), {
    ssr: false,
});

// import IconChevronLeft from '@spo/components/common/icon-chevron-left';
// import IconChevronRight from '@spo/components/common/icon-chevron-right';
// import Image from '@spo/components/common/image';
import useCustomRoute from '@spo/lib/use-custom-route';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
// import Display from '../common/display';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import CustomFrame from './../common/custom-frame';
import BannerLoader from '../../containers/home/components/loader/banner-slider-loader';
/**
 * ****************************************************************************
 * HaiDT BannerSilder CODE
 * banner-silder.js
 *
 * description		:
 * created at		:	2020-08-23
 * created by		:	HaiDT
 * package			:	spo\shared\components\home\banner-silder.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */

function BannerSilder(props) {
    const { settings, loading } = props;
    const dispatch = useDispatch();
    const [slideIndex, setSlideIndex] = useState(0);
    settings.beforeChange = (current, next) => {
        setSlideIndex(next);
    };
    const slideEl = useRef(null);
    // Effect
    return (
        <div className="banner-silder px-0">
            {loading ? (
                <BannerLoader />
            ) : (
                <div className="">
                    {props.data ? (
                        <Slider ref={slideEl} {...settings}>
                            {props.data.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Link href={{ pathname: item.Link }}>
                                            <a>
                                                {/* <CustomFrame ratio={760/1920}>
                                                <Image
                                                    title="fm-style"
                                                    seo="banner-fm"
                                                    className={`${
                                                        item.Link
                                                            ? 'pointer'
                                                            : ''
                                                    } w-100 h-100`}
                                                    src={item.WebImage}
                                                    lazy_offset={0}
													lazyLoad={false}
                                                />
                                            </CustomFrame> */}
                                                <Display>
                                                    <Image
                                                        title="fm-style"
                                                        seo="banner-fm"
                                                        className={`${
                                                            item.Link
                                                                ? 'pointer'
                                                                : ''
                                                        } w-100 h-100`}
                                                        src={item.WebImage}
                                                        lazy_offset={0}
                                                        lazyLoad={false}
                                                    />
                                                </Display>
                                                <Display mobile={true}>
                                                    <Image
                                                        title="fm-style"
                                                        seo="banner-fm"
                                                        className={`${
                                                            item.Link
                                                                ? 'pointer'
                                                                : ''
                                                        } w-100 h-100`}
                                                        src={item.Image}
                                                        lazy_offset={0}
                                                        lazyLoad={false}
                                                    />
                                                </Display>
                                            </a>
                                        </Link>
                                    </React.Fragment>
                                );
                            })}
                        </Slider>
                    ) : null}
                </div>
            )}

            <Display show={props?.data?.length > 1}>
                <div
                    className={`arrow slide-prev pointer`}
                    onClick={() => slideEl.current.slickPrev()}
                >
                    <IconChevronLeft fontSize={22} color={'black'} />
                </div>
                <div
                    className={`arrow slide-next pointer`}
                    onClick={() => slideEl.current.slickNext()}
                >
                    <IconChevronRight fontSize={22} color={'black'} />
                </div>
            </Display>
        </div>
    );
}
BannerSilder.propTypes = {
    setting: PropTypes.object,
};
BannerSilder.defaultProps = {
    settings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        // beforeChange : (current, next) => {
        //     setSlideIndex(next);
        // },
    },
    data: [],
    loading: false,
};
export default BannerSilder;
