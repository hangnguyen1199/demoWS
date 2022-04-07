import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalComponent from './ModalComponent';
import Image from '@spo/components/common/image';
import ButtonDark from '@spo/components/common/button-dark';
import RenderInput from '../../redux-form/order/render-input';
import { Field, reduxForm } from 'redux-form';

PointModal.propTypes = {};

function PointModal(props) {
    const { profile, order, onUsePoint } = props;
    const lbl_btn_confirm = 'Xác nhận';

    const [useGoldPoint, setUseGoldPoint] = useState('');
    const [useGoldPointMoney, setUseGoldPointMoney] = useState('');
    const [useNormalPoint, setUseNormalPoint] = useState('');
    const [useNormalPointMoney, setUseNormalPointMoney] = useState('');

    const toStringNumber = (num) => {
        if (num == null || num == '') {
            return '0';
        }
        return (`${Math.round(num)  }`).replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    };

    const focusInputUseNormalPoint = (e) => {
        setUseNormalPoint(e.target.value.replace(/\./g, ''));
    };

    const blurInputUseNormalPoint = (e) => {
        setUseNormalPoint(toStringNumber(e.target.value.replace(/\./g, '')));
    };

    const changeUseNormalPoint = (e) => {
        let val = 0;
        if (e.target.value == '') {
            setUseNormalPointMoney('');
        } else {
            val = parseInt(e.target.value.replace(/\./g, ''));
        }
        doChangeUseNormalPoint(val);
    };

    const doChangeUseNormalPoint = (val) => {
        let maxPoint = order.PaymentTotalAmount / profile.PointToMoney;
        if (val > profile.NormalPoint) {
            val = profile.NormalPoint;
        }
        if (val > maxPoint) {
            val = maxPoint;
        }
        setUseNormalPoint(val);
        setUseNormalPointMoney(toStringNumber(val * profile.PointToMoney));
    };

    const focusInputUseGoldPoint = (e) => {
        setUseGoldPoint(e.target.value.replace(/\./g, ''));
    };

    const blurInputUseGoldPoint = (e) => {
        setUseGoldPoint(toStringNumber(e.target.value.replace(/\./g, '')));
    };

    const changeUseGoldPoint = (e) => {
        let val = 0;
        if (e.target.value == '') {
            setUseGoldPointMoney('');
        } else {
            val = parseInt(e.target.value.replace(/\./g, ''));
        }
        doChangeUseGoldPoint(val);
    };

    const doChangeUseGoldPoint = (val) => {
        let maxPoint = order.PaymentTotalAmount / profile.PointToMoney;
        if (val > profile.GoldPoint) {
            val = profile.GoldPoint;
        }
        if (val > maxPoint) {
            val = maxPoint;
        }
        setUseGoldPoint(val);
        setUseGoldPointMoney(toStringNumber(val * profile.PointToMoney));
    };

    const confirmUsePoint = () => {
        onUsePoint(
            useGoldPoint.replace(/\./g, ''),
            useNormalPoint.replace(/\./g, ''),
        );
    };

    useEffect(() => {
        setUseNormalPoint(
            order.UseNormalPoint == 0 ? '' : order.UseNormalPoint,
        );
        doChangeUseNormalPoint(
            order.UseNormalPoint == 0 ? '' : order.UseNormalPoint,
        );
        setUseGoldPoint(order.UseGoldPoint == 0 ? '' : order.UseGoldPoint);
        doChangeUseGoldPoint(order.UseGoldPoint == 0 ? '' : order.UseGoldPoint);
    }, []);

    const _renderComponentChildren = () => {
        return (
            <div>
                <div className="container">
                    <div className="row d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between point-item-row">
                            <div className="w-point mobile-label">
                                Số điểm hiện tại:
                            </div>
                            <div className="w-point d-flex point-coin-wrap">
                                <Image
                                    src={`/images/order/gold_coin.png`}
                                    className="point-coin"
                                />
                                {toStringNumber(profile.GoldPoint)}
                            </div>
                            <div className="w-point text-right">
                                <span>≈</span>
                                <span className="pl-1 pr-1">
                                    {toStringNumber(
                                        profile.GoldPoint *
                                            profile.PointToMoney,
                                    )}
                                </span>
                                <span className="text-size-10">VND</span>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between point-item-row">
                            <div className="w-point mobile-label"></div>
                            <div className="w-point d-flex point-coin-wrap">
                                <Image
                                    src={`/images/order/silver_coin.png`}
                                    className="point-coin"
                                />
                                {toStringNumber(profile.NormalPoint)}
                            </div>
                            <div className="w-point text-right">
                                <span>≈</span>
                                <span className="pl-1 pr-1">
                                    {toStringNumber(
                                        profile.NormalPoint *
                                            profile.PointToMoney,
                                    )}
                                </span>
                                <span className="text-size-10">VND</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="cross-line  mg-t-b-20" />
                <div className="container">
                    <div className="row d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between align-items-center point-item-row">
                            <div className="w-point mobile-label">
                                Sử dụng điểm:
                            </div>
                            <div className="w-point d-flex point-coin-wrap">
                                <Image
                                    src={`/images/order/gold_coin.png`}
                                    className="point-coin-2"
                                />
                                <div className="input-order-wrap input-order-point-wrap">
                                    <Field
                                        id="GoldPointId"
                                        name="GoldPointId"
                                        component={RenderInput}
                                        type="text"
                                        className="input-order-style"
                                        input={{
                                            disabled: profile.GoldPoint == 0,
                                            value: useGoldPoint,
                                            onChange: changeUseGoldPoint,
                                            onFocus: focusInputUseGoldPoint,
                                            onBlur: blurInputUseGoldPoint,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-point text-right d-flex align-items-center justify-content-end">
                                <div className="input-order-wrap input-order-point-wrap mr-1">
                                    <Field
                                        id="GoldAmountId"
                                        name="GoldAmountId"
                                        component={RenderInput}
                                        type="text"
                                        className="input-order-style"
                                        placeholder=""
                                        input={{
                                            readonly: true,
                                            value: useGoldPointMoney,
                                        }}
                                    />
                                </div>
                                <span className="text-size-10">VND</span>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center point-item-row">
                            <div className="w-point mobile-label"></div>
                            <div className="w-point d-flex point-coin-wrap">
                                <Image
                                    src={`/images/order/silver_coin.png`}
                                    className="point-coin-2"
                                />
                                <div className="input-order-wrap input-order-point-wrap">
                                    <Field
                                        id="SilverPointId"
                                        name="SilverPointId"
                                        component={RenderInput}
                                        type="text"
                                        className="input-order-style"
                                        input={{
                                            disabled: profile.NormalPoint == 0,
                                            value: useNormalPoint,
                                            onChange: changeUseNormalPoint,
                                            onFocus: focusInputUseNormalPoint,
                                            onBlur: blurInputUseNormalPoint,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-point text-right d-flex align-items-center justify-content-end">
                                <div className="input-order-wrap input-order-point-wrap mr-1">
                                    <Field
                                        id="SilverAmountId"
                                        name="SilverAmountId"
                                        component={RenderInput}
                                        type="text"
                                        className="input-order-style"
                                        placeholder=""
                                        input={{
                                            readonly: true,
                                            value: useNormalPointMoney,
                                        }}
                                    />
                                </div>
                                <span className="text-size-10">VND</span>
                            </div>
                        </div>
                    </div>
                    <div className="row d-center pl-0 pr-0">
                        <ButtonDark
                            className="btn-size-small text-uppercase btn-point-confirm"
                            title={lbl_btn_confirm}
                            onClick={() => confirmUsePoint()}
                            fontSize={14}
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <ModalComponent
                open={props.open}
                hide={() => props.hide()}
                children={_renderComponentChildren()}
                className="point-modal"
                title={props.title}></ModalComponent>
        </div>
    );
}

export default reduxForm({ form: 'PointModalForm' })(PointModal);
