import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PageList from '../../../../config/PageList';
import UseWindowSize from '../../../../library/use-window-size';
import Display from '../../../common/display';
import ItemTable from '../item-table';

const Cancel = (props) => {
    const { orders, onReOrder } = props;
    const dispatch = useDispatch();
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
                                                <button
                                                    className="btn-cancel hover-button-order button-mobile"
                                                    onClick={() =>
                                                        onReOrder(item?.OrderCode)
                                                    }>
                                                    Mua lại
                                                </button>
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
                                                <button
                                                    className="btn-cancel hover-button-order-mobile button-mobile"
                                                    onClick={() =>
                                                        onReOrder(item?.OrderCode)
                                                    }>
                                                    Mua lại
                                                </button>
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
        //                     item={item}
        //                     href={'/account/order-management/'}
        //                     button={
        //                         <React.Fragment>
        //                             <button className="btn-cancel">
        //                                 Mua lại
        //                             </button>
        //                         </React.Fragment>
        //                     }
        //                 />
        //             ))}
        //     </tbody>
        // </table>
    );
};
export default Cancel;
