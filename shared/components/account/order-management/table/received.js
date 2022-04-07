import constants from '../../../../config/constants';
import UseWindowSize from '../../../../library/use-window-size';
import ItemTable from '../item-table';
import ButtonDark from '@spo/components/common/button-dark';
import ButtonLight from '@spo/components/common/button-light';
import { useEffect } from 'react';
import PageList from '../../../../config/PageList';
import ButtonMain from '../../../common/button-main';
import Display from '../../../common/display';

const Received = (props) => {
    const { orders, onClick, onReview, selectedOrderId } = props;
    const { width } = UseWindowSize();
    const onReviewOrder = (code) => {
        onReview(code);
    };

    useEffect(() => {
        if(selectedOrderId){
            onReviewOrder(selectedOrderId);
        }
    }, [selectedOrderId]);

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
                        <ItemTable
                            item={item}
                            key={index}
                            index={index}
                            href={PageList.ORDER_MANAGEMENT.SERVER}
                            button={
                                // <button
                                //     onClick={() => onReviewOrder(item?.OrderId)}
                                //     className={`btn-cancel button-mobile ${
                                //         item?.ReviewId != 0 && 'btn-dark'
                                //     }`}>
                                //     {item?.ReviewId != 0
                                //         ? 'Chi tiết đánh giá'
                                //         : 'Đánh giá ngay'}
                                // </button>
                                <>
                                    {item?.ReviewId != 0 ? (
                                        <div className="btn-detail-review" style={{ height: 39}}>
                                            <ButtonMain
                                                className="w-100"
                                                title="Chi tiết đánh giá"
                                                onClick={() => onReviewOrder(item?.OrderId)}
                                                type="submit"
                                            />
                                        </div>
                                    ): (
                                        <div className="btn-mobile-dark-review" style={{ height: 39, border: "1px solid #707070" }}>
                                            <Display>
                                                <ButtonLight
                                                    className="w-100"
                                                    title="Đánh giá ngay"
                                                    onClick={() => onReviewOrder(item?.OrderId)}
                                                    type="submit"
                                                />
                                            </Display>
                                            <Display mobile={true}>
                                                <ButtonLight
                                                    className="w-100 button-mobile-focus"
                                                    title="Đánh giá ngay"
                                                    onClick={() => onReviewOrder(item?.OrderId)}
                                                    type="submit"
                                                />
                                            </Display>
                                        </div>
                                    )}
                                </>
                            }
                        />
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
        //                         <button
        //                             onClick={() => onReviewOrder(item?.OrderId)}
        //                             className={`btn-cancel ${
        //                                 item?.ReviewId != 0 && 'btn-dark'
        //                             }`}>
        //                             {item?.ReviewId != 0
        //                                 ? 'Chi tiết đánh giá'
        //                                 : 'Đánh giá ngay'}
        //                         </button>
        //                     }
        //                 />
        //             ))}
        //     </tbody>
        // </table>
    );
};
export default Received;
