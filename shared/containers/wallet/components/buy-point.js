import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RenderMatInput from '../../../components/redux-form/common/render-mat-input';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import * as Validator from '@spo/lib/validator';
import IconX from '@spo/components/common/icon-x';
import IconChevronRight from '@spo/components/common/icon-chevron-right';
import useCustomRoute from '@spo/lib/use-custom-route';
import Currency from 'react-currency-formatter';

function BuyPoint (props) {
    const dispatch = useDispatch();
    const { data: { settingMaster } } = useSelector((state) => state.Common);
    const [pointBuy, setPointBuy] = useState(0);
    const onGoBranchList = () => {
        useCustomRoute(dispatch, '/branch-list');
    };
    function calcMoney(point) {
        let total = pointBuy * settingMaster?.Setting?.PointToMoney;
        return total - (total * settingMaster?.Setting?.DiscountPoint / 100);
    }
    return (
        <div className='buy-point pd-lr-common'>
            <div className='d-center flex-column'>
                <div className='w-100 d-center' style={{height: 45}}>
                    <div>
            Nạp điểm vàng
                    </div>
                    <div className="close-popup-btn" style={{ margin: 5, position: 'absolute', right: 5}}
                        onClick={props.onCloseBuyPoint}>
                        <IconX fontSize={24} />
                    </div>
                </div>
                <div className='buy-point-content'>
                    <div className='row mx-0'>
                        <div className='col-12 px-0'>
                            <div className='d-flex flex-column input-point'>
                                <div>
                    Số điểm cần mua
                                </div>
                                <div className='text-right' style={{fontSize: 20, fontWeight: 500}}>
                                    <Currency
                                        quantity={pointBuy}
                                        currency="VND"
                                        pattern="##,### !"
                                        symbol=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 px-0 d-end py-2'>
              Điểm số của bạn là bội số của 1000
                        </div>
                        <div className='col-4 px-0'>
                            <div className='point-suggest' onClick={() => setPointBuy(1000)}>
                1000
                            </div>
                        </div>
                        <div className='col-4 px-0'>
                            <div className='point-suggest' onClick={() => setPointBuy(2000)}>
                2000
                            </div>
                        </div>
                        <div className='col-4 px-0'>
                            <div className='point-suggest' onClick={() => setPointBuy(3000)}>
                3000
                            </div>
                        </div>
                        <div className='col-4 px-0'>
                            <div className='point-suggest' onClick={() => setPointBuy(4000)}>
                4000
                            </div>
                        </div>
                        <div className='col-4 px-0'>
                            <div className='point-suggest' onClick={() => setPointBuy(5000)}>
                5000
                            </div>
                        </div>
                        <div className='col-4 px-0'>
                            <div className='point-suggest' onClick={() => setPointBuy(0)}>
                Số khác
                            </div>
                        </div>
                        <div className='col-12 px-0 d-start flex-column align-items-start py-2'>
                            <div className='d-flex'>
                Số tiền cần thanh toán là:
                                <div className='px-1' style={{fontWeight: 500}}>
                                    <Currency
                                        quantity={calcMoney()}
                                        currency="VND"
                                        pattern="##,### !"
                                        symbol=""
                                    />
                                    <span className="currency fontsize11">VND</span>
                                </div>
                            </div>
                            <span>* Quý khách được chiết khấu {settingMaster?.Setting?.DiscountPoint}%</span>
                        </div>
                        <div className='col-12 px-0 d-start flex-column align-items-start'>
                            <div style={{textTransform: "uppercase", fontSize: 16, fontWeight: 500, padding: "15px 0px", borderBottom: "0.5px solid #D8D7D7" , borderTop: "0.5px solid #D8D7D7", width: '100%'}}>Phương thức thanh toán</div>
                            <div className='w-100 d-flex justify-content-between align-items-center py-3'>
                                <div className='d-center' style={{ border: "0.5px solid #333", width: 50, height: 43, borderRadius: 4}}>
                                    <img src='/images/icon/wallet/banking.svg' style={{ width: 20 }} />
                                </div>
                                <div className='w-100' style={{paddingLeft: 15}}>
                  Chuyển khoản
                                </div>
                                <div>
                                    <IconChevronRight fontSize={16} />
                                </div>
                            </div>
                            <div className='w-100 d-flex justify-content-between align-items-center' onClick={onGoBranchList}>
                                <div className='d-center' style={{ border: "0.5px solid #333", width: 50, height: 43, borderRadius: 4}}>
                                    <img src='/images/icon/wallet/store.svg' style={{ width: 20 }} />
                                </div>
                                <div className='w-100' style={{paddingLeft: 15}}>
                  Mua tại cửa hàng FM
                                </div>
                                <div>
                                    <IconChevronRight fontSize={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
BuyPoint = reduxForm({
    form: 'BuyPoint',
    enableReinitialize: true,
})(BuyPoint);
export default BuyPoint;
