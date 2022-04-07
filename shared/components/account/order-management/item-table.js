import React from 'react';
import { FormattedNumber } from 'react-intl';
import constants from '@spo/config/constants';
import UseWindowSize from '../../../library/use-window-size';
import Link from 'next/link';
import {Router} from '@spo/routes';
import PageList from '../../../config/PageList';
import { useCustomRoute } from '../../../library/use-custom-route';
import navigate, { getUrlDynamic } from '../../../library/navigate';


export default function ItemTable (props) {
    const { item, button, href } = props;
    const { width } = UseWindowSize();
    const handleRedirect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate({ ...getUrlDynamic(PageList.ORDER_MANAGEMENT_SLUG.NAME, item?.OrderId) });
    }
    return (
        <div className="row-item-main">
            <p className="order-branch">{item.BuyFrom}</p>
            <div className="item-main">
                <Link href={{
                    pathname: href,
                    query: {
                        slug: item.OrderId
                    }
                }}>
                    <a onClick={handleRedirect} className="main-table-detail">
                        <img
                            src={item?.Image}
                            alt="svg"
                            style={{
                                width: '142px',
                                maxWidth: '142px',
                                flex: 1,
                            }}
                            className="order-image"
                        />
                        <div className="main-table-detail-item">
                            {width > 380 ? (
                                <div className="text-order-management">
                                    <div className="text-order-management-title">
										Số hóa đơn
                                    </div>
									:&nbsp;
                                    {item.OrderCode}
                                </div>
                            ) : (
                                <div
                                    className="text-order-management"
                                    style={{ flexDirection: 'column' }}>
                                    <div className="text-order-management-title">
										Số hóa đơn&nbsp;&nbsp;&nbsp;:
                                    </div>
                                    {item.OrderCode}
                                </div>
                            )}
                            <div className="text-order-management">
                                <div className="text-order-management-title">
									Tiền hàng
                                </div>
								:&nbsp;
                                <FormattedNumber value={item.OrderAmount} />
                                <p>VND</p>
                            </div>
                            <div className="text-order-management">
                                <div className="text-order-management-title">
									Vận chuyển
                                </div>
								:&nbsp;
                                <FormattedNumber value={item.ShippingPrice} />
                                <p>VND</p>
                            </div>
                            {width > 1224 ? null : (
                                <>
                                    <div className="text-order-management">
                                        <div className="text-order-management-title">
											Số lượng
                                        </div>
										:&nbsp; {item?.OrderQuantity}
                                    </div>
                                    <div className="text-order-management">
                                        <div className="text-order-management-title">
											Tổng
                                        </div>
										:&nbsp;
                                        <FormattedNumber
                                            value={item.TotalAmount}
                                        />
                                        <p>VND</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </a>
                </Link>
                {width > 640 ? (
                    <>
                        {width < 1221 ? null : (
                            <>
                                {' '}
                                <div className="main-table-quantity-list">
                                    <div className="text-order-quantity">
                                        {item?.OrderQuantity}
                                    </div>
                                </div>
                                <div className="main-table-price-list">
                                    <FormattedNumber value={item.TotalAmount} />
                                    <span>VND</span>
                                </div>
                            </>
                        )}
                        {width < 930 ? null : (
                            <div className="main-table-total-list">
                                {button && button}
                            </div>
                        )}
                    </>
                ) : null}
            </div>
            <div className="message-table-order">
                <div className="text-message">
                    {item?.CancelBy &&
						item.StatusCode == constants.ORDER_STATUS.CANCEL && (
                        <div className="d-between">
                            <p className="cancel-by">
									Đã huỷ bởi&nbsp;
                                <span
                                    style={{
                                        color: `${item.CancelBy == 'FMPlus'
                                            ? 'red'
                                            : '#000'
                                        }`,
                                    }}>
                                    {item?.CancelBy}
                                </span>
                            </p>
                        </div>
                    )}
                </div>
                <div>{width < 930 ? <>{button && button}</> : null}</div>
            </div>
        </div>
    );
}
