import React, { useRef } from 'react';
import Slider from 'react-slick';
import ImageLoader from './../item-detail/image-loader';
import { PropTypes } from 'prop-types';
import Background from '@spo/components/common/background';
import Image from '@spo/components/common/image';

/**
 * ****************************************************************************
 * DUNGNT ImagesSlide CODE
 * images-slide.js
 *
 * description		:
 * created at		:	2020-09-10
 * created by		:	DungNT
 * package			:	spo\shared\components\item\images-slide.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
const ImageSlide = (props) => {
    const { data, isLoading, item_name } = props;
    // var settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //     vertical: true,
    //     centerMode: true,
    //     centerPadding: 0,
    //     focusOnSelect:true
    // };
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    return (
        <div className="product-thumb slick-vertical position-relative ">
            <div className="_wrap_detail_slide_image">
                {isLoading ? (
                    <div>
                        <ImageLoader width="100%" height="100%" />
                        <ImageLoader width="100%" height="100%" />
                        <ImageLoader width="100%" height="100%" />
                        <ImageLoader width="100%" height="100%" />
                        <ImageLoader width="100%" height="100%" />
                    </div>
                ) : data.length > 5 ? (
                    <div>
                        <div>
                            <Slider asNavFor={ref1.current} ref={ref2}>
                                {data.map((item, index) => {
                                    return (
                                        <div
                                            key={index.toString()}
                                            onClick={() =>
                                                props.onChange(index)
                                            }
                                            className={
                                                props.active == index
                                                    ? 'active'
                                                    : ''
                                            }>
                                            <div className="pointer square-container">
                                                <Image
                                                    seo={item_name}
                                                    className="square"
                                                    src={item.image_s}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                        <div>
                            
                            <Slider
                                slidesToShow={3}
                                swipeToSlide={true}
                                focusOnSelect={true}
                                asNavFor={ref2.current}
                                ref={ref1}>
                                {data.map((item, index) => {
                                    return (
                                        <div
                                            key={index.toString()}
                                            onClick={() =>
                                                props.onChange(index)
                                            }
                                            className={
                                                props.active == index
                                                    ? 'active'
                                                    : ''
                                            }>
                                            <div className="pointer square-container">
                                                <Image
                                                    seo={item_name}
                                                    className="square"
                                                    src={item.image_s}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                ) : (
                    <>
                        {data.map((item, index) => {
                            return (
                                <div
                                    key={index.toString()}
                                    onClick={() => props.onChange(index)}
                                    className={`${
                                        props.active == index ? 'active' : ''
                                    } mb-2`}>
                                    <div className="pointer square-container">
                                        <Image
                                            seo={item_name}
                                            className="square"
                                            src={item.image_s}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
};
ImageSlide.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
};
ImageSlide.defaultProps = { data: [], isLoading: false };
export default ImageSlide;
