import React from 'react';
import Slider from 'react-slick';
import ItemChild from './item-child';
import Display from '@spo/components/common/display';
import IconChevronLeftBold from './../common/icons/icon-chevron-left-bold';
import IconChevronRightBold from './../common/icons/icon-chevron-right-bold';

export default function CustomSlideChild(props) {
    const { wishlist, items, NumItemInRow = 5 } = props;
    const slideEl = React.useRef(null);
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: NumItemInRow,
        slidesToScroll: NumItemInRow,
        autoplay: false,
        autoplaySpeed: 2000,
    };
    return (
        <div className='custom-slide'>
            <div className="position-relative ">
                <div>
                    <Slider {...settings} ref={slideEl}>
                        {items.map((value, key) => {
                            return <div className=" _common_col_child" key={key}>
                                <ItemChild value={value} />
                            </div>
                        })}
                    </Slider>
                </div>
                <Display>
                    {items.length > 5 && (
                        <>
                            <div
                                className={`slide-prev no-select`}
                                onClick={() => slideEl.current.slickPrev()}>
                                <IconChevronLeftBold fontSize={16} />
                            </div>
                            <div
                                className={`slide-next no-select `}
                                onClick={() => slideEl.current.slickNext()}>
                                <IconChevronRightBold fontSize={16} />
                            </div>
                        </>
                    )}
                </Display>
            </div>
        </div>
    );
}

