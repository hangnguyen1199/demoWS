import BreadCrumb from '@spo/components/common/breadcrumb';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import CommonNavs from '@spo/components/common/navs';
import Actions from '@spo/redux/account/actions';
import constants from '../../config/constants';
import VerticalTab from '../../components/spo-layout/vertical-tab';
import Empty from '@spo/components/account/order-management/empty';
import ConfirmationTable from '@spo/components/account/order-management/table/wait-for-confirmation';
import CancelTable from '@spo/components/account/order-management/table/cancel';
import ReturnedTable from '@spo/components/account/order-management/table/returned';
import DeliveringTable from '@spo/components/account/order-management/table/delivering';
import ReceivedTable from '@spo/components/account/order-management/table/received';
import CancelModal from '../../components/account/order-management/modal/cancel-modal';
import ConfirmModal from '../../components/account/order-management/modal/confirm-modal';
import ReviewModal from '../../components/account/order-management/modal/review-modal';
import Utils from '../../utils/utils';
import EventRegister, {
    EVENT_SHOW_POPUP,
    POPUP_SUCCESS_TYPE,
    POPUP_WARNING_TYPE,
    REVIEW_POPUP,
} from '../../utils/EventRegister';
import useCustomRoute from '../../library/use-custom-route';
import axios from 'axios';
import Display from '../../components/common/display';
import CartActions from '@spo/redux/cart/action';
import PageList from '../../config/PageList';

const navs = [
    {
        Id: 1,
        Name: 'Chờ xác nhận',
        Value: constants.ORDER_STATUS.NEW,
    },
    {
        Id: 2,
        Name: 'Đang xử lý',
        Value: [
            constants.ORDER_STATUS.CONFIRMED,
            constants.ORDER_STATUS.PREPARING,
        ],
    },
    {
        Id: 3,
        Name: 'Đang giao',
        Value: [
            constants.ORDER_STATUS.DELIVERING,
            constants.ORDER_STATUS.DELIVERED,
        ],
    },
    {
        Id: 4,
        Name: 'Đã nhận hàng',
        Value: [
            constants.ORDER_STATUS.CONFIRM_SHIPPED,
            constants.ORDER_STATUS.FINISHED,
        ],
    },
    {
        Id: 5,
        Name: 'Đã huỷ',
        Value: constants.ORDER_STATUS.CANCEL,
    },
    {
        Id: 6,
        Name: 'Trả hàng',
        Value: [
            constants.ORDER_STATUS.RETURNED,
            constants.ORDER_STATUS.REFUNDING,
            constants.ORDER_STATUS.CONFIRM_REFUNDED,
        ],
    },
];
const data_bread_crumb = [
    { name: 'Trang chủ', path_name: '/' },
    { name: 'Tài khoản', path_name: '/account' },
];

const OrderManagementContainer = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    // const [reviewDetail, setReviewDetail] = useState([]);
    const { orders, reviewDetail } = useSelector((state) => state.Account);
    const [queryParams, setQueryParams] = useState({});
    const [navsActive, setNavsActive] = useState(0);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openReviewModal, setOpenReviewModal] = useState(false);

    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        let index =
            router.query?.index && router.query?.index < 6
                ? router.query?.index
                : 0;
        let pageNo = router.query?.page ? router.query?.page : 1;

        setNavsActive(index);

        setQueryParams({
            index: index,
            page: pageNo,
        });
        dispatch({
            type: Actions.GET_CANCEL_REASON,
        });
        getOrders(pageNo, index);
    }, []);
    useEffect(() => {
        setTimeout(() => {
            handleScrollActive();
        }, 0);
    }, [router?.query?.index]);
    const handleScrollActive = () => {
        let _this = $('.common-navs--item.active');
        let pos = _this.position().left;
        let currentscroll = $('.common-navs').scrollLeft();
        let divwidth = $(_this).width();
        pos = pos + currentscroll - divwidth / 2;
        $('.common-navs').animate({
            scrollLeft: pos,
        });
    };
    const handleChangeActiveNavs = (index) => {
        if (index != navsActive) {
            setNavsActive(index);
            handleChangeRouter({ index });
        }
    };
    const toggleConfirmModal = (code, id) => {
        localStorage.setItem('OrderCode', code);
        localStorage.setItem('OrderId', id);

        setOpenConfirmModal(!openConfirmModal);
    };
    const toggleCancelModal = (code, statusCode) => {
        localStorage.setItem('OrderCode', code);
        localStorage.setItem('StatusCode', statusCode);
        setOpenCancelModal(!openCancelModal);
    };
    const toggleReviewModal = async (orderId) => {
        if (orderId) {
            dispatch({
                type: Actions.GET_REVIEW_DETAIL,
                data: {
                    Id: orderId,
                },
                callback: () => {
                    EventRegister.emit(EVENT_SHOW_POPUP, {
                        type: REVIEW_POPUP,
                        open: true,
                        payload: {
                            className: 'review_popup_container _mobile_screen',
                            callback: () => {
                                let index =
                                    router.query?.index &&
                                    router.query?.index < 6
                                        ? router.query?.index
                                        : 0;
                                let pageNo = router.query?.page
                                    ? router.query?.page
                                    : 1;
                                getOrders(pageNo, index);
                            },
                        },
                    });
                },
            });
        }
        // setOpenReviewModal(!openReviewModal);
    };

    const handleChangeRouter = (data) => {
        let query = { ...queryParams, ...data };

        setQueryParams(query);

        getOrders(query?.page, query?.index);

        delete router.query.paramName;
        router.replace(
            {
                query: {
                    ...query,
                },
            },
            undefined,
            { shallow: true }
        );
    };

    const getOrders = (pageNo = 1, index = 0) => {
        let offset = (pageNo - 1) * orders?.Limit;
        let statusCode = navs[index] ? navs[index]['Value'] : navs[0]['Value'];
        dispatch({
            type: Actions.GET_ORDER_BY_STATUS,
            data: {
                StatusCode: statusCode.toString(),
                Offset: offset,
            },
        });
    };
    // const handleSendReviewOrder = (data) => {
    //     let Files = [];
    //     data?.OrderDetailReviews.map((item, idx) => {
    //         let oldItem = reviewDetail.OrderDetailReviews[idx];
    //         if (oldItem['OrderDetailId']) {
    //             item['OrderDetailId'] = oldItem['OrderDetailId'];
    //         }
    //         item['OrderDetailReviewId'] = oldItem['OrderDetailReviewId'];
    //         item['FileIndexes'] = [];
    //         item.Files?.map((file, index) => {
    //             let oldImage = [];
    //             if (file?.Id) {
    //                 oldImage.push(file);
    //             } else {
    //                 item['FileIndexes'][index] = Files?.length;
    //                 Files.push(file);
    //             }
    //             item['Attachments'] = oldImage;
    //         });
    //         delete item.Files;
    //     });

    //     let newData = {
    //         OrderId: reviewDetail?.OrderId,
    //         Files: Files,
    //         RateService: data?.RateService,
    //         RateShipment: data?.RateShipment,
    //         OrderDetailReviews: data?.OrderDetailReviews,
    //     };
    //     if (reviewDetail['ReviewId'] != 0) {
    //         newData['ReviewId'] = reviewDetail['ReviewId'];
    //     }
    //     setOpenReviewModal(false);
    //     dispatch({
    //         type: Actions.REVIEW_ORDER,
    //         data: newData,
    //         status: constants.ORDER_STATUS.FINISHED,
    //     });
    // };
    const handleReOrder = (orderCode) => {
        Utils.confirmPopup('Bạn có muốn mua lại hàng?', (e) => {
            if (e) {
                dispatch({
                    type: Actions.ON_REORDER,
                    data: { orderCode },
                    callback: (data) => {
                        dispatch({
                            type: CartActions.UPDATE_CART_CHECKED,
                            payload: data,
                        });
                        useCustomRoute(dispatch, PageList.CART.SERVER, data);
                    },
                });
            }
        });
    };
    const handleCancelOrder = (cancelReason) => {
        let orderCode = localStorage.getItem('OrderCode');
        let statusCode = localStorage.getItem('StatusCode');
        let status = [constants.ORDER_STATUS.NEW];

        if (statusCode == constants.ORDER_STATUS.NEW) {
            status = [constants.ORDER_STATUS.NEW];
        } else if (
            statusCode == constants.ORDER_STATUS.CONFIRMED ||
            statusCode == constants.ORDER_STATUS.PREPARING
        ) {
            status = [
                constants.ORDER_STATUS.CONFIRMED,
                constants.ORDER_STATUS.PREPARING,
            ];
        }
        setOpenCancelModal(false);
        dispatch({
            type: Actions.CANCEL_ORDER,
            data: { OrderCode: orderCode, CancelReason: cancelReason },
            status: status.toString(),
        });
    };
    const handleReturnOrder = () => {
        let orderId = localStorage.getItem('OrderId');
        setOpenConfirmModal(false);
        Utils.confirmPopup('Bạn có muốn trả hàng hay không?', (res) => {
            if (res) {
                useCustomRoute(
                    dispatch,
                    `${PageList.ORDER_MANAGEMENT.SERVER}/${orderId}?isReturn=true`
                );
            }
        });
    };
    const handleConfirmOrder = () => {
        let orderCode = localStorage.getItem('OrderCode');
        let orderId = localStorage.getItem('OrderId');
        setOpenConfirmModal(false);
        dispatch({
            type: Actions.RECEIVED_ORDER,
            data: { OrderCode: orderCode },
            callback: () => {
                // move to review product and show review modal
                handleChangeActiveNavs(3);
                setSelectedOrderId(orderId);
            },
        });
    };
    return (
        <div>
            {/* {openReviewModal ? (
                <ReviewModal
                    active={openReviewModal}
                    hide={toggleReviewModal}
                    detail={reviewDetail}
                    handleClick={handleSendReviewOrder}
                />
            ) : null} */}
            {openConfirmModal && (
                <ConfirmModal
                    active={openConfirmModal}
                    hide={toggleConfirmModal}
                    onConfirm={handleConfirmOrder}
                    onReturn={handleReturnOrder}
                />
            )}
            {openCancelModal && (
                <CancelModal
                    active={openCancelModal}
                    hide={toggleCancelModal}
                    handleClick={handleCancelOrder}
                />
            )}
            <BreadCrumb data={data_bread_crumb} />
            <div className="bg-white account-info">
                <div className="px-0">
                    <div className="page-body">
                        <Display>
                            <div className="col-12 col-lg-3 px-0">
                                <VerticalTab index={1} />
                            </div>
                        </Display>
                        <div className="col-12 p-0 p-md-1 col-lg-9 px-0 container-left-table">
                            <div className="order-management">
                                <CommonNavs
                                    data={navs}
                                    onPress={handleChangeActiveNavs}
                                    active={navsActive}
                                />
                                {orders?.Orders?.length > 0 ? (
                                    <React.Fragment>
                                        {/* renderTable(navsActive) */}
                                        {navsActive <= 1 && (
                                            <ConfirmationTable
                                                onCancel={toggleCancelModal}
                                                orders={orders}
                                            />
                                        )}
                                        {navsActive == 2 && (
                                            <DeliveringTable
                                                onCancel={toggleCancelModal}
                                                onConfirm={toggleConfirmModal}
                                                orders={orders}
                                            />
                                        )}
                                        {navsActive == 3 && (
                                            <ReceivedTable
                                                onReview={toggleReviewModal}
                                                orders={orders}
                                                selectedOrderId={
                                                    selectedOrderId
                                                }
                                            />
                                        )}
                                        {navsActive == 4 && (
                                            <CancelTable
                                                onReOrder={handleReOrder}
                                                orders={orders}
                                            />
                                        )}
                                        {navsActive == 5 && (
                                            <ReturnedTable orders={orders} />
                                        )}
                                    </React.Fragment>
                                ) : (
                                    <Empty />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderManagementContainer;
