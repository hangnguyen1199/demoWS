import Price from '@spo/components/utility/price'
import RemainingSold from '@spo/components/utility/remaining-sold'
import WishlistActions from '@spo/redux/wishlist/action'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FacebookShareButton } from 'react-share'
import IconHeart from '../../../components/common/icons/icon-heart'
import PromotionTimeTag from '../../../components/item/promotion-time-tag'
import IconHeartFill from './../../../components/common/icon-heart-fill'
import IconShare from './../../../components/common/icon-share'
import ItemDetailActions from '@spo/redux/item-detail/action'
import Utils from '../../../utils/utils'

/**
 * ****************************************************************************
 * HAIDT Information CODE
 * information.js
 *
 * description		:
 * created at		:	2021-11-25
 * created by		:	HAIDT
 * package			:	spo\shared\containers\item-detail\components\information.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
export default function Information(props) {
    const dispatch = useDispatch()
    const router = useRouter()
    const {
        data: { loadingProductDetail, productDetail },
    } = props
    const [isWhishlist, setIsWhishlist] = useState(productDetail?.IsFavorite)
    const handleCopy = (data) => {
        Utils.alertPopup('Đã sao chép', () => {})
        navigator.clipboard.writeText(data)
    }
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    const onAddToWishList = (e) => {
        e.preventDefault()
        dispatch({
            type: WishlistActions.ADD_WISHLIST,
            item_id: productDetail.Id,
            callBack: () => {
                dispatch({
                    type: ItemDetailActions.TOGGLE_WISHLIST_SUCCESS,
                })
            },
        })
        setIsWhishlist(!isWhishlist)
    }
    useEffect(() => {
        setIsWhishlist(productDetail?.IsFavorite)
    }, [productDetail])
    const getNamePromotion = (type) => {
        return type == 10 ? 'Giờ vàng' : 'Siêu Sale'
    }

    return (
        <>
            <div className="product-single__meta">
                <div className="sectionName">
                    <span className="productName text-productName-capitalize">
                        {productDetail?.Name?.toLowerCase()}
                    </span>
                    <div className="section_share">
                        <div
                            className={`mr-3 d-center ${
                                isWhishlist ? 'active' : ''
                            }`}
                            onClick={onAddToWishList}
                        >
                            {isWhishlist ? (
                                <IconHeartFill fontSize={30} />
                            ) : (
                                <IconHeart fontSize={30} />
                            )}
                        </div>
                        <FacebookShareButton
                            url={window.location.href}
                            quote={productDetail?.Name}
                            hashtag={'#FM'}
                            description={productDetail?.Detail}
                        >
                            <IconShare fontSize={30} />
                        </FacebookShareButton>
                    </div>
                </div>

                <div
                    className="d-start align-items-end"
                    onClick={() => {
                        handleCopy(productDetail?.SKU)
                    }}
                >
                    <span className="sku">{productDetail?.SKU}</span>
                    <img
                        className="hover-color-svg copy-id-product"
                        title="Copy"
                        src="/images/icon/order-detail/icon_copy_detail.svg"
                        style={{
                            width: 20,
                            height: 20,
                            marginLeft: 10,
                        }}
                    ></img>
                </div>
                <div className="product-price-block">
                    <div className="price">
                        <Price
                            className="product-price-line"
                            oldPrice={
                                productDetail?.info?.MaxPrice ??
                                productDetail?.MaxPrice
                            }
                            price={
                                productDetail?.info?.MinPrice ??
                                productDetail?.MinPrice
                            }
                            showSymbolSub={true}
                        />
                        <RemainingSold
                            remaining={
                                productDetail?.info?.Quantity ??
                                productDetail?.TotalQuantity
                            }
                            sold={
                                productDetail?.info?.NumberOfOrders ??
                                productDetail?.NumberOfOrders
                            }
                        />
                    </div>
                </div>
                {productDetail?.TypeOfPromotion != null &&
                    productDetail?.info?.TypeOfPromotion != null && (
                    <div className="promo_section">
                        <PromotionTimeTag
                            isFromPopup={props.isFromPopup}
                            Title={getNamePromotion(
                                productDetail?.TypeOfPromotion
                            )}
                            To={productDetail?.EndPromotionHour}
                            type={productDetail?.TypeOfPromotion}
                        />
                    </div>
                )}
            </div>
            <div className="d-flex justify-content-between remaining-sold-block">
                <div className="d-flex justify-content-between"></div>
            </div>
        </>
    )
}
