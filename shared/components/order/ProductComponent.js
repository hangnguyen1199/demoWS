import React from 'react';
import PropTypes from 'prop-types';
import Currency from 'react-currency-formatter';
import Link from 'next/link';
import Image from '@spo/components/common/image';
import constants from '../../../shared/config/constants';
import PageList from '../../config/PageList';

function ProductComponent(props) {
    const { item } = props;
    const _renderProductInfo = (prodInfo) => {
        return (
            <div className="product-row">
                <Link
                    prefetch={false}
                    href={`${PageList.ITEM.INDEX}${item.Slug}`}>
                    <a className="d-flex align-items-center">
                        <img
                            src={prodInfo.Thumb ?? constants.PRODUCT_IMG}
                            className="product-image"
                            alt="image"></img>
                        <div className="product-description">
                            <p className="breadcrumb-item-capitalize">{prodInfo.Name?.toLowerCase()}</p>
                            <p className="product-code">{prodInfo.SKU}</p>
                            <p className="color-and-size">
                                Màu: {prodInfo.ColorName} | Size:{' '}
                                {prodInfo.SizeName}
                            </p>
                        </div>
                    </a>
                </Link>
            </div>
        );
    };

    return (
        <tr>
            <td className="min-w-350">{_renderProductInfo(item)}</td>
            <td>
                <div className="text-weight-bold text-center">
                    <Currency
                        quantity={Number.parseFloat(item.MinPrice)}
                        currency="VND"
                        pattern="##,### !"
                        symbol=""
                    />
                    <span className="currency fontsize9">VND</span>
                </div>
            </td>
            <td className="min-w-150">
                <div className="text-weight-bold text-center">
                    {item.Quantity}
                </div>
            </td>
            <td className="text-weight-bold text-center min-w-150">
                <Currency
                    quantity={Number.parseFloat(item.MinPrice) * item.Quantity}
                    currency="VND"
                    pattern="##,### !"
                    symbol=""
                />
                <span className="currency fontsize9">VND</span>
            </td>
        </tr>
    );
}

ProductComponent.propsTypes = {
    item: PropTypes.object,
};
ProductComponent.defaultProps = {
    // item: {
    //     item_image_link: '',
    //     item_name: '',
    //     color_name: '',
    //     size_name: '',
    //     quantity: 1,
    //     sale_price: 0,
    // },

    item: {
        item_name: 'ÁO SƠ MI TAY NGẮN ĐÍNH NÚT',
        code: 'ASM123',
        color_name: 'Hồng',
        size_name: 'XL',
        item_image_link:
            'https://media.main.outfiz.vn/images/2021/10/o-de95d6c1-e4fb-4830-9d0f-f8f5e2126ea5.jpg',
        sale_price: 55000,
        quantity: 1,
    },
};

export default ProductComponent;
