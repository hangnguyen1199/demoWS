import Link from 'next/link';
import { PropTypes } from 'prop-types';
import React from 'react';
import constants from '../../../shared/config/constants';
import PageList from '../../config/PageList';
import CustomFrame from '../common/custom-frame';
import Image from '../common/image';
import { useCustomRoute } from '../../library/use-custom-route';

function Product(props) {
    const { item } = props;
    const handleClick = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        useCustomRoute(null, `${PageList.ITEM.INDEX}${item?.Slug}`,{},false)
    }
    return (
        <div className={`product`}>
            <Link
                prefetch={false}
                href={{
                    pathname: PageList.ITEM.CLIENT,
                    query:{
                        slug: item?.Slug
                    }
                }}>
                <a
                    onClick={handleClick}
                    className={`image ${
                        item.QuantityInBranch == 0 ? 'outstock' : ''
                    }`}>
                    <CustomFrame className="overflow-hidden">
                        <Image className="w-100 h-100"  src={item.Thumb} lazyLoad={false} />
                    </CustomFrame>
                    {/* <div className="pointer square-container position-relative" >
                        <div
                            className="square"
                            style={{
                                background: `url(${
                                    item.Thumb ?? constants.PRODUCT_IMG
                                })`
                            }}></div>
                    </div> */}
                </a>
            </Link>
            <div className="d-flex flex-column align-items-start justify-content-center cart-response-row" style={{marginLeft: 15}}>
                <div
                    className="name name-product-row"
                    style={{
                        color: '#333333',
                        fontSize: 16,
                        fontWeight: 400,
                        textTransform: 'capitalize',
                        paddingBottom: 10,
                    }}>
                    {item.ProductId ? (
                        <Link
                            prefetch={false}
                            // href="/item/[slug]"
                            href={`${PageList.ITEM.INDEX}${item.Slug}`}>
                            <a className="link-hover-red">
                                {item.Name?.toLowerCase() || item.ProductName?.toLowerCase()}
                            </a>
                        </Link>
                    ) : (
                        <span>{item.Name?.toLowerCase() || item.ProductName?.toLowerCase()}</span>
                    )}
                </div>
                <div
                    className='name-product-row'
                    style={{
                        color: '#333333',
                        fontSize: 14,
                        fontWeight: 300,
                        paddingBottom: 10,
                    }}>
                    {item.SKU || item.ProductSKU}
                </div>
                <div
                    className="d-flex"
                    style={{ color: '#333333', fontSize: 16, fontWeight: 400 }}>
                    <div className='name-product-row'>Màu: {item.ColorName || item.Color}</div>
                    <div className="px-1" style={{ padding: '0px 15px' }}>
                        |
                    </div>
                    <div className='name-product-row'>Size: {item.SizeName || item.Size}</div>
                </div>
            </div>
        </div>
    );
}

Product.propTypes = {
    item: PropTypes.object,
};
Product.defaultProps = {
    item: {},
};
export default Product;
