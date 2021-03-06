import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector , connect } from 'react-redux';
import IconXCircle from '../../../common/icon-x-circle';
import Image from 'next/image';
import IconAddUrl from '@spo/public/images/icon/ic_add.svg';
import { FormattedNumber } from 'react-intl';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import IconReviewNormal from '../icon/icon-review-normal';
import IconReviewSad from '../icon/icon-review-sad';
import IconReviewHappy from '../icon/icon-review-happy';
import UploadMultipleImages from '../upload-multiple-images';
import { da } from 'date-fns/locale';

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
        console.log(e.target.value);
    };
    return (
        <input
            type={type}
            onChange={onChange}
            placeholder="Nh???p n???i dung v??o ????y"
            className="input__review"
            defaultValue={defaultValue}
            disabled={disable}
        />
    );
};

let ReviewModal = (props) => {
    const { detail, handleClick, handleSubmit, OrderDetailReviews, from, order } = props;
    const { data: auth } = useSelector((state) => state.Auth);
    const [error, setError] = useState(false);
    const onSubmit = (data) => {
        if(data.RateService == 0 || (detail.HowToOrder > 1 && data.RateShipment == 0)) {
            setError('B???n ch??a ch???n ????nh gi?? c???a m??nh');
            return;
        }
        data.OrderDetailReviews.map((item, idx) => {
            if (item.Rate == 0) {
                setError('B???n ch??a ch???n ????nh gi?? c???a m??nh');
                
            }
        });
        handleClick(data);
    };
    const toDateString = (str) => {
        return `${str.substring(8,10)}.${str.substring(5,7)}.${str.substring(0,4)} - ${str.substring(11,16)}`;
    };
    const toStringNumber = (num) => {
        if (num == null || num == '') {
            return '0';
        }
        return (`${Math.round(num)  }`).replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    };
    return (
        <div
            className={`custom-modal  _shadow1  ${
                props?.active && 'active'
            } confirm-order-modal review-modal`}>
            {/* <div className="overlay" onClick={() => props.hide()}></div> */}
            <div className="custom-modal-review">
                {detail?.OrderCode && (
                    <div className="wrap-content-modal _shadow1">
                        <div className="modal__review__content">
                            <div className="btn-icon-close"></div>
                            {from == 'reviews' ?
                                <div className="modal__review__header__content my-reviews">
                                    <div className="review-content">
                                        <h3>????nh gi?? ????n h??ng</h3>
                                        <hr className='mb-10'/>
                                        <div className="review-header mb-5">
                                            <p>{toDateString(order.CreatedAt)}</p>
                                            <p className="text-right status-name">{order.StatusName}</p>
                                        </div>
                                        <div className="thumb">
                                            <img src={order.Thumb} alt={order.OrderCode}/>
                                        </div>
                                        <div className="order-info">
                                            {order.BranchName && <p><label>C???a h??ng</label>: {order.BranchName}</p>}
                                            <p><label>S??? ho?? ????n</label>: {order.OrderCode}</p>
                                            <p><label>S??? l?????ng</label>: {toStringNumber(order.NumberOfProduct)} s???n ph???m</p>
                                            <p><label>T???ng thanh to??n</label>: {toStringNumber(order.TotalPrice)} <span>VND</span></p>
                                        </div>
                                        <hr/>
                                    </div>
                                </div>:
                                <div className="modal__review__header__content">
                                    <p
                                        style={{ fontSize: '14px' }}
                                        className="modal-review-title modal-review-title-point color_green">
                                    +
                                        {
                                            <FormattedNumber
                                                value={detail?.AddPoint}
                                            />
                                        }{' '}
                                    ??i???m
                                    </p>
                                    <p className="modal-review-title text-font-black-600">
                                        {detail?.PaymentStatusName}
                                    </p>
                                    <p className="modal-review-title">
                                    C???m ??n qu?? kh??ch h??ng ???? mua s???m ???{' '}
                                        <span className="color_red">FM</span>
                                    </p>
                                    <p className="modal-review-title">
                                    ??i???m b???c c???a qu?? kh??ch l??:
                                    </p>
                                    <p className="modal-review-title">
                                        <span className="color_red">
                                            <FormattedNumber value={detail?.UserNormalPoint} /> ??i???m
                                        </span>
                                    :{' '}
                                        <FormattedNumber value={detail?.UserNormalPoint*auth.User?.PointToMoney} />{' '}
                                        <span className="text-size-9">VND</span>
                                    </p>
                                </div>}
                            <div
                                className="btn-icon-close"
                                onClick={() => props.hide()}>
                                <IconXCircle />
                            </div>
                        </div>
                        {from != 'reviews' && <div className="modal__review__contact">
                            <p className="modal-review-title">
                                N???u nh??n vi??n kh??ng xu???t h??a ????n th?? Qu?? Kh??ch
                                s??? ???????c mi???n ph?? ????n h??ng ????. Qu?? Kh??ch vui l??ng
                                g???i v??o s???{' '}
                                <span className="color_red">090.1800.888</span>{' '}
                                <span className="text-font-black">
                                    (B???m s??? 8)
                                </span>{' '}
                                ????? ph???n ??nh.
                            </p>
                        </div>}
                        <div className="modal__review__main">
                            <Field
                                name="RateService"
                                component={IconTextEvaluate}
                                text="????nh gi?? d???ch v???"
                                defaultRate={detail.RateService == 0 ? 3 : detail.RateShipment}
                                disable={detail?.ReviewId}
                            />
                            {detail.HowToOrder > 1 && <Field
                                name="RateShipment"
                                component={IconTextEvaluate}
                                text="????nh gi?? v???n chuy???n"
                                defaultRate={detail.RateShipment == 0 ? 3 : detail.RateShipment}
                                disable={detail?.ReviewId}
                            />}
                            <p className="modal-review-title">
                                ????nh gi?? s???n ph???m
                            </p>
                            {detail?.OrderDetailReviews?.map((item, index) => (
                                <div className="review__content" key={index}>
                                    <div className="review__detail">
                                        <div className="img">
                                            <img
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
                                                M??u:{item?.Color} | Size:
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
                                            defaultRate={item?.Rate == 0 ? 3 : item?.Rate}
                                            disable={detail?.ReviewId}
                                        />
                                    </div>
                                    <Field
                                        name={`OrderDetailReviews[${index}][Content]`}
                                        component={ComponentInput}
                                        defaultValue={item?.Content}
                                        disable={detail?.ReviewId}
                                    />

                                    <Field
                                        name={`OrderDetailReviews[${index}][Files]`}
                                        component={UploadMultipleImages}
                                        defaultImages={item?.Attachments}
                                        maxFiles={5}
                                        maxFileSize={3 * 1024 * 1024}
                                        index={index}
                                        disable={detail?.ReviewId}
                                    />
                                </div>
                            ))}
                        </div>
                        {!detail?.ReviewId && (
                            <div className="btn-save">
                                <button onClick={handleSubmit(onSubmit)} onBlur={()=>{setError(null)}}>
                                    X??c nh???n
                                </button>
                                {error && <p>{error}</p>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

ReviewModal = reduxForm({ form: 'ReviewForm' })(ReviewModal);
const selector = formValueSelector('ReviewForm');
ReviewModal = connect((state) => {
    const OrderDetailReviews = selector(state, 'OrderDetailReviews');
    return {
        OrderDetailReviews,
    };
})(ReviewModal);
export default ReviewModal;
