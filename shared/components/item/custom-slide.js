import IconChevronLeft from '@spo/components/common/icon-chevron-left';
import IconChevronRight from '@spo/components/common/icon-chevron-right';
import useWindowSize from '@spo/lib/use-window-size';
import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import Display from '../common/display';
import IconChevronLeftBold from '../common/icons/icon-chevron-left-bold';
import IconChevronRightBold from '../common/icons/icon-chevron-right-bold';
import Item from './index';
/**
 * ****************************************************************************
 * HaiDT CustomSlide CODE
 * custom-slide.js
 *
 * description		:
 * created at		:	2021-12-12
 * created by		:	HaiDT
 * package			:	spo\shared\components\item\custom-slide.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
function CustomSlide(props) {
    const { wishlist, items } = props;
    const [settingMobile, setSettingMobile] = useState(props.settings);
    const slideEl = useRef(null);
    const minItemInSlideMobile = 3;

    const [emptyList, setEmptyList] = useState([]);

    useEffect(() => {
        let element = [];
        if (items.length < minItemInSlideMobile) {
            for (
                let index = 0;
                index <= minItemInSlideMobile - items.length;
                index++
            ) {
                element.push(1);
            }
            setSettingMobile({ ...settingMobile, swipe: false });
            setTimeout(() => {
                slideEl.current.slickGoTo(1);
            }, 0);
        }
        setEmptyList(element);
    }, [items.length]);
    return (
        <div className="custom-slide">
            <div className="position-relative ">
                <div className="">
                    <div className="grid-products _common_row">
                        <div className=" w-100 px-0">
                            <Display>
                                <Slider {...props?.settings} ref={slideEl}>
                                    {items.map((item, index) => (
                                        <div
                                            className="_common_col"
                                            key={index}
                                        >
                                            <Item
                                                isViewInSlider={
                                                    props.isViewInSlider
                                                }
                                                wishlist={wishlist}
                                                item={item}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </Display>
                            <Display mobile={true}>
                                <Slider {...settingMobile} ref={slideEl}>
                                    {items.map((item, index) => (
                                        <div
                                            className="_common_col"
                                            key={index}
                                        >
                                            <Item
                                                isViewInSlider={
                                                    props.isViewInSlider
                                                }
                                                wishlist={wishlist}
                                                item={item}
                                            />
                                        </div>
                                    ))}
                                    {emptyList.map((e, i) => {
                                        return (
                                            <div
                                                className="_common_col"
                                                key={i}
                                            ></div>
                                        );
                                    })}
                                </Slider>
                            </Display>
                        </div>
                    </div>
                </div>
                <Display>
                    {items.length > 4 && (
                        <>
                            <div
                                className={`slide-prev no-select`}
                                onClick={() => slideEl.current.slickPrev()}
                            >
                                <IconChevronLeftBold fontSize={16} />
                            </div>
                            <div
                                className={`slide-next no-select `}
                                onClick={() => slideEl.current.slickNext()}
                            >
                                <IconChevronRightBold fontSize={16} />
                            </div>
                        </>
                    )}
                </Display>
            </div>
        </div>
    );
}
export default CustomSlide;
