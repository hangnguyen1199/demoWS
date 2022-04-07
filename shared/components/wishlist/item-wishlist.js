import useCustomRoute from '@spo/lib/use-custom-route';
import CartActions from '@spo/redux/cart/action';
import WishlistActions from '@spo/redux/wishlist/action';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import ButtonDark from '../common/button-dark';
import Divider from '../common/divider';
import Price from '../utility/price';
import Image from '@spo/components/common/image';
import Link from 'next/link';
import ButtonMain from '../common/button-main';
/**
 * ****************************************************************************
 * DUNGNT ItemWishlist CODE
 * ItemWishlist.js
 *
 * description		:
 * created at		:	2020-09-17
 * created by		:	DungNT
 * package			:	spo\shared\components\wishlist\ItemWishlist.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function ItemWishlist(props) {
    const dispatch = useDispatch();
    const { item } = props;
    const onAddToCart = () => {
        const newItem = {
            stock_id: item.stock_id,
            item_id: item.ProductId,
            quantity: 1,
        };
        dispatch({
            type: CartActions.ADD_CART,
            item: newItem,
        });
        dispatch({
            type: CartActions.LOAD_CURRENT_ITEM,
            data: item,
        });
    };
    const onRemoveWishlist = () => {
        dispatch({
            type: WishlistActions.REMOVE_ITEM_WISHLIST,
            id: item.ProductId,
        });
    };
    // const onGoDetail = () => {
    //     useCustomRoute(dispatch, 'item', {
    //         slug: `${item.slug}-${item.itemBrandCode}`,
    //     });
    // };
    return (
        <div className="col-12 px-0  py-2">
            <div className="_card">
                <div className="px-3 py-2">
                    <div className="d-flex flex-row justify-content-end align-items-center wrap_close">
                        <i
                            onClick={onRemoveWishlist}
                            className="anm anm-times-l link-hover"
                            aria-hidden="true"></i>
                    </div>
                    <div className="py-2 text-truncate text-center">
                        <Link
                            prefetch={false}
                            href="/item/[slug]"
                            as={`/item/${item.slug}-${item.itemBrandCode}`}>
                            <a className="link-hover ">{item?.name}</a>
                        </Link>
                    </div>
                    <Link
                        prefetch={false}
                        href="/item/[slug]"
                        as={`/item/${item.slug}-${item.itemBrandCode}`}>
                        <a className="square-container d-block">
                            <Image
                                className="square pointer h-100 w-100"
                                src={item.image}
                            />
                        </a>
                    </Link>
                </div>
                <div className="px-3 py-2 text-center">
                    <Price oldPrice={item.oldPrice} price={item.price} />
                </div>
                <Divider />
                <div className="px-md-3 px-1 py-2 text-center">
                    <span>
                        {item.totalQuantity > 0 ? (
                            <div>
                                Còn <b>{item?.totalQuantity ?? 0}</b> sản phẩm
                            </div>
                        ) : (
                            <FormattedMessage id="item_detail.outstock" />
                        )}
                    </span>
                </div>
                <Divider />
                <div className="px-md-3 px-1 py-2 text-center w-20">
                    <ButtonMain
                        className="w-100"
                        onClick={onAddToCart}
                        title={<FormattedMessage id="common.add_to_cart" />}
                    />
                </div>
            </div>
        </div>
    );
}
ItemWishlist.propTypes = {};
ItemWishlist.defaultProps = {
    item: {},
};
export default ItemWishlist;
