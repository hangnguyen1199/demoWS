// import IconSuccess from '@spo/icons/icon-success';
import React, { useEffect, useState } from 'react';
import { FormattedNumber } from 'react-intl';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import constants from '../../../config/constants';
import ButtonRipple from '../button-ripple';
import IconReviewHappy from './../../account/order-management/icon/icon-review-happy';
import IconReviewNormal from './../../account/order-management/icon/icon-review-normal';
import IconReviewSad from './../../account/order-management/icon/icon-review-sad';
import UploadMultipleImages from './../../account/order-management/upload-multiple-images';
import ResizePopup from './resize-popup';
import AccountActions from '@spo/redux/account/actions';
import CustomFrame from './../custom-frame';
import Image from './../image';
import ButtonMain from '../button-main';

export const ComponentIcon = (props) => {
    const { input, defaultRate, disable = false } = props;
    const [rate, setRate] = useState(defaultRate || 0);
    useEffect(() => {
        input?.onChange(defaultRate);
    }, []);

    const handleRate = (value) => {
        if (!disable) {
            input?.onChange(value);
            setRate(value);
        }
    };
    return (
        <div className="review__modal__icon">
            <button onClick={() => handleRate(1)}>
                <IconReviewSad color={rate == 1 ? '#FF2C00' : '#d8d7d7'} />
            </button>
            <button onClick={() => handleRate(2)}>
                <IconReviewNormal color={rate == 2 ? '#FFD500' : '#d8d7d7'} />
            </button>
            <button onClick={() => handleRate(3)}>
                <IconReviewHappy color={rate == 3 ? '#0DBC00' : '#d8d7d7'} />
            </button>
        </div>
    );
};
export const IconTextEvaluate = (props) => {
    const { text } = props;
    return (
        <div className="evaluate__content">
            <p className="modal-review-title-evaluate">{text}</p>
            <div className="evaluate__icon">
                <ComponentIcon {...props} />
            </div>
            <p className="modal-review-title-evaluate"></p>
        </div>
    );
};
export const ComponentInput = (props) => {
    const { type = 'text', defaultValue, input, disable = false } = props;
    useEffect(() => {
        defaultValue != 'null' && props?.input.onChange(defaultValue);
    }, []);

    const onChange = (e) => {
        input.onBlur(e.target.value);
    };
    return (
        <input
            type={type}
            onChange={onChange}
            placeholder="Nhập nội dung vào đây"
            className="input__review"
            defaultValue={defaultValue}
            disabled={disable}
        />
    );
};
function ReviewPopup(props) {
    const { payload, showVisible, handleSubmit } = props;
    const { reviewDetail } = useSelector((state) => state.Account);
    const dispatch = useDispatch();
    const { data: auth } = useSelector((state) => state.Auth);
    const [error, setError] = useState(false);
    const onSubmit = (data) => {
        let isError=false
        if (
            data.RateService == 0 ||
            (reviewDetail.HowToOrder > 1 && data.RateShipment == 0)
        ) {
            setError('Bạn chưa chọn đánh giá của mình');
            return;
        }
        data.OrderDetailReviews.map((item, idx) => {
            if (item.Rate == 0) {
                setError('Bạn chưa chọn đánh giá của mình');
                return item;
            }
            return item;
        });

        let formInputData = data.OrderDetailReviews;
        formInputData?.forEach(v => {
            if (v.Files?.length > 0 && !v.Content) {
                isError=true;
                setError('Bạn chưa nhập đánh giá của mình')
                return v;
            }
        })
        if(!isError){
            handleSendReviewOrder(data);
        }
    };
    const handleSendReviewOrder = (data) => {
        let Files = [];
        data?.OrderDetailReviews.map((item, idx) => {
            let oldItem = reviewDetail.OrderDetailReviews[idx];
            if (oldItem['OrderDetailId']) {
                item['OrderDetailId'] = oldItem['OrderDetailId'];
            }
            item['OrderDetailReviewId'] = oldItem['OrderDetailReviewId'];
            item['FileIndexes'] = [];
            item['Content'] = item?.Content || '';
            item.Files?.map((file, index) => {
                let oldImage = [];
                if (file?.Id) {
                    oldImage.push(file);
                } else {
                    item['FileIndexes'][index] = Files?.length;
                    Files.push(file);
                }
                item['Attachments'] = oldImage;
                return file;
            });
            delete item.Files;
            return item;
        });
        let newData = {
            OrderId: reviewDetail?.OrderId,
            Files: Files,
            RateService: data?.RateService,
            RateShipment: data?.RateShipment,
            OrderDetailReviews: data?.OrderDetailReviews,
        };
        if (reviewDetail['ReviewId'] != 0) {
            newData['ReviewId'] = reviewDetail['ReviewId'];
        }
        dispatch({
            type: AccountActions.REVIEW_ORDER,
            data: newData,
            status: constants.ORDER_STATUS.FINISHED,
            callback: () => {
                if (typeof payload?.callback == 'function') {
                    payload?.callback();
                    showVisible(false);
                }
            },
        });
    };
    const toDateString = (str) => {
        return `${str.substring(8, 10)}.${str.substring(5, 7)}.${str.substring(
            0,
            4,
        )} - ${str.substring(11, 16)}`;
    };
    const toStringNumber = (num) => {
        if (num == null || num == '') {
            return '0';
        }
        return `${Math.round(num)}`.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    };
    const renderHeader = () => {
        return (
            <>
                <div className="w-100">
                    {payload?.from == 'reviews' ? (
                        <div className="section_wrap_review">
                            <div className="w-100 section_title">
                                Đánh giá đơn hàng
                            </div>
                            <div className="_wrap_review_">
                                <div className="modal__review__header__content my-reviews">
                                    <div className="review-content">
                                        <div className="review-header">
                                            <p>
                                                {toDateString(
                                                    payload?.order.CreatedAt,
                                                )}
                                            </p>
                                            <p className="text-right status-name">
                                                {payload?.order.StatusName}
                                            </p>
                                        </div>
                                        <div className="wrap_product_review">
                                            <div className="thumb">
                                                <CustomFrame ratio={1}>
                                                    <Image
                                                        className="w-100 h-100"
                                                        src={
                                                            payload?.order.Thumb
                                                        }
                                                        alt={
                                                            payload?.order
                                                                .OrderCode
                                                        }
                                                    />
                                                </CustomFrame>
                                            </div>
                                            <div className="order-info">
                                                {payload?.order.BranchName && (
                                                    <p>
                                                        <label>Cửa hàng</label>:{' '}
                                                        {
                                                            payload?.order
                                                                .BranchName
                                                        }
                                                    </p>
                                                )}
                                                <p>
                                                    <label>Số hoá đơn</label>:{' '}
                                                    {payload?.order.OrderCode}
                                                </p>
                                                <p>
                                                    <label>Số lượng</label>:{' '}
                                                    {toStringNumber(
                                                        payload?.order
                                                            .NumberOfProduct,
                                                    )}{' '}
                                                    sản phẩm
                                                </p>
                                                <p>
                                                    <label>
                                                        Tổng thanh toán
                                                    </label>
                                                    :{' '}
                                                    {toStringNumber(
                                                        payload?.order
                                                            .TotalPrice,
                                                    )}{' '}
                                                    <span>VND</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="modal__review__header__content _order_reviews">
                            <p
                                style={{ fontSize: '14px' }}
                                className="modal-review-title modal-review-title-point color_green">
                                +
                                {
                                    <FormattedNumber
                                        value={reviewDetail?.AddPoint}
                                    />
                                }{' '}
                                điểm
                            </p>
                            <p className="modal-review-title text-font-black-600">
                                {reviewDetail?.PaymentStatusName}
                            </p>
                            <p className="modal-review-title">
                                Cảm ơn quý khách hàng đã mua sắm ở{' '}
                                <span className="color_red">FM</span>
                            </p>
                            <p className="modal-review-title">
                                Điểm bạc của quý khách là:
                            </p>
                            <p className="modal-review-title">
                                <span className="color_red">
                                    <FormattedNumber
                                        value={reviewDetail?.UserNormalPoint}
                                    />{' '}
                                    điểm
                                </span>
                                :{' '}
                                <FormattedNumber
                                    value={
                                        reviewDetail?.UserNormalPoint *
                                        auth.User?.PointToMoney
                                    }
                                />{' '}
                                <span className="text-size-9">VND</span>
                            </p>
                        </div>
                    )}
                </div>
                {payload?.from != 'reviews' && (
                    <div className="modal__review__contact">
                        <p className="modal-review-title">
                            Nếu nhân viên không xuất hóa đơn thì Quý Khách sẽ
                            được miễn phí đơn hàng đó. Quý Khách vui lòng gọi
                            vào số{' '}
                            <span className="color_red">090.1800.888</span>{' '}
                            <span className="text-font-black">(Bấm số 8)</span>{' '}
                            để phản ánh.
                        </p>
                    </div>
                )}
            </>
        );
    };
    const renderBody = () => {
        return (
            <>
                {reviewDetail?.OrderCode && (
                    <div className="wrap-content-modal">
                        <Field
                            name="RateService"
                            component={IconTextEvaluate}
                            text="Đánh giá dịch vụ"
                            defaultRate={
                                reviewDetail.RateService == 0
                                    ? 3
                                    : reviewDetail.RateService
                            }
                            // disable={
                            //     payload?.from == 'reviews'
                            // }
                        />
                        {/* <Field
                            name="RateService"
                            component={IconTextEvaluate}
                            text="Đánh giá dịch vụ"
                            defaultRate={
                                reviewDetail.RateService == 0
                                    ? 3
                                    : reviewDetail.RateService
                            }
                            disable={
                                !(
                                    !reviewDetail?.ReviewId ||
                                    payload?.from == 'reviews'
                                )
                            }
                        /> */}
                        {reviewDetail.HowToOrder > 1 && (
                            <Field
                                name="RateShipment"
                                component={IconTextEvaluate}
                                text="Đánh giá vận chuyển"
                                defaultRate={
                                    reviewDetail.RateShipment == 0
                                        ? 3
                                        : reviewDetail.RateShipment
                                }
                                // disable={
                                //     payload?.from == 'reviews'
                                // }
                            />
                            // <Field
                            //     name="RateShipment"
                            //     component={IconTextEvaluate}
                            //     text="Đánh giá vận chuyển"
                            //     defaultRate={
                            //         reviewDetail.RateShipment == 0
                            //             ? 3
                            //             : reviewDetail.RateShipment
                            //     }
                            //     disable={
                            //         !(
                            //             !reviewDetail?.ReviewId ||
                            //             payload?.from == 'reviews'
                            //         )
                            //     }
                            // />
                        )}
                        <p className="modal-review-title">Đánh giá sản phẩm</p>
                        {reviewDetail?.OrderDetailReviews?.map(
                            (item, index) => (
                                <div className="review__content" key={index}>
                                    <div className="review__detail">
                                        <div className="img">
                                            <Image
                                                className="w-100 h-100"
                                                src={item?.Thumb}
                                                alt="thumb"
                                                width={142}
                                            />
                                        </div>
                                        <div className="detail">
                                            <p className="text-font-black">
                                                {item?.ProductName}
                                            </p>
                                            <p className="text-size-min">
                                                {item?.ProductSKU}
                                            </p>
                                            <p>
                                                Màu:{item?.Color} | Size:
                                                {item?.Size}
                                            </p>
                                            <p className="color_red">
                                                <FormattedNumber
                                                    value={item?.PaymentPrice}
                                                />{' '}
                                                <span className="text-size-9">
                                                    VND
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="review__icon">
                                        <Field
                                            name={`OrderDetailReviews[${index}][Rate]`}
                                            component={IconTextEvaluate}
                                            defaultRate={
                                                item?.Rate == 0 ? 3 : item?.Rate
                                            }
                                            // disable={
                                            //     payload?.from == 'reviews'
                                            // }
                                        />
                                        {/* <Field
                                            name={`OrderDetailReviews[${index}][Rate]`}
                                            component={IconTextEvaluate}
                                            defaultRate={
                                                item?.Rate == 0 ? 3 : item?.Rate
                                            }
                                            disable={
                                                !(
                                                    !reviewDetail?.ReviewId ||
                                                    payload?.from == 'reviews'
                                                )
                                            }
                                        /> */}
                                    </div>
                                    <Field
                                        name={`OrderDetailReviews[${index}][Content]`}
                                        component={ComponentInput}
                                        defaultValue={item?.Content}
                                        // disable={
                                        //     payload?.from == 'reviews'
                                        // }
                                    />
                                    {/* <Field
                                        name={`OrderDetailReviews[${index}][Content]`}
                                        component={ComponentInput}
                                        defaultValue={item?.Content}
                                        disable={
                                            !(
                                                !reviewDetail?.ReviewId ||
                                                payload?.from == 'reviews'
                                            )
                                        }
                                    /> */}

                                    <Field
                                        name={`OrderDetailReviews[${index}][Files]`}
                                        component={UploadMultipleImages}
                                        defaultImages={item?.Attachments}
                                        maxFiles={5}
                                        maxFileSize={3 * 1024 * 1024}
                                        index={index}
                                        // disable={
                                        //     payload?.from == 'reviews'
                                        // }
                                    />
                                    {/* <Field
                                        name={`OrderDetailReviews[${index}][Files]`}
                                        component={UploadMultipleImages}
                                        defaultImages={item?.Attachments}
                                        maxFiles={5}
                                        maxFileSize={3 * 1024 * 1024}
                                        index={index}
                                        disable={
                                            !(
                                                !reviewDetail?.ReviewId ||
                                                payload?.from == 'reviews'
                                            )
                                        }
                                    /> */}
                                </div>
                            ),
                        )}
                    </div>
                )}
            </>
        );
    };
    const renderFooter = () => {
        return (
            <div>
                {error && <p>{error}</p>}
                {/* {(!reviewDetail?.ReviewId || payload?.from == 'reviews') ? (
                    <div className="d-center wrap_btn_footer">
                        <ButtonMain
                            className="__btn_main btn_confirm_address"
                            title={'Xác nhận'}
                            onClick={handleSubmit(onSubmit)}
                            fontSize={14}
                        />
                    </div>
                ) : <div className="_paddingScreen"></div>} */}
                <div className="d-center wrap_btn_footer">
                    <ButtonMain
                        className="__btn_main btn_confirm_address"
                        title={'Xác nhận'}
                        onClick={handleSubmit(onSubmit)}
                        fontSize={14}
                    />
                </div>
            </div>
        );
    };
    return (
        <ResizePopup
            className="review-popup"
            payload={payload}
            showVisible={showVisible}
            body={renderBody}
            footer={renderFooter}
            header={renderHeader}
        />
    );
}
ReviewPopup.defaultProps = {
    payload: {
        title: 'Đã lưu thành công',
    },
};
ReviewPopup = reduxForm({ form: 'ReviewPopup' })(ReviewPopup);
const selector = formValueSelector('ReviewPopup');
ReviewPopup = connect((state) => {
    const OrderDetailReviews = selector(state, 'OrderDetailReviews');
    return {
        OrderDetailReviews,
    };
})(ReviewPopup);
export default ReviewPopup;
