import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import IconChevronLeft from '@spo/components/common/icon-chevron-left';
import IconChevronRight from '@spo/components/common/icon-chevron-right';
import useWindowSize from '@spo/lib/use-window-size';
import constants from '@spo/config/constants';
import Live from './live';
import Display from '../common/display';
/**
 * ****************************************************************************
 * HaiDT CustomSlideLive CODE
 * custom-slide.js
 *
 * description		:
 * created at		:	2020-11-13
 * created by		:	HaiDT
 * package			:	spo\shared\components\item\custom-slide-live.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
function CustomSlideLive(props) {
    const windowSize = useWindowSize();
    const { wishlist, items } = props;
    const slideEl = useRef(null);
    const slideEl_mobile = useRef(null);
    return (
        <div className="custom-slide">
            {windowSize.width >= constants.WINDOW_SIZE.MEDIUM ? (
                <div className="position-relative ">
                    <div className="overflow-hidden _common_row">
                        <div className=" w-100 px-0">
                            <Slider {...props.settings} ref={slideEl}>
                                {items.map((item, index) => (
                                    <div className="_common_col" key={index}>
                                        <Live />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <Display>
                        {items.length > 4 && (
                            <>
                                <div className="show-arrow">
                                    <div
                                        className={`slide-prev no-select`}
                                        onClick={() =>
                                            slideEl.current.slickPrev()
                                        }>
                                        <IconChevronLeft fontSize={22} />
                                    </div>
                                    <div
                                        className={`slide-next no-select `}
                                        onClick={() =>
                                            slideEl.current.slickNext()
                                        }>
                                        <IconChevronRight fontSize={22} />
                                    </div>
                                </div>
                            </>
                        )}
                    </Display>
                </div>
            ) : (
                <div className="position-relative ">
                    <div className="overflow-hidden">
                        <div className="">
                            {items.length > 2 ? (
                                <div className=" w-100 px-0">
                                    <div className="_common_row">
                                        <Slider
                                            {...props.settings}
                                            ref={slideEl_mobile}>
                                            {items.map((item, index) => (
                                                <div
                                                    className="_common_col"
                                                    key="index">
                                                    <Live />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            ) : (
                                <div className=" w-100 d-flex flex-wrap px-0">
                                    <div className="_common_row">
                                        {props.items.map((item, index) => (
                                            <div
                                                className="_common_col"
                                                key={index}>
                                                <Live />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Display>
                        {items.length > 2 && (
                            <>
                                <div className="show-arrow">
                                    <div
                                        className={`slide-prev no-select`}
                                        onClick={() =>
                                            slideEl.current.slickPrev()
                                        }>
                                        <IconChevronLeft fontSize={22} />
                                    </div>
                                    <div
                                        className={`slide-next no-select `}
                                        onClick={() =>
                                            slideEl.current.slickNext()
                                        }>
                                        <IconChevronRight fontSize={22} />
                                    </div>
                                </div>
                            </>
                        )}
                    </Display>
                </div>
            )}
        </div>
    );
}
export default CustomSlideLive;
