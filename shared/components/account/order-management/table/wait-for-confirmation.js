import PageList from '../../../../config/PageList';
import UseWindowSize from '../../../../library/use-window-size';
import Display from '../../../common/display';
import ItemTable from './../item-table';
import { Fragment } from 'react';

const WaitForConfirmation = (props) => {
    const { orders, onCancel } = props;
    const onCancelOrder = (orderCode, statusCode) => {
        onCancel(orderCode, statusCode);
    };
    const { width } = UseWindowSize();
    return (
        <>
            <div className="order-management-delivery-return-table">
                <div className="table">
                    {width > 640 ? (
                        <div className="item-header">
                            <div className="header-main">
                                <div className="header-table-detail text-left">
                                    <p>Sản phẩm</p>
                                </div>
                                {width > 1224 ? (
                                    <>
                                        <div className="header-table-quantity-list">
                                            <p>Số lượng</p>
                                        </div>
                                        <div className="header-table-price-list">
                                            <p>Tổng thanh toán</p>
                                        </div>
                                    </>
                                ) : null}
                                <div className="header-table-total-list">
                                    <p className="text-detail"></p>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <div className="main-table">
                        {orders?.Orders.length > 0 &&
                            orders?.Orders.map((item, index) => (
                                <Fragment key={index}>
                                    <Display>
                                        <ItemTable
                                            item={item}
                                            key={index}
                                            index={index}
                                            href={PageList.ORDER_MANAGEMENT_SLUG.CLIENT}
                                            button={
                                                <button
                                                    onClick={() =>
                                                        onCancelOrder(
                                                            item?.OrderCode,
                                                            item?.StatusCode,
                                                        )
                                                    }
                                                    className="btn-cancel hover-button-order button-mobile">
                                                    Huỷ đặt hàng
                                                </button>
                                            }
                                        />
                                    </Display>
                                    <Display mobile={true}>
                                        <ItemTable
                                            item={item}
                                            key={index}
                                            index={index}
                                            href={PageList.ORDER_MANAGEMENT_SLUG.CLIENT}
                                            button={
                                                <button
                                                    onClick={() =>
                                                        onCancelOrder(
                                                            item?.OrderCode,
                                                            item?.StatusCode,
                                                        )
                                                    }
                                                    className="btn-cancel hover-button-order-mobile button-mobile">
                                                    Huỷ đặt hàng
                                                </button>
                                            }
                                        />
                                    </Display>
                                </Fragment>
                            ))}
                    </div>
                </div>
            </div>

            {/* <table className="table order-management-table">
                <thead>
                    {width > 767 && (
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Tổng thanh toán</th>
                            <th></th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {orders?.Orders.length > 0 &&
                        orders?.Orders.map((item, index) => (
                            <TableItem
                                key={index}
                                item={item}
                                href={'/account/order-management/'}
                                button={
                                    <button
                                        onClick={() =>
                                            onCancelOrder(item?.OrderCode)
                                        }
                                        className="btn-cancel hover-button-order">
                                        Huỷ đặt hàng
                                    </button>
                                }
                            />
                        ))}
                </tbody>
            </table> */}
        </>
    );
};
export default WaitForConfirmation;
