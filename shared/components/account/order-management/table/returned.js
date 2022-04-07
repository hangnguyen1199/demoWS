import constants from '../../../../config/constants';
import PageList from '../../../../config/PageList';
import UseWindowSize from '../../../../library/use-window-size';
import ItemTable from '../item-table';
import useCustomRoute from '../../../../library/use-custom-route';
import Display from '../../../common/display';
import { Fragment } from 'react';

const Delivering = (props) => {
    const { orders, onClick } = props;
    const { width } = UseWindowSize();
    const onShowDetail = (e,item) => {
        e.preventDefault();
        e.stopPropagation();
        useCustomRoute(null, `${PageList.ORDER_MANAGEMENT_SLUG.INDEX}${item?.OrderId}`,{},false)
    }
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
                                            <button 
                                                onClick={(e)=>onShowDetail(e,item)}
                                                className="btn-cancel hover-button-order button-mobile">
                                                Xem chi tiết
                                            </button>
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
                                            <button 
                                                onClick={(e)=>onShowDetail(e,item)}
                                                className="btn-cancel hover-button-order-mobile button-mobile">
                                                Xem chi tiết
                                            </button>
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
        //                         <button className="btn-cancel">
        //                             Xem chi tiết
        //                         </button>
        //                     }
        //                 />
        //             ))}
        //     </tbody>
        // </table>
    );
};
export default Delivering;
