import Display from '@spo/components/common/display';
import Price from '@spo/components/utility/price';
import ItemDetailActions from '@spo/redux/item-detail/action';
import WishlistActions from '@spo/redux/wishlist/action';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonMain from '../../../components/common/button-main';
import IconHeartFill from '../../../components/common/icon-heart-fill';
import IconHeart from '../../../components/common/icons/icon-heart';
import ColorBoxDetailUpdated from '../../../components/item/color-box-select';
import QuantityBox from '../../../components/item/quantity-box';
import SizeBoxDetailUpdated from '../../../components/item/size-box-detail-updated';

export default function ItemDetailBottom(props) {
    const { productDetail ,openDetailTop=false } = props;

    const [isWhishlist, setIsWhishlist] = useState(productDetail?.IsFavorite);
    const dispatch = useDispatch();
    const onAddToWishList = (e) => {
        e.preventDefault();
        setIsWhishlist(!isWhishlist)
        dispatch({
            type: WishlistActions.ADD_WISHLIST,
            item_id: productDetail.Id,
            callBack: () => {
                dispatch({
                    type: ItemDetailActions.TOGGLE_WISHLIST_SUCCESS,
                });
            }
        });
    }

    useEffect(() => {
        setIsWhishlist(productDetail?.IsFavorite);
    }, [productDetail?.IsFavorite])

    return (
        <>
            <Display>
                <div className={`item-detail-scroll-to-top ${openDetailTop ? 'show' : ''}`}>

                    <div className='flex flex-row align-items-center'>
                        <div className='d-flex flex-row'>
                            {productDetail?.Images && <img src={productDetail?.Images[0]?.Thumb} />}

                            <div className='item-detail-scroll'>
                                <p className='title-product-scroll'>{productDetail?.Name}</p>
                                <Price
                                    className="product-price-line"
                                    oldPrice={productDetail?.info?.MaxPrice ?? productDetail?.MaxPrice}
                                    price={productDetail?.info?.MinPrice ?? productDetail?.MinPrice}
                                    showSymbolSub={true}
                                />
                            </div>
                        </div>
                        <ColorBoxDetailUpdated
                            colors={productDetail?.info?.Colors}
                            onChangeColor={props.onChangeColor}
                            active={props.color}
                            className="item-detail-box-select-scroll"
                        />
                        <SizeBoxDetailUpdated
                            sizes={productDetail?.info?.Sizes}
                            onChangeSize={props.onChangeSize}
                            active={props.size}
                            className="item-detail-box-select-scroll"
                        />
                        <QuantityBox
                            size={42}
                            max={productDetail?.info?.Quantity ?? productDetail?.TotalQuantity}
                            onChange={props.onChangeQuantity}
                            value={props.quantity}
                            className="item-detail-box-select-scroll"
                        />
                    </div>
                    <div className='flex flex-row item-detail-btn-scroll'>
                        <ButtonMain
                            disabled={
                                productDetail?.info?.Quantity < props.quantity ?? productDetail?.TotalQuantity <
                                props.quantity
                            }
                            onClick={(e)=>props.onAddCart(e)}
                            className={`${productDetail?.info?.Quantity  == 0 ? 'disable-btn-price' : ''} w-100 item-detail-btn-scroll item-detail-btn-scroll-hover`}
                            title={`${productDetail?.info?.Quantity  != 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng!'}`}
                        />
                        <div
                            onClick={onAddToWishList}
                            className={`item-detail-wish-scroll ${isWhishlist && 'active'}`}
                        >
                            {isWhishlist ? (
                                <IconHeartFill fontSize={30} />
                            ) : (
                                <IconHeart fontSize={30} />
                            )}
                        </div>
                    </div>
                </div>
            </Display></>
    )
}
