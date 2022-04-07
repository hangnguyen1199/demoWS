import Image from '@spo/components/common/image';
import useCustomRoute from '@spo/lib/use-custom-route';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import constants from '../../../shared/config/constants';
import CustomFrame from './../common/custom-frame';
import Currency from 'react-currency-formatter';
import QuantityBox from '@spo/components/item/quantity-box';
import PageList from '../../config/PageList';
import navigate, { getHref, getUrlDynamic } from '../../library/navigate';

function ProductMobile(props) {
    const { item } = props;
    const onGoToDetail = () => {
        navigate({...getUrlDynamic(PageList.ITEM.NAME, item.Slug)})
    };
    return (
        <div className="d-flex _product_mobile">
            <div
                className={`product-info-mobile ${
                    item.QuantityInBranch == 0 ? 'cart_disabled' : ''
                }`}
            >
                {item.ProductId ? (
                    <Link
                        prefetch={false}
                        {...getHref(PageList.ITEM.NAME, item.Slug)}
                    >
                        <a
                            onClick={onGoToDetail}
                            className="d-flex overflow-hidden"
                            style={{ width: 100 }}
                        >
                            <CustomFrame ratio={1.35}>
                                <Image
                                    className="w-100 h-100"
                                    style={{ width: 15 }}
                                    src={item.Thumb}
                                    lazyLoad={false}
                                />
                            </CustomFrame>
                        </a>
                    </Link>
                ) : (
                    <span className="image">
                        <div className="square-container">
                            <div
                                className="square"
                                style={{
                                    background: `url(${item.Thumb})`,
                                }}
                            ></div>
                        </div>
                    </span>
                )}
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center">
                <div className="name">
                    {item.ProductId ? (
                        <Link
                            prefetch={false}
                            {...getHref(PageList.ITEM.NAME, item.Slug)}
                        >
                            <a
                                className="link-hover-red"
                                style={{ lineHeight: '18px' }}
                            >
                                {item.Name || item.ProductName}
                            </a>
                        </Link>
                    ) : (
                        <span>{item.Name || item.ProductName}</span>
                    )}
                </div>
                <div className="sku">{item.SKU || item.ProductSKU}</div>
                <div className="size_color">
                    <div>Màu: {item.ColorName || item.Color}</div>
                    <div className="px-1" style={{ padding: '0px 15px' }}>
                        |
                    </div>
                    <div>Size: {item.SizeName || item.Size}</div>
                </div>
                <div className="product-price ">
                    {item.MaxPrice != item.MinPrice && (
                        <span className="old-price">
                            <span style={{ fontSize: 14, fontWeight: 400 }}>
                                <Currency
                                    quantity={item.MaxPrice || item.SalePrice}
                                    currency="VND"
                                    pattern="##,### !"
                                    symbol=""
                                />
                            </span>
                        </span>
                    )

                    }
                </div>
                <div className="w-100 d-flex align-items-center justify-content-between">
                    <div className="mt-1 mobile_price">
                        <span>
                            <Currency
                                quantity={item.MinPrice || item.SalePrice}
                                currency="VND"
                                pattern="##,### !"
                                symbol=""
                            />
                        </span>
                        <span className="currency currency-mobile fontsize11">VND</span>
                    </div>
                    {props.readonly && (
                        <>
                            <div className="ml-5 d-flex align-items-center">
                                <p style={{ fontSize: 12 }}>x</p>
                                {item.Quantity}
                            </div>
                        </>
                    )}
                </div>
                {!props.readonly && (
                    <div
                        className={`moblie_quantity ${
                            item.QuantityInBranch == 0 ? 'cart_disabled' : ''
                        }`}
                    >
                        <QuantityBox
                            disabled={props.readonly}
                            size={23}
                            value={item.Quantity}
                            max={item.QuantityInBranch}
                            update={(val) => props.onChangeQuantity(item, val)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

ProductMobile.propTypes = {
    item: PropTypes.object,
};
ProductMobile.defaultProps = {
    item: {},
};
export default ProductMobile;
