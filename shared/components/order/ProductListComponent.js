import React from 'react';
import PropTypes from 'prop-types';
import ProductComponent from './ProductComponent';
import { Router } from '@spo/routes';
import Image from '@spo/components/common/image';
import Display from './../common/display';
import ProductMobile from './../cart/product-mobile';
import ButtonMain from '../common/button-main';
import constants from '../../config/constants';

ProductListComponent.propTypes = {
    itemList: PropTypes.array,
};

ProductListComponent.defaultProps = {
    itemList: [],
};

function ProductListComponent(props) {
    const product_name = 'Sản phẩm';
    const product_price = 'Giá';
    const product_quantity = 'Số lượng';
    const product_total = 'Tổng tiền';

    const { itemList } = props;

    const gotoHome = () => {
        Router.pushRoute('/');
    };

    return (
        <>
            <Display>
                <div className="border-shadow product-section">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <td className="table-head-product-name">
                                    {product_name}
                                </td>
                                <td className="text-center">{product_price}</td>
                                <td className="text-center w-70">
                                    {product_quantity}
                                </td>
                                <td className="text-center">{product_total}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList?.map((item, index) => {
                                return (
                                    <ProductComponent
                                        item={item}
                                        key={index}></ProductComponent>
                                );
                            })}
                            {itemList.length == 0 && (
                                <tr>
                                    <td colSpan={4} className="">
                                        <div className="w-100 d-center">
                                            <div
                                                className="d-flex flex-column align-items-center justify-content-center cart-empty"
                                                style={{ width: 400 }}>
                                                <div
                                                    style={{
                                                        paddingBottom: 30,
                                                    }}>
                                                    <Image
                                                        style={{ width: 124 }}
                                                        src={`/images/icon/cart_list_empty.svg`}
                                                    />
                                                </div>
                                                <span
                                                    style={{
                                                        paddingBottom: 45,
                                                        color: '#333333',
                                                        fontSize: 16,
                                                        fontWeight: 400,
                                                    }}>
                                                    Chưa có sản phẩm nào được
                                                    chọn
                                                </span>
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        height: 39,
                                                        width: 400,
                                                        margin: 'auto',
                                                        paddingBottom: 60,
                                                    }}>
                                                    <ButtonMain
                                                        className="w-100"
                                                        onClick={gotoHome}
                                                        title={
                                                            'Tiếp tục mua sắm'
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Display>
            <Display mobile={true}>
                <div className="border-shadow product-section">
                    {itemList?.map((item, index) => {
                        return (
                            <div className="wrap_product_mobile" key={index}>
                                <ProductMobile
                                    item={item}
                                    onChangeQuantity={() => {}}
                                    readonly={true}
                                />
                            </div>
                        );
                    })}
                </div>
            </Display>
        </>
    );
}

export default ProductListComponent;
