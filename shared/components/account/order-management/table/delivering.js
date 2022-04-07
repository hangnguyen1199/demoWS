import React, { Fragment } from 'react';
import constants from '../../../../config/constants';
import PageList from '../../../../config/PageList';
import UseWindowSize from '../../../../library/use-window-size';
import ButtonLight from '../../../common/button-light';
import Display from '../../../common/display';
import ItemTable from '../item-table';

const Delivering = (props) => {
    const { orders, onCancel, onConfirm } = props;
    const onCancelOrder = (code, statusCode) => {
        onCancel(code, statusCode);
    };
    const onConfirmOrder = (code, id) => {
        onConfirm(code, id);
    };
    const { width } = UseWindowSize();
    return (
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
                                        href={PageList.ORDER_MANAGEMENT.SERVER}
                                        button={
                                            <React.Fragment>
                                                {item?.StatusCode ==
                                                    constants.ORDER_STATUS
                                                        .DELIVERED && (
                                                    <div
                                                        style={{
                                                            height: 39,
                                                            border:
                                                                '1px solid #707070',
                                                        }}
                                                    >
                                                        <ButtonLight
                                                            onClick={() => {
                                                                onConfirmOrder(
                                                                    item?.OrderCode,
                                                                    item?.OrderId
                                                                );
                                                            }}
                                                            title=" Đã nhận được hàng"
                                                        />
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        }
                                    />
                                </Display>
                                <Display mobile={true}>
                                    <ItemTable
                                        item={item}
                                        key={index}
                                        index={index}
                                        href={PageList.ORDER_MANAGEMENT.SERVER}
                                        button={
                                            <React.Fragment>
                                                {item?.StatusCode ==
                                                    constants.ORDER_STATUS
                                                        .DELIVERED && (
                                                    <div
                                                        className="btn-mobile-dark-review"
                                                        style={{
                                                            height: 39,
                                                            border:
                                                                '1px solid #707070',
                                                        }}
                                                    >
                                                        <ButtonLight
                                                            className="button-mobile-focus"
                                                            onClick={() => {
                                                                onConfirmOrder(
                                                                    item?.OrderCode,
                                                                    item?.OrderId
                                                                );
                                                            }}
                                                            title=" Đã nhận được hàng"
                                                        />
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        }
                                    />
                                </Display>
                            </Fragment>
                        ))}
                </div>
            </div>
        </div>
        // <table className="table order-management-table">
        //     <thead>
        //         {width > 767 && (
        //             <tr>
        //                 <th>Sản phẩm</th>
        //                 <th>Số lượng</th>
        //                 <th>Tổng thanh toán</th>
        //                 <th></th>
        //             </tr>
        //         )}
        //     </thead>
        //     <tbody>
        //         {orders?.Orders.length > 0 &&
        //             orders?.Orders.map((item, index) => (
        //                 <TableItem
        //                     key={index}
        //                     item={item}
        //                     href={'/account/order-management/'}
        //                     button={
        //                         <React.Fragment>
        //                             {item?.StatusCode ==
        //                                 constants.ORDER_STATUS.DELIVERING && (
        //                                 <button
        //                                     onClick={() =>
        //                                         onCancelOrder(item?.OrderCode)
        //                                     }
        //                                     className="btn-cancel">
        //                                     Huỷ đặt hàng
        //                                 </button>
        //                             )}
        //                             {item?.StatusCode ==
        //                                 constants.ORDER_STATUS.DELIVERED && (
        //                                 <button
        //                                     onClick={() =>
        //                                         onConfirmOrder(item?.OrderCode)
        //                                     }
        //                                     className="btn-cancel">
        //                                     Đã nhận được hàng
        //                                 </button>
        //                             )}
        //                         </React.Fragment>
        //                     }
        //                 />
        //             ))}
        //     </tbody>
        // </table>
    );
};
export default Delivering;
