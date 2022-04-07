import React from 'react'
import CustomFrame from '@spo/components/common/custom-frame';
import Image from '@spo/components/common/image';
import Display from '@spo/components/common/display';
import CustomSlide from '../item/custom-slide';
import CustomSlideChild from './item-slide-child';
import UseWindowSize from '@spo/lib/use-window-size';
import constants from '../../config/constants';
import Item from '../item';
import ItemLoader from '../item/item-loader';

function ListItemCollection(props) {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: false,
        autoplaySpeed: 2000,
    };
    const { items } = props;
    const renderSlide = () => {
        return <div className={`${props.isFullWidth ? '' : ''}`}>
            <div>
                <CustomSlide
                    items={props.items}
                    settings={settings}
                    isViewInSlider={props.isViewInSlider}
                    className={props.className}
                />
            </div>
        </div>
    }
    const renderGrid = () => {
        return <div
            className={`grid-products grid--view-items ${props.isFullWidth ? '' : ''
            }`}>
            <div
                className={` ${UseWindowSize &&
                    UseWindowSize.width &&
                    UseWindowSize.width >=
                    constants.WINDOW_SIZE.MEDIUM
                    ? 'px-0'
                    : 'wrap_item_mobile'
                }`}>
                <div className="_common_row">
                    {props.items.map((item, index) => (
                        <div
                            className={`${props.typeDisplay == 5
                                ? props.className
                                : 'col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xlg-2 px-3 _common_col'
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
    return (
        <div className='section  w-100'>
            <div className='list-item-collection'>
                <div className='list-item-collection-option'>
                    <Image className="w-100 h-100" lazyLoad={false} src={'/images/category/category-update.png'} />
                </div>
                <div className='list-item-collection-slide'>
                    <div className="clearfix">
                        <>
                            {props.loading ? (
                                <div
                                    className={`grid-products grid--view-items ${props.isFullWidth ? '' : ''
                                    }`}>
                                    <div className="flex-wrap">
                                        <ItemLoader className={props.className} />
                                        <ItemLoader className={props.className} />
                                        <ItemLoader className={props.className} />
                                        <ItemLoader className={props.className} />
                                        <ItemLoader className={props.className} />
                                    </div>
                                </div>
                            ) : <>
                                {
                                    props.isViewInSlider ? <>
                                        <Display>
                                            {
                                                props.items.length >3 ? renderSlide() : renderGrid()
                                            }
                                        </Display>
                                    </> : renderGrid()
                                }
                            </>}
                        </>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListItemCollection;