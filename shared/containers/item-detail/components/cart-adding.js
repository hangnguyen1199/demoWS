import ButtonLight from '@spo/components/common/button-light'
import Image from '@spo/components/common/image'
import CartAddingLoader from '@spo/components/item-detail/cart-adding-loader'
import useCustomRoute from '@spo/lib/use-custom-route'
import CartActions from '@spo/redux/cart/action'
import ItemDetailActions from '@spo/redux/item-detail/action'
import Link from 'next/link'
import { PropTypes } from 'prop-types'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Accordion from '../../../components/common/accordion'
import Divider from '../../../components/common/divider'
import ColorBoxImageUpdated from '../../../components/item/color-box-image-updated'
import SizeBoxDetailUpdated from '../../../components/item/size-box-detail-updated'
import PageList from '../../../config/PageList'
import Utils from '../../../utils/utils'
import { POPUP_WARNING_TYPE } from './../../../../shared/utils/EventRegister'
import IconMsg from './../../../components/common/icons/icon-msg'
import QuantityBox from './../../../components/item/quantity-box'
import MessengerCustomerChat, {
    showDialog,
} from 'react-messenger-customer-chat'
import AppConfig from './../../../config/AppConfig'
import ButtonMain from '../../../components/common/button-main'
import ItemDetailTop from './item-detail-top'
import { EffectCart } from '../../../library/helper'
import $ from 'jquery'
import { useRouter } from 'next/router';
/**
 * ****************************************************************************
 * HaiDT CartAdding CODE
 * cart-adding.js
 *
 * description		:
 * created at		:	2021-11-30
 * created by		:	HaiDT
 * package			:	spo\shared\containers\item-detail\components\cart-adding.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */

function CartAdding(props) {
    const [openDetailTop, setOpenDetailTop] = useState(false)
    const {
        productDetail,
        loadingProductDetail,
        onClickChat,
        from = 'detail',
        showDetailTop = false,
        number_color
    } = props
    let actionStock = ItemDetailActions.LOAD_STOCK_INFO
    if (from == 'popup') {
        actionStock = CartActions.LOAD_CURRENT_ITEM_STOCK
    }
    const router = useRouter();
    const slug = router?.query?.slug;
    const dispatch = useDispatch()
    const [color, setColor] = useState(null)
    const [size, setSize] = useState(null)
    const [disableButtonCart, setDisableButtonCart] = useState(false)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        return ()=>{
            dispatch({
                type: ItemDetailActions.LOAD_PRODUCT_DETAIL_SUCCESS,
                data:{}
            })
        }
    }, [])

    useEffect(() => {
        if (productDetail && slug == productDetail?.Slug && productDetail?.info?.ColorId) {
            setColor(productDetail?.info?.ColorId)
            loadDataByColor(productDetail?.info?.ColorId)
        }
        if(productDetail && props?.productEvent == productDetail.Id && productDetail?.info?.ColorId){
            setColor(productDetail?.info?.ColorId)
            loadDataByColor(productDetail?.info?.ColorId)
        }
    }, [productDetail?.Id, productDetail?.info?.ProductId, slug,props?.productEvent])

    // Thêm vào giỏ

    const onAddCart = (e) => {
        if (!color || !size) {
            Utils.alertPopup(
                'Vui lòng chọn kích thước và màu',
                POPUP_WARNING_TYPE
            )
            return
        }
        setDisableButtonCart(true)
        EffectCart(e)
        let productInfo = {
            ProductId: productDetail.Id,
            ColorId: color,
            SizeId: size,
            Quantity: quantity,
        }
        dispatch({
            type: CartActions.ADD_CART_BY_STOCK,
            data: { productInfo: productInfo, HiddenShowCart: true },
            callback: () => {
                setTimeout(() => {
                    dispatch({ type: CartActions.LOAD_CART_SYNC_PRODUCT })
                    setDisableButtonCart(false)
                }, 1000)
            },
        })
    }
    const onChangeColor = (colorObject) => {
        if (typeof props.onChangeSlide == 'function') {
            props.onChangeSlide(colorObject.Thumb)
        }
        loadDataByColor(colorObject?.ColorId)
        setColor(colorObject?.ColorId)
        setQuantity(1)
    }
    const loadDataByColor = (colorId) => {
        dispatch({
            type: actionStock,
            data: {
                ProductId: productDetail.Id,
                ColorId: colorId,
            },
            success: (resData) => {
                if (resData.SizeId) {
                    setSize(resData.SizeId)
                    dispatch({
                        type: actionStock,
                        data: {
                            ProductId: productDetail.Id,
                            ColorId: colorId,
                            SizeId: resData.SizeId,
                        },
                    })
                }
            },
        })
    }
    // Kích hoạt change size
    const onChangeSize = (val) => {
        setSize(val)
        setQuantity(1)
        dispatch({
            type: actionStock,
            data: { ProductId: productDetail.Id, ColorId: color, SizeId: val },
        })
    }
    // Đến màn checkout
    const buyNow = () => {
        if (!color || !size) {
            Utils.alertPopup(
                'Vui lòng chọn kích thước và màu',
                POPUP_WARNING_TYPE
            )
            return
        }
        let productInfo = {
            ProductId: productDetail.Id,
            ColorId: color,
            SizeId: size,
            Quantity: quantity,
        }
        setDisableButtonCart(true)
        dispatch({
            type: CartActions.ADD_CART_BY_STOCK,
            data: {
                productInfo: productInfo,
                action: 'buynow',
                HiddenShowCart: true,
            },
            callback: () => {
                // TODO temp [START]
                dispatch({
                    type: CartActions.LOAD_CART_SYNC_PRODUCT,
                    callback: () => {
                        let cartChecked = {
                            ProductId: productDetail.Id,
                            ColorId: color,
                            SizeId: size,
                            Quantity: productInfo.Quantity,
                            MinPrice: productDetail.MinPrice,
                        }
                        
                        dispatch({
                            type: CartActions.UPDATE_CART_CHECKED,
                            payload: [cartChecked],
                        })

                        useCustomRoute(dispatch, PageList.CART.SERVER)
                    },
                })

                // TODO temp [END]
                
                // dispatch({
                //     type: CartActions.CREATE_TEMP_ORDER,
                //     data: {
                //         RequestFrom: 3,
                //         Carts: newCartSubmit,
                //     },
                //     callback: {
                //         success: (res) => {
                //             console.log("res",res?.data?.Code)
                //             if(res?.data?.Code == 200){
                //                 localStorage.setItem(
                //                     'checkedCarts',
                //                     JSON.stringify(newCartSubmit),
                //                 );
                //                 useCustomRoute(dispatch, PageList.ORDER.SERVER);
                //             }else{
                //                 setDisableButtonCart(false)
                //             }

                //         },
                //     },
                // });
            },
        })
        // useCustomRoute(dispatch, PageList.CART.SERVER);
    }
    const onChangeQuantity = (val) => {
        setQuantity(val)
    }
    // const handleChat = () => {
    //     if (FB) {
    //         FB.CustomerChat.showDialog()
    //     }
    // }
    const [expanded, setExpanded] = React.useState('detail_info')

    const handleChangeAccordion = (panel) => {
        setExpanded((state) => (state === panel ? 'null' : panel))
    }
    const handleScroll = (event) => {
        if (
            window.pageYOffset >
            $('.wrap_policy').offset()?.top - $('.sticky-top').height()
        ) {
            setOpenDetailTop(true)
        } else {
            setOpenDetailTop(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return loadingProductDetail ? (
        <div className="h-100 d-flex justify-content-start align-items-end">
            <CartAddingLoader />
        </div>
    ) : (
        <>
            {showDetailTop && (
                <ItemDetailTop
                    isWhishlist={false}
                    onChangeSlide={props.onChangeSlide}
                    loadingProductDetail={loadingProductDetail}
                    productDetail={productDetail}
                    openDetailTop={openDetailTop}
                    color={color}
                    size={size}
                    quantity={quantity}
                    onAddCart={onAddCart}
                    onChangeColor={onChangeColor}
                    onChangeSize={onChangeSize}
                    onChangeQuantity={onChangeQuantity}
                    onClickChat={onClickChat}
                />
            )}
            <div className="section_color">
                <ColorBoxImageUpdated
                    colors={productDetail?.info?.Colors}
                    onChangeColor={onChangeColor}
                    active={color}
                    number_color={number_color}
                    MAXIMUM={props.MAXIMUM}
                />
            </div>
            <div className="section_size">
                <SizeBoxDetailUpdated
                    sizes={productDetail?.info?.Sizes}
                    onChangeSize={onChangeSize}
                    active={size}
                />
                <QuantityBox
                    size={42}
                    max={
                        productDetail?.info?.Quantity ??
                        productDetail?.TotalQuantity
                    }
                    onChange={onChangeQuantity}
                    value={quantity}
                />
            </div>
            {/* <div
                className="d-start align-items-center section_ship"
                style={{ borderBottom: '1px inset' }}>
                <span style={{ fontWeight: 500, fontSize: 16 }}>
                    Phí vận chuyển: 0 - 30.000
                </span>{' '}
                <span className="pl-1" style={{ fontSize: 11 }}>
                    VND
                </span>
            </div> */}
            {/* <div
                className="section_ship section_quantity wrap"
                style={{ borderBottom: '1px inset' }}>
                <span
                    className="title"
                    style={{ fontWeight: 500, fontSize: 16 }}>
                    Số lượng
                </span>{' '}
                <QuantityBox
                    size={31}
                    max={productDetail?.info?.Quantity ?? productDetail?.TotalQuantity}
                    onChange={onChangeQuantity}
                    value={quantity}
                />
            </div> */}
            <div className="section_btn">
                <div className="d-flex flex-row align-items-center justify-content-betweenwrap">
                    <div className="w-100 d-flex flex-wrap">
                        <div
                            className="btn-order-main"
                            style={{
                                width: '100%',
                                height: 42,
                                marginTop: 20,
                                borderRadius: 2,
                            }}
                        >
                            <ButtonMain
                                disabled={
                                    productDetail?.info?.Quantity < quantity ||
                                    productDetail?.TotalQuantity < quantity ||
                                    disableButtonCart
                                }
                                onClick={onAddCart}
                                className={`${productDetail?.info?.Quantity  == 0 ? 'disable-btn-price' : ''}`}
                                title={`${productDetail?.info?.Quantity  != 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng!'}`}
                            />
                        </div>
                        <div
                            className="w-100 d-flex flex-row align-items-center justify-content-between"
                            style={{ marginTop: 20 }}
                        >
                            {/* <div
								className="mr-3 pointer"
								onClick={handleChat}
							>
								<div className="wrap_btn_chat">
									<IconMsg fontSize={25} />
								</div>
							</div> */}
                            <div
                                style={{
                                    flex: 1,
                                    border: '1px solid #333333',
                                    height: 42,
                                    borderRadius: 2,
                                }}
                            >
                                <ButtonLight
                                    disabled={
                                        productDetail?.info?.Quantity <
                                            quantity ||
                                        productDetail?.TotalQuantity <
                                            quantity ||
                                        disableButtonCart
                                    }
                                    className="w-100"
                                    onClick={buyNow}
                                    title={'Mua ngay'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-center wrap_policy">
                <div className="col border-right px-0">
                    <Link prefetch={false} href={PageList.POLICY.SERVER}>
                        <a className="d-flex flex-column align-items-center pointer">
                            <div className="">
                                <Image
                                    lazyLoad={false}
                                    style={{ height: 45 }}
                                    src="/images/icon/refun-product.svg"
                                />
                            </div>
                            <span className="text_name fontsize16 link-hover">
                                Chính sách vận chuyển
                            </span>
                        </a>
                    </Link>
                </div>
                <div className="col px-0">
                    <Link prefetch={false} href={PageList.POLICY.SERVER}>
                        <a className="d-flex flex-column align-items-center pointer">
                            <div className="">
                                <Image
                                    lazyLoad={false}
                                    style={{ height: 45 }}
                                    src="/images/icon/insurance.svg"
                                />
                            </div>
                            <span className="text_name fontsize16 link-hover">
                                Bảo hành & Đổi trả
                            </span>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="product_info_section">
                {/* <Accordion
					namePanel="Thông tin sản phẩm"
					panel="des_info"
					onClick={handleChangeAccordion}
					expanded={expanded}
					details={productDetail?.Descriptions}
				/> */}
                {/* <Divider /> */}
                <Accordion
                    namePanel="Chi tiết sản phẩm"
                    panel="detail_info"
                    onClick={handleChangeAccordion}
                    expanded={expanded}
                    details={productDetail?.Detail}
                />
            </div>
            {/* {typeof window !== 'undefiend' && (
                <MessengerCustomerChat
                    pageId={AppConfig.PAGE_ID_FB}
                    appId={AppConfig.AUTH_FACEBOOK_APP_ID}
                    // htmlRef="<REF_STRING>"
                />
            )} */}
        </>
    )
}
CartAdding.propTypes = {
    loadingProductDetail: PropTypes.bool,
    colors: PropTypes.array,
    sizes: PropTypes.array,
    onClickChat: PropTypes.func,
}
CartAdding.defaultProps = {
    loadingProductDetail: false,
    colors: [],
    sizes: [],
    shop: {},
    stocks: [],
    onClickChat: null,
}
export default CartAdding
