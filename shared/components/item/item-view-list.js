import Image from '@spo/components/common/image';
import Price from '@spo/components/utility/price';
import useCustomRoute from '@spo/lib/use-custom-route';
import CartActions from '@spo/redux/cart/action';
import WishlistActions from '@spo/redux/wishlist/action';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { findDOMNode } from 'react-dom';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import { useDispatch } from 'react-redux';
import { comet, getShortDescription } from '../../library/helper';
import ButtonLight from '../common/button-light';
import IconHeart from '../common/icon-heart';
import IconHeartFill from '../common/icon-heart-fill';
import Link from 'next/link';

const ItemViewList = (props) => {
    const { item, isWishlist } = props;
    const dispatch = useDispatch();
    const wishlistRef = useRef(null);
    const onAddToCart = (e) => {
        e.preventDefault();
        const newItem = {
            item_id: item.ProductId,
            quantity: 1,
            stock_id: item.stock_id,
        };
        dispatch({
            type: CartActions.ADD_CART,
            item: newItem,
        });
    };
    const onAddToWishList = (e) => {
        if (isWishlist) {
            dispatch({
                type: WishlistActions.REMOVE_ITEM_WISHLIST,
                id: item.ProductId,
            });
        } else {
            let imgtodrag = findDOMNode(wishlistRef.current);
            let viewcart = document
                .getElementsByClassName('wishlist_drag_to')[0]
                ?.querySelector('svg');
            if (viewcart) {
                let disLeft = imgtodrag.getBoundingClientRect().left;
                let disTop = imgtodrag.getBoundingClientRect().top;
                let cartleft = viewcart.getBoundingClientRect().left;
                let carttop = viewcart.getBoundingClientRect().top;
                let image = imgtodrag.cloneNode(true);
                image.style =
                    `color:#f29d21;z-index: 1111; width: 100px;opacity:1;transform:scale(1); position:fixed; top:${ 
                        disTop 
                    }px;left:${ 
                        disLeft 
                    }px;transition: left 2s, top 2s, width 2s ,transform 2s , opacity 2s cubic-bezier(1, 1, 1, 1) `;
                let rechange = document.body.appendChild(image);

                let interval = setInterval(() => {
                    comet(image, 10, 10);
                }, 100);

                setTimeout(function () {
                    image.style.left = `${cartleft  }px`;
                    image.style.top = `${carttop  }px`;
                    image.style.width = '40px';
                    image.style.opacity = '1';
                    image.style.transform = 'scale(0.5)';
                }, 200);
                setTimeout(function () {
                    rechange.parentNode.removeChild(rechange);
                    dispatch({
                        type: WishlistActions.ADD_WISHLIST,
                        item_id: item.ProductId,
                    });
                    clearInterval(interval);
                }, 2000);
            } else {
                dispatch({
                    type: WishlistActions.ADD_WISHLIST,
                    item_id: item.ProductId,
                });
            }
        }
    };
    // const onGoDetail = (e) => {
    //     e.preventDefault();
    //     useCustomRoute(dispatch, 'item', {
    //         slug: `${item.slug}-${item.itemBrandCode}`,
    //     });
    // };
    return (
        <div className="list-view-items grid--view-items px-2 w-100">
            <div className="list-product list-view-item d-flex flex-wrap">
                <div className="col-3 px-0">
                    <Link
                        prefetch={false}
                        href="/item/[slug]"
                        as={`/item/${item.slug}-${item.itemBrandCode}`}>
                        <a className="d-block square-container">
                            <Image
                                placeholder={<ImageLoader />}
                                seo={item.name}
                                className="square pointer w-100 h-100"
                                src={item.image.replace('s-', 'm-')}
                            />
                        </a>
                    </Link>
                </div>
                <div className="col-9 align-self-stretch d-flex flex-column">
                    <div className="h4 grid-view-item__title">
                        <Link
                            prefetch={false}
                            href="/item/[slug]"
                            as={`/item/${item.slug}-${item.itemBrandCode}`}>
                            <a className="link-hover font-weight-bold">
                                {item.name}
                            </a>
                        </Link>
                    </div>
                    <div
                        className="_text_truncate"
                        dangerouslySetInnerHTML={{
                            __html: getShortDescription(item?.description),
                        }}></div>
                    <div className="">
                        <Price
                            typeView={'LIST'}
                            oldPrice={item.oldPrice}
                            price={item.price}
                        />
                    </div>
                    <div className="d-between mt-auto">
                        <div>
                            <button
                                onClick={onAddToCart}
                                className="btn btn-addto-cart btn-hover-primary"
                                type="button"
                                tabIndex="0"
                                style={{ border: '1px solid gray' }}>
                                <FormattedMessage id="common.add_to_cart" />
                            </button>
                        </div>
                        <a
                            onClick={onAddToWishList}
                            className={`wishlist add-to-wishlist btn-hover-primary pointer ${
                                isWishlist ? 'active' : ''
                            }`}>
                            <div className="d-center" ref={wishlistRef}>
                                {isWishlist ? (
                                    <IconHeartFill fontSize={14} />
                                ) : (
                                    <IconHeart fontSize={14} />
                                )}
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {props.isShowMore && (
                <div className="text-center d-flex justify-content-center align-items-center">
                    <ButtonLight
                        height={30}
                        borderWidth={1}
                        title={<FormattedMessage id="common.load_more" />}
                    />
                </div>
            )}
        </div>
    );
};

ItemViewList.propTypes = {
    item: PropTypes.shape({
        ProductId: PropTypes.number.isRequired,
        Name: PropTypes.string.isRequired,
        Thumb: PropTypes.string.isRequired,
        hoverImage: PropTypes.string,
        SKU: PropTypes.string,
        MaxPrice: PropTypes.number,
        MinPrice: PropTypes.number.isRequired,
        isSales: PropTypes.bool,
        isTop: PropTypes.bool,
        isGoldenHour: PropTypes.bool,
        isTrend: PropTypes.bool,
        isNew: PropTypes.bool,
    }),
};

ItemViewList.defaultProps = {
    item: {},
};

export default ItemViewList;
