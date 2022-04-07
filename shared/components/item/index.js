
const ItemViewGrid = dynamic(
    () => import('@spo/components/item/item-view-grid'),
    { ssr: false },
);
const ItemViewList = dynamic(
    () => import('@spo/components/item/item-view-list'),
    { ssr: false },
);
// import ItemViewGrid from '@spo/components/item/item-view-grid';
// import ItemViewList from '@spo/components/item/item-view-list';
import constants from '@spo/config/constants';
import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';

const Item = props => {
    const { wishlist, item, isViewInSlider, type } = props
    const checkWishlist = (item) => {
        if (wishlist) {
            let index = wishlist.findIndex(x => x.ProductId == item.ProductId)
            return index != -1 
        }
        return false
    }
    return (
        props.typeView !== constants.TYPE_VIEW_ITEM.LIST ?
            <ItemViewGrid isWishlist={checkWishlist(item)} typeDisplay={props.typeDisplay} class={props.class} isViewInSlider={isViewInSlider} item={item} type={type} isShowSaleOrGoldenHour={props.isShowSaleOrGoldenHour}/> :
            <ItemViewList item={item} isWishlist={checkWishlist(item)} />
    );
};

Item.propTypes = {
    class: PropTypes.string,
    typeView: PropTypes.string,
    isViewInSlider: PropTypes.bool,
    isShowSaleOrGoldenHour: PropTypes.bool,
    type: PropTypes.string,
    typeDisplay:PropTypes.number,
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
    })
}

Item.defaultProps = {
    class: 'col-6 col-sm-6 col-md-4 col-lg-3 px-1 ',
    typeView: constants.TYPE_VIEW_ITEM.GRID,
    isViewInSlider: false,
    isShowSaleOrGoldenHour: false,
    typeDisplay: 4,
    item: {
    }
}

export default Item;