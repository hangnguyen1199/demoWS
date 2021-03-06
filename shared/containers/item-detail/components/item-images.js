import useOnClickOutside from '@spo/lib/use-onclick-outside';
import useWindowSize from '@spo/lib/use-window-size';
import IconZoomIn from '@spo/components/common/icon-zoom-in';
import Image from '@spo/components/common/image';
import constants from '@spo/config/constants';
import { PropTypes } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';
import Slider from 'react-slick';
import IconChevronLeft from '@spo/components/common/icon-chevron-left';
import IconChevronRight from '@spo/components/common/icon-chevron-right';
import ImageLoader from './../../../components/item-detail/image-loader';
import Display from './../../../components/common/display';
import IconChevronLeftBold from '../../../components/common/icons/icon-chevron-left-bold';
import IconChevronRightBold from '../../../components/common/icons/icon-chevron-right-bold';
import ImagesLoader from './loader/images-loader';
/**
 * ****************************************************************************
 * DUNGNT ItemImages CODE
 * item-images.js
 *
 * description		:
 * created at		:	2020-09-10
 * created by		:	DungNT
 * package			:	spo\shared\containers\item-detail\components\item-images.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function ItemImages(props) {
    const perSlideWidth = 88;
    const slideGap = 5;
    const windowSize = useWindowSize();
    let isLoading = false;
    const intl = useIntl();
    const { images, item_name, slideIndex } = props;
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const wrapThumbRef = useRef(null);
    const [image_index, setImageIndex] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const [maxSlide, setMaxSlide] = useState(5)
    useEffect(() => {
        if(wrapThumbRef?.current){
            let _maxSlide = Number.parseInt(wrapThumbRef?.current?.clientHeight / 110, 10)+1
            if(typeof _maxSlide == 'number'){
                setMaxSlide(_maxSlide)
            }
        }
    }, [wrapThumbRef?.current])
    // useEffect(() => {
    //   console.log("wrapThumbRef?.current?.clientHeight",wrapThumbRef?.current?.clientHeight)
    // }, [wrapThumbRef?.current])
    
    useEffect(() => {
        setSlideWidth(
            images.length > 5
                ? 5 * perSlideWidth * 5 * slideGap
                : images.length * (perSlideWidth + slideGap)
        );
    }, [images.length]);
    const settingMain = {
        dots: false,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: ref2.current,
    };
    const settingSub = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: images.length > maxSlide ? maxSlide : images.length,
        slidesToScroll: 1,
        asNavFor: ref1.current,
        centerMode: false,
        // arrows: true,
        vertical: true,
        // nextArrow: <IconChevronRight />,
        // prevArrow: <IconChevronLeft />,
        afterChange: (current) => {
            setImageIndex(current);
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                },
            },
        ],
    };
    const settingSubMobile = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: images.length > 5 ? 5 : images.length,
        slidesToScroll: 1,
        asNavFor: ref1.current,
        centerMode: false,
        // arrows: true,
        vertical: false,
        // nextArrow: <IconChevronRight />,
        // prevArrow: <IconChevronLeft />,
        afterChange: (current) => {
            setImageIndex(current);
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                },
            },
        ],
    };
    useEffect(() => {
        setTimeout(() => {
            let index = images.findIndex((x) => x.Thumb == slideIndex);
            if (index > -1) {
                onGoto(index);
            }
        }, 100);
    }, [slideIndex]);
    useEffect(() => {
        if (ref1.current && ref1.current != null) {
            ref1.current.slickGoTo(0);
        }
    }, [ref1.current]);
    const onGoto = (number) => {
        if (ref1.current && ref1.current != null) {
            ref1.current.slickGoTo(number);
        }
    };
    const handlePrev = (e) => {
        e.preventDefault();
        ref1.current.slickPrev();
    };
    const handleNext = (e) => {
        e.preventDefault();
        ref1.current.slickNext();
    };

    return (
        <>
            <div className="w-100">
                <div className="d-flex  wrap_detail_image">
                    <Display>
                        {props.loadingProductDetail ? (
                            <div className="wrap_product-thumb">
                                <div className="block_inside"></div>
                                <div
                                    className="wrap_float_thumb"
                                    ref={wrapThumbRef}
                                >
                                    <ImagesLoader />
                                </div>
                            </div>
                        ) : (
                            <div className="wrap_product-thumb">
                                <div className="block_inside"></div>
                                <div
                                    className="wrap_float_thumb"
                                    ref={wrapThumbRef}
                                >
                                    <div className="product-thumb position-relative ">
                                        {false ? (
                                            <div className="wrap_no_slide">
                                                {images.map((item, index) => {
                                                    return (
                                                        <div
                                                            onClick={() =>
                                                                onGoto(index)
                                                            }
                                                            key={index}
                                                            className={`d-center px-1 ${
                                                                slideIndex ==
                                                                item?.Thumb
                                                                    ? '_active'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <div className="sub_thumb">
                                                                <div className=" container-raito">
                                                                    <div className="raito">
                                                                        <Image
                                                                            lazy_offset={
                                                                                400
                                                                            }
                                                                            lazy_height={
                                                                                20
                                                                            }
                                                                            lazyLoad={
                                                                                false
                                                                            }
                                                                            seo={
                                                                                item_name
                                                                            }
                                                                            className="object-fit-cover pointer"
                                                                            src={
                                                                                item?.Thumb
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <Slider {...settingSub} ref={ref2}>
                                                {images.map((item, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={() =>
                                                                onGoto(index)
                                                            }
                                                            className="d-center"
                                                        >
                                                            <div className="sub_thumb">
                                                                <div className=" container-raito">
                                                                    <div className="raito">
                                                                        <Image
                                                                            lazyLoad={
                                                                                false
                                                                            }
                                                                            seo={
                                                                                item_name
                                                                            }
                                                                            className="object-fit-cover pointer"
                                                                            src={
                                                                                item?.Thumb
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </Slider>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Display>
                    <div className="d-center product-details-img d-none d-lg-flex">
                        {!props.loadingProductDetail ? (
                            <>
                                <Slider
                                    ref={ref1}
                                    {...settingMain}
                                    className="stretch_slide"
                                >
                                    {images.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className=" overflow-hidden "
                                            >
                                                <div className="img-ref-cart img-ref-cart-min">
                                                    <div className="container-raito ">
                                                        <div className="raito">
                                                            <Image
                                                                lazy_offset={
                                                                    400
                                                                }
                                                                lazy_height={
                                                                    800
                                                                }
                                                                lazyLoad={false}
                                                                seo={item_name}
                                                                className=" w-100 h-100 object-fit-cover pointer "
                                                                src={
                                                                    item?.Origin
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Slider>
                                <div className="image_quantity">
                                    {`${image_index + 1}/${images.length}`}
                                </div>
                                <Display>
                                    <div
                                        className={`pointer arrow left_arrow`}
                                        onClick={handlePrev}
                                    >
                                        <IconChevronLeftBold fontSize={16} />
                                    </div>
                                    <div
                                        className={`pointer arrow right_arrow`}
                                        onClick={handleNext}
                                    >
                                        <IconChevronRightBold fontSize={16} />
                                    </div>
                                </Display>
                            </>
                        ) : (
                            <div className="loader-img-big">
                                <div className="placeholder-content">
                                    <div className="placeholder-content_item"></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Display mobile={true}>
                        {props.loadingProductDetail ? (
                            <div>
                                <div
                                    className="product-thumb position-relative d-flex flex-row justify-content-center"
                                    // style={{ maxWidth: slideWidth }}
                                >
                                    <ImagesLoader />
                                </div>
                            </div>
                        ) : (
                            <div className="wrap_product-thumb">
                                <div
                                    className="product-thumb position-relative "
                                    style={{ maxWidth: slideWidth }}
                                >
                                    {false ? (
                                        <div className="wrap_no_slide">
                                            {images.map((item, index) => {
                                                return (
                                                    <div
                                                        onClick={() =>
                                                            onGoto(index)
                                                        }
                                                        key={index}
                                                        className={`d-center px-1 ${
                                                            slideIndex ==
                                                            item?.Thumb
                                                                ? '_active'
                                                                : ''
                                                        }`}
                                                    >
                                                        <div className="sub_thumb">
                                                            <div className=" container-raito">
                                                                <div className="raito">
                                                                    <Image
                                                                        lazy_offset={
                                                                            400
                                                                        }
                                                                        lazy_height={
                                                                            20
                                                                        }
                                                                        lazyLoad={
                                                                            false
                                                                        }
                                                                        seo={
                                                                            item_name
                                                                        }
                                                                        className="object-fit-cover pointer"
                                                                        src={
                                                                            item?.Thumb
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <Slider
                                            {...settingSubMobile}
                                            ref={ref2}
                                        >
                                            {images.map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() =>
                                                            onGoto(index)
                                                        }
                                                        className="d-center px-1"
                                                    >
                                                        <div className="sub_thumb">
                                                            <div className=" container-raito">
                                                                <div className="raito">
                                                                    <Image
                                                                        // lazy_offset={
                                                                        //     400
                                                                        // }
                                                                        // lazy_height={20}
                                                                        lazyLoad={
                                                                            false
                                                                        }
                                                                        seo={
                                                                            item_name
                                                                        }
                                                                        className="object-fit-cover pointer"
                                                                        src={
                                                                            item?.Thumb
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </Slider>
                                    )}
                                </div>
                            </div>
                        )}
                    </Display>
                </div>
            </div>
        </>
    );
}

ItemImages.propTypes = {
    images: PropTypes.array,
    isLoading: PropTypes.bool,
    isSales: PropTypes.bool,
    isGoldenHour: PropTypes.bool,
    isNew: PropTypes.bool,
    isTop: PropTypes.bool,
    isTrend: PropTypes.bool,
};
ItemImages.defaultProps = {
    images: [],
    isLoading: false,
    isSales: false,
    isGoldenHour: false,
    isNew: false,
    isTop: false,
    isTrend: false,
};
export default ItemImages;
