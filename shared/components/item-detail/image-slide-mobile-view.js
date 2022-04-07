import WishlistActions from '@spo/redux/wishlist/action';
import { PropTypes } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import constants from '../../config/constants';
import ButtonGridView from '../common/button-grid-view';
import ButtonWishList from '../common/button-wish-list';
import CustomLoader from '../common/CustomLoader';
import IconChevronLeft from './../common/icon-chevron-left';
import IconChevronRight from './../common/icon-chevron-right';
import IconX from './../common/icon-x';
import ListImageScreen from './list-image-screen';

/**
 * ****************************************************************************
 * DUNGNT ImageSlideMobileView CODE
 * image-slide-mobile-view.js
 *
 * description		:
 * created at		:	2020-08-15
 * created by		:	DungNT
 * package			:	spo\shared\components\item-detail\image-slide-mobile-view.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function ImageSlideMobileView(props) {
    const { data, item_id, wishlist, isLoading,slideActive } = props;
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [openImageScreen, setOpenImageScreen] = useState(false);

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {
            setSlideIndex(next);
        },
        afterChange: (current) => {
            if (slideActive > -1) {
                props.resetSlideIndex();
            }
        },
        
    };
    
    const slideEl = useRef(null);
    //----------------------------------------------
    // Effect 
    //----------------------------------------------
    useEffect(() => {
        if(slideActive > -1){
            setSlideIndex(slideActive)
            slideEl.current.slickGoTo(slideActive, true);
        }
    }, [slideActive])
    useEffect(() => {
        if (show) {
            document.getElementById('body').classList.add('fullScreen');
            document.getElementsByTagName('html')[0].classList.add('no-scroll');
        } else {
            document.getElementById('body').classList.remove('fullScreen');
            document
                .getElementsByTagName('html')[0]
                .classList.remove('no-scroll');
        }
    }, [show]);
    useEffect(() => {
        if (openImageScreen) {
            document.getElementsByTagName('html')[0].classList.add('no-scroll');
        } else {
            document
                .getElementsByTagName('html')[0]
                .classList.remove('no-scroll');
        }
    }, [openImageScreen]);
    // Function
    const onShowImage = (index) => {
        slideEl.current.slickGoTo(index, true);

        setShow(true);
    };
    const onAddToWishList = () => {
        let index = wishlist.findIndex((x) => x.id == item_id);
        if (index != -1) {
            dispatch({
                type: WishlistActions.REMOVE_ITEM_WISHLIST,
                id: item_id,
            });
        } else {
            dispatch({
                type: WishlistActions.ADD_WISHLIST,
                item_id: item_id,
            });
        }
    };
    const checkWishlist = () => {
        if (wishlist) {
            let index = wishlist.findIndex((x) => x.id == item_id);
            return index != -1;
        }
        return false;
    };
    return (
        <div className="image-slide-mobile-view ">
            <div id="secMainImg" className="d-center">
                <div className="position-relative w-100">
                    {isLoading ? (
                        <div>
                            {' '}
                            <CustomLoader />{' '}
                        </div>
                    ) : (
                        <Slider ref={slideEl} {...settings}>
                            {data.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setShow(true)}>
                                        <div className="pointer square-container_3_4">
                                            <div
                                                className="square_3_4"
                                                style={{
                                                    background: `url(${item.image_m})`,
                                                }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    )}
                </div>
                <div
                    className={`slide-prev ${slideIndex == 0 ? 'd-none' : ''}`}
                    onClick={() => slideEl.current.slickPrev()}>
                    <IconChevronLeft fontSize={22} />
                </div>
                <div
                    className={`slide-next ${
                        slideIndex == data.length - 1 ? 'd-none' : ''
                    }`}
                    onClick={() => slideEl.current.slickNext()}>
                    <IconChevronRight fontSize={22} />
                </div>
                <div
                    className={`close-scale text-light ${show ? '' : 'd-none'}`}
                    onClick={() => setShow(false)}>
                    <IconX fontSize={32} />
                </div>
            </div>

            <div className="bottom d-flex">
                {/* <div className="d-center info-image">
                    <span>45kg - 165cm</span>
                </div> */}
                {data[slideIndex]?.attributesOfImage?.length > 0 && (
                    <div className="d-around w-100">
                        {data[slideIndex]?.attributesOfImage?.map(
                            (attr, index) => (
                                <span className="px-2 d-center" key={index}>
                                    {`${attr.name_of_attribute}: `}
                                    <b className="px-1">
                                        {attr.attribute_value}
                                    </b>
                                    {
                                        constants.IMAGE_ATTRIBUTE[
                                            attr.attribute_name
                                        ]
                                    }
                                </span>
                            ),
                        )}
                    </div>
                )}
                <div className="wishlist">
                    <ButtonWishList
                        active={checkWishlist()}
                        color="white"
                        onChange={onAddToWishList}
                    />
                </div>
                <div
                    className="showlist"
                    onClick={() => setOpenImageScreen(true)}>
                    <ButtonGridView color="white" />
                </div>
            </div>

            <ListImageScreen
                onShowImage={(index) => onShowImage(index)}
                data={data}
                show={openImageScreen}
                onCloseScreen={() => setOpenImageScreen(false)}
            />
        </div>
    );
}
ImageSlideMobileView.propTypes = {
    data: PropTypes.array,
};
ImageSlideMobileView.defaultProps = {
    data: [],
};
export default ImageSlideMobileView;
