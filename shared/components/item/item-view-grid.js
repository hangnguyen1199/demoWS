const Display = dynamic(() => import('@spo/components/common/display'), {
    ssr: false,
});
const Image = dynamic(() => import('@spo/components/common/image'), {
    ssr: false,
});
const Price = dynamic(() => import('@spo/components/utility/price'), {
    ssr: false,
});
const RemainingSold = dynamic(
    () => import('@spo/components/utility/remaining-sold'),
    {
        ssr: false,
    }
);
const IconHeart = dynamic(() => import('./../common/icons/icon-heart'), {
    ssr: false,
});
const IconHeartFill = dynamic(() => import('./../common/icon-heart-fill'), {
    ssr: false,
});
const CountDownTime = dynamic(
    () => import('@spo/components/spo-layout/count-down-time'),
    { ssr: false }
);
import constants from '@spo/config/constants';
import CartActions from '@spo/redux/cart/action';
import WishlistActions from '@spo/redux/wishlist/action';
import { Link } from '@spo/routes';
import dynamic from 'next/dynamic';
import router from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useDispatch } from 'react-redux';
import PageList from '../../config/PageList';
import navigate, { getUrlDynamic } from '../../library/navigate';
import { useCustomRoute } from './../../library/use-custom-route';
import EventRegister ,{SHOW_POPUP_DATA_DETAIL} from './../../utils/EventRegister';
import ItemDetailActions from '@spo/redux/item-detail/action';

/**
 * ****************************************************************************
 *
 * HAIDT ItemViewGrid UPDATE
 * item-view-grid.js
 *
 * description		:
 * created at		:	2021-11-11
 * created by		:	HAIDT
 * package			:	spo\shared\components\item\item-view-grid.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const ItemViewGrid = (props) => {
    // const intl = useIntl();
    const dispatch = useDispatch();
    const { item, typeDisplay } = props;
    const [isWhishlist, setIsWhishlist] = useState(item.IsWhishlist);
    useEffect(() => {
        setIsWhishlist(item.IsWhishlist)
    }, [item.IsWhishlist])
    // let settingSubSlider = {
    //     dots          : false,
    //     infinite      : true,
    //     speed         : 500,
    //     slidesToShow  : 1,
    //     slidesToScroll: 1,
    //     adaptiveHeight: true,
    // };
    // const slideEl = useRef(null);
    const onAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            type: CartActions.LOAD_CURRENT_ITEM,
            data: { ProductId: item.ProductId },
        });

        EventRegister.emit(SHOW_POPUP_DATA_DETAIL,{
            ProductId:item?.ProductId
        })
    };
    const onAddToWishList = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            type: WishlistActions.ADD_WISHLIST,
            item_id: item.ProductId,
        });
        setIsWhishlist(!isWhishlist);
    };
    // const handlePrev = (e) => {
    //     e.preventDefault();
    //     slideEl.current.slickPrev();
    // };
    // const handleNext = (e) => {
    //     e.preventDefault();
    //     slideEl.current.slickNext();
    // };
    const gotoDetail = (e, id) => {
        dispatch({
            type:ItemDetailActions.LOADING_PRODUCT_DETAIL
        })
        e.preventDefault();
        e.stopPropagation();
        navigate({...getUrlDynamic(PageList.ITEM.NAME, id)})
    };
    return (
        <div
            // className={`${
            //     typeDisplay === 3 ? 'display-gird-3' : 'display-gird-4'
            // } item  _item_mobile`}
            className="item  _item_mobile"
        >
            {props.item.TagType == constants.TAGTYPE.TREND && (
                <div className="product-labels" style={{ top: -3, left: -3 }}>
                    <Image
                        title="san pham trend"
                        className="product-image-trend"
                        seo="product_trend"
                        src={`/images/icon/product-trend.svg`}
                    />
                </div>
            )}
            <div className="product-image">
                <Link
                    prefetch={false}
                    // href="/item/[slug]"
                    // href={`/san-pham/${item.Slug}`}
                    href={{
                        pathname: PageList.ITEM.CLIENT,
                        query: { slug: item.Slug },
                    }}
                >
                    <a
                        className="pointer"
                        onClick={(e) => gotoDetail(e, item?.Slug)}
                    >
                        <div className="container-raito">
                            <div className="raito">
                                <Image
                                    lazyLoad={false}
                                    width={400}
                                    height={400}
                                    sizes="(max-width: 500px) 200px, 500px"
                                    seo={item.Name}
                                    className="primary"
                                    src={props.item?.Thumb}
                                />
                            </div>
                        </div>

                        <div className="hover w-100 h-100">
                            <div className="container-raito">
                                <div className="raito">
                                    <Image
                                        lazyLoad={false}
                                        width={400}
                                        height={400}
                                        sizes="(max-width: 500px) 200px, 500px"
                                        seo={item.Name}
                                        className=""
                                        // src={
                                        //     item.ImageList.length > 0 &&
                                        //         item.ImageList[0]?.HoverThumb !=
                                        //         ''
                                        //         ? item.ImageList[0]
                                        //             ?.HoverThumb
                                        //         : props.item?.Thumb
                                        // }
                                        src={
                                            props.item?.ImageHover ??
                                            props.item?.Thumb
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {props.item.TagType ==
                            constants.TAGTYPE.SUPPER_SALE && (
                            <>
                                <div
                                    className="product-labels"
                                    style={{ top: 0, left: 17 }}
                                >
                                    <Image
                                        title="Siêu sale"
                                        className="product-image-sale"
                                        seo="sale_off"
                                        src={`/images/icon/product-sale-off.svg`}
                                        lazyLoad={false}
                                    />
                                </div>
                            </>
                        )}
                        {props.item.TagType ==
                            constants.TAGTYPE.GOLDEN_HOUR && (
                            <>
                                <div
                                    className="product-labels"
                                    style={{ top: 0, left: 11 }}
                                >
                                    <Image
                                        title="Gio Vang"
                                        className="product-image-golden-hour"
                                        seo="sale_off"
                                        src={`/images/icon/product-gold-time.svg`}
                                        lazyLoad={false}
                                    />
                                </div>
                            </>
                        )}
                        {props.item.TagType == constants.TAGTYPE.NEW && (
                            <div
                                className="product-labels"
                                style={{ top: 0, left: 20 }}
                            >
                                <Image
                                    title="Sản phẩm mới"
                                    className="product-image-new"
                                    seo="product_new"
                                    src={`/images/icon/product-new.svg`}
                                    lazyLoad={false}
                                />
                            </div>
                        )}
                        {props.item.TagType == constants.TAGTYPE.TOP && (
                            <div
                                className="product-labels"
                                style={{ top: 15, left: 0 }}
                            >
                                <Image
                                    className="product-image-top"
                                    title="san pham hot"
                                    seo="product_hot"
                                    src={`/images/icon/product-top.svg`}
                                    lazyLoad={false}
                                />
                            </div>
                        )}
                    </a>
                </Link>

                <Display>
                    <div
                        className={`add_wishlist-icon ${
                            isWhishlist ? 'active' : ''
                        }`}
                        onClick={onAddToWishList}
                    >
                        {isWhishlist ? (
                            <IconHeartFill fontSize={39} />
                        ) : (
                            <IconHeart fontSize={39} />
                        )}
                    </div>
                </Display>
                <Display>
                    <div
                        className={`new_wrap_info_item pointer ${
                            props.isShowSaleOrGoldenHour
                                ? 'new_wrap_info_item-show-countdown'
                                : ''
                        }`}
                    >
                        <div className="d-center" style={{ height: 40 }}>
                            <span
                                onClick={onAddToCart}
                                className="d-center fontsize14 button_cart"
                            >
                                {' '}
                                Thêm vào giỏ hàng
                            </span>
                        </div>
                    </div>
                </Display>
                {props.isShowSaleOrGoldenHour &&
                    (props.item.TagType == constants.TAGTYPE.GOLDEN_HOUR ||
                        props.item.TagType ==
                            constants.TAGTYPE.SUPPER_SALE) && (
                    <Display>
                        {props.item.TagType ==
                                constants.TAGTYPE.GOLDEN_HOUR && (
                            <div className="new_wrap_info_item_type">
                                <div
                                    className="d-flex"
                                    style={{
                                        height: 47,
                                        background:
                                                'url(/images/icon/background-gold-time.svg)',
                                        backgroundSize: 'cover',
                                    }}
                                >
                                    <div className="col-7 d-start">
                                        <div className="d-flex">
                                            <div className="">
                                                <Image
                                                    style={{
                                                        width: 30,
                                                        height: 17,
                                                    }}
                                                    src={
                                                        '/images/icon/gold-time.svg'
                                                    }
                                                    lazyLoad={false}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    width: 5,
                                                }}
                                            ></div>
                                            <div
                                                className="fontsize14 d-flex align-items-center"
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
                                                    Giờ Vàng
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 d-end">
                                        <CountDownTime
                                            endTime={props.item.PromotionTo}
                                            fontSize={14}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {props.item.TagType ==
                                constants.TAGTYPE.SUPPER_SALE && (
                            <div className="new_wrap_info_item_type">
                                <div
                                    className="d-flex"
                                    style={{
                                        height: 47,
                                        background:
                                                'url(/images/icon/background-sale-off.svg)',
                                        backgroundSize: 'cover',
                                    }}
                                >
                                    <div className="col-7 d-start">
                                        <div className="d-flex">
                                            <div className="">
                                                <Image
                                                    style={{
                                                        width: 26,
                                                        height: 17,
                                                    }}
                                                    src={
                                                        '/images/icon/sale-hot-cate-white.svg'
                                                    }
                                                    lazyLoad={false}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    width: 5,
                                                }}
                                            ></div>
                                            <div
                                                className="fontsize14 d-flex align-items-center"
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
                                                    Siêu sale
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 d-end">
                                        <CountDownTime
                                            endTime={props.item.PromotionTo}
                                            fontSize={14}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </Display>
                )}
            </div>
            <div
                className="product-info"
                onClick={(e) => gotoDetail(e, item?.Slug)}
            >
                <div className="d-start justify-content-between">
                    <Price
                        typeView={constants.TYPE_VIEW_ITEM.GRID}
                        oldPrice={props.item.MaxPrice}
                        price={props.item.MinPrice}
                    />
                    {/* <RemainingSold
                        remaining={props.item.TotalQuantity}
                        sold={props.item.NumberOfOrders}
                    /> */}
                </div>
                <div className="d-start justify-content-between">
                    <Link
                        prefetch={false}
                        // href="/item/[slug]"
                        // href={`/san-pham/${item?.Slug}`}
                        href={{
                            pathname: PageList.ITEM.CLIENT,
                            query: { slug: item.Slug },
                        }}
                    >
                        <a
                            onClick={(e) => gotoDetail(e, item?.Slug)}
                            className="text-truncate product-name-info pointer"
                            title={props.item.Name}
                        >
                            {props.item.Name?.toLowerCase()}
                        </a>
                    </Link>
                </div>
                {/* <span className="product-name-code">{props.item.SKU}</span> */}                
            </div>
        </div>
    );
};

ItemViewGrid.propTypes = {
    class: PropTypes.string,
    isViewInSlider: PropTypes.bool,
    type: PropTypes.string, // sale-off , gold-time
    isShowSaleOrGoldenHour: PropTypes.bool,
    item: PropTypes.shape({
        ProductId: PropTypes.number.isRequired,
        Name: PropTypes.string.isRequired,
        Thumb: PropTypes.string.isRequired,
        hoverImage: PropTypes.string,
        SKU: PropTypes.string,
        MaxPrice: PropTypes.number,
        MinPrice: PropTypes.number.isRequired,
    }),
};

ItemViewGrid.defaultProps = {
    class: 'col-6 col-sm-6 col-lg-4 col-lg-3',
    isViewInSlider: false,
    item: {},
    type: '',
};

export default ItemViewGrid;
