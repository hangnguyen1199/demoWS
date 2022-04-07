const Image = dynamic(() => import('@spo/components/common/image'), {
    ssr: false,
});
const Price = dynamic(() => import('@spo/components/utility/price'), {
    ssr: false,
});
const ButtonDark = dynamic(() => import('./../common/button-dark'), {
    ssr: false,
});
const QuantityBox = dynamic(() => import('./../item/quantity-box'), {
    ssr: false,
});
const SimpleModal = dynamic(() => import('../common/simple-modal'), {
    ssr: false,
});
const RemainingSold = dynamic(
    () => import('@spo/components/utility/remaining-sold'),
    {
        ssr: false,
    },
);
import CartActions from '@spo/redux/cart/action';
import dynamic from 'next/dynamic';
import { PropTypes } from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import CustomFrame from './../common/custom-frame';
import ColorBoxImage from './../item/color-box-image';
import SizeBoxDetail from './../item/size-box-detail';
import Utils from './../../utils/utils';
import Information from '../../containers/item-detail/components/information';
import CartAdding from '../../containers/item-detail/components/cart-adding';
import ItemImages from '../../containers/item-detail/components/item-images';
import $ from 'jquery';
import EventRegister ,{ SHOW_POPUP_DATA_DETAIL} from './../../utils/EventRegister';
/**
 * ****************************************************************************
 * HaiDT ModalPickStock CODE
 * modal-pick-stock.js
 *
 * description		:
 * created at		:	2021-12-12
 * created by		:	HaiDT
 * package			:	spo\shared\components\spo-layout\modal-pick-stock.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
function ModalPickStock (props) {
    const dispatch = useDispatch();
    const {
        show,
        data: { currentItem },
    } = props;
    const imgRef = useRef(false)
    const [active, setActive] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [sizeActive, setSizeActive] = useState(null);
    const [colorActive, setColorActive] = useState(null);
    const [productEvent, setProductEvent] = useState(null);

    // useEffect(() => {
    // 	if (sizeActive != null && colorActive != null) {
    // 		setActive(true);
    // 	} else {
    // 		setActive(false);
    // 	}
    // }, [colorActive, sizeActive]);
    // useEffect(() => {
    // 	if (currentItem?.Id) {
    // 		setColorActive(currentItem?.info?.ColorId);
    // 		loadDataByColor(currentItem?.info?.ColorId)
    // 	}
    // }, [currentItem?.info?.ProductId]);

    useEffect(() => {
        if (imgRef.current?.clientHeight) {
            $(".modal-pick-stock .body").css("max-height", imgRef.current?.clientHeight + 20)
        }

    }, [currentItem?.info?.ProductId])

    //----------------------------------------------
    // Function
    //----------------------------------------------
    // const loadDataByColor = (colorId) => {
    // 	dispatch({
    // 		type: CartActions.LOAD_CURRENT_ITEM_STOCK,
    // 		data: {
    // 			ProductId: currentItem.Id,
    // 			ColorId: colorId,
    // 		},
    // 		success: (resData) => {
    // 			if (resData.SizeId) {
    // 				setSizeActive(resData.SizeId);
    // 				dispatch({
    // 					type: CartActions.LOAD_CURRENT_ITEM_STOCK,
    // 					data: {
    // 						ProductId: currentItem.Id,
    // 						ColorId: colorId,
    // 						SizeId: resData.SizeId,
    // 					},
    // 				});
    // 			}
    // 		},
    // 	});
    // };
    const onClose = () => {
        dispatch({ type: CartActions.TOGGLE_PICK_STOCK });
        // setSizeActive(null);
        // setColorActive(null);
        // setActive(null);
        // setQuantity(1);
    };
    // const onChangeQuantity = (number) => {
    // 	setQuantity(number);
    // };
    // const onAddCart = () => {
    // 	let productInfo = {};
    // 	productInfo.ProductId = currentItem.Id;
    // 	productInfo.ColorId = colorActive;
    // 	productInfo.SizeId = sizeActive;
    // 	productInfo.Quantity = quantity;
    // 	dispatch({
    // 		type: CartActions.ADD_CART_BY_STOCK,
    // 		data: { productInfo: productInfo },
    // 	});
    // 	setSizeActive(null);
    // 	setColorActive(null);
    // 	setActive(null);
    // 	setQuantity(1);
    // };
    // const onChangeSize = (sizeId) => {
    // 	setSizeActive(sizeId);
    // 	setQuantity(1);
    // 	dispatch({
    // 		type: CartActions.LOAD_CURRENT_ITEM_STOCK,
    // 		data: {
    // 			ProductId: currentItem.Id,
    // 			ColorId: colorActive,
    // 			SizeId: sizeId,
    // 		},
    // 	});
    // };
    // const onChangeColor = (item) => {
    // 	setColorActive(item.ColorId);
    // 	loadDataByColor(item.ColorId);
    // 	setQuantity(1);
    // };
    const [slideIndex, setSlideIndex] = useState(-1);
    const onChangeSlide = (val) => {
        setSlideIndex(val);
    };
    const resetSlideIndex = () => {
        setSlideIndex(-1);
    };
    const onClickChat = () => {
        // TODO
        window.location.href = 'https://www.facebook.com/fm.com.vn';
    };

    useEffect(() => {
        let reloadEvent=EventRegister.on(SHOW_POPUP_DATA_DETAIL,(params)=>{
            setProductEvent(params.ProductId)
        })
        return ()=>{
            EventRegister.off(reloadEvent)
        }
    }, [])

    useEffect(() => {
        setSlideIndex(currentItem?.info?.Thumb)
    }, [currentItem?.info?.Thumb])
    return (
        <SimpleModal
            className="modal-pick-stock"
            title={'Thêm vào giỏ hàng'}
            open={show}
            onClose={onClose}
        >
            {
                show && <div className="item-detail">
                    <div className="wrap_inner">
                        <div className='inner_left'>
                            {currentItem && (
                                <div className="template-product product-detail">
                                    <div className="pd-lr-10-percen">
                                        <div
                                            id="ProductSection-product-template"
                                            className="product-template__container prstyle1">
                                            <div className="product-single d-flex flex-wrap justify-content-center" ref={imgRef}>
                                                <ItemImages
                                                    isLoading={false}
                                                    images={currentItem.Images}
                                                    item_id={currentItem.Id}
                                                    item_name={currentItem.Name}
                                                    slideIndex={slideIndex}
                                                    resetSlideIndex={
                                                        resetSlideIndex
                                                    }
                                                    isNew={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='inner_right'>
                            <Information
                                isFromPopup ={true}
                                data={{
                                    loadingProductDetail: false,
                                    productDetail: currentItem,
                                }}
                            />
                            <CartAdding
                                onChangeSlide={onChangeSlide}
                                loadingProductDetail={false}
                                productDetail={currentItem}
                                onClickChat={onClickChat}
                                from={"popup"}
                                productEvent={productEvent}
                            />
                        </div>
                    </div>
                </div>
            }
        </SimpleModal>
    );
}

ModalPickStock.propTypes = {
    currentItem: PropTypes.object,
    show: PropTypes.bool,
};
ModalPickStock.defaultProps = {
    currentItem: {},
    show: false,
};
export default ModalPickStock;
