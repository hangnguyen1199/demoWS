import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OrderActions from '@spo/redux/order/action';

import PropTypes from 'prop-types';
import RenderInput from '../redux-form/order/render-input';
import { Field, reduxForm } from 'redux-form';
import Image from '@spo/components/common/image';

TimeComponent.propTypes = {};

function TimeComponent(props) {
    const dispatch = useDispatch();
    const Name_Time_Title = 'Thời gian nhận hàng';
    const Name_All_Title = 'Tất cả các ngày trong tuần';
    const Name_Working_Title = 'Chỉ giao giờ hành chính';

    const [selectedId, setSelectedId] = useState(2);
    const [note, setNote] = useState('');
    const { times, order } = props;

    const selectTime = (item) => {
        setSelectedId(item.Key);
        let cloneOrder = { ...order };
        let val = parseInt(item.Key, 10);
        if (cloneOrder.ReciveTimeId != val) {
            cloneOrder.ReciveTimeId = val;
            dispatch({
                type: OrderActions.UPDATE_ORDER_VALUES,
                order: cloneOrder,
            });
        }
    };

    const changeNote = (e) => {
        let val = e.target.value;
        if (val.length > 200) {
            val = val.substring(0, 200);
        }
        setNote(val);
    };

    const updateNote = (e) => {
        let cloneOrder = { ...order };
        if (cloneOrder.Note != note) {
            cloneOrder.Note = note;
            dispatch({
                type: OrderActions.UPDATE_ORDER_VALUES,
                order: cloneOrder,
            });
        }
    };

    useEffect(() => {
        // if (times && times.length > 0 && order.RecieveAddressId > 0) {
        //     selectPaymentMethod(times[0]);
        // }
        setNote(order.Note);
    }, []);

    return (
        <div className="border-shadow px-3 py-3 time-section">
            <div className="time-title d-flex justify-content-between align-items-baseline">
                <div className="d-flex align-items-baseline">
                    <Image
                        src={`/images/icon/time-delivery.svg`}
                        style={{ width: 25 }}
                    />
                    <p className="mb-0 pl-2">
                        {Name_Time_Title}
                    </p>
                </div>
            </div>
            <hr className="cross-line"></hr>
            <div className="time-content">
                <div className="item-style pl-0 d-flex flex-column">
                    {times.map((item, index) => {
                        return (
                            <div className="d-flex" key={index}>
                                {selectedId == item.Key && (
                                    <Image
                                        src={`/images/icon/tick.svg`}
                                        style={{ width: 15, paddingBottom: 5 }}
                                    />
                                )}
                                <p
                                    className={`mb-0 pl-2 pointer ${
                                        selectedId == item.Key
                                            ? 'bolder'
                                            : 'ml-3 lighter'
                                    }`}
                                    onClick={() => selectTime(item)}>
                                    {item.Value}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <hr className="cross-line"></hr>
                <div className="item-style d-flex justify-content-between align-items-baseline note-wrap">
                    <Field
                        id="NoteId"
                        label="Ghi chú"
                        placeholder="Nhập ghi chú"
                        name="NoteId"
                        component={RenderInput}
                        type="text"
                        className="input-note"
                        input={{
                            // value: '',
                            onChange: changeNote,
                            onBlur: updateNote,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default reduxForm({ form: 'TimeComponentForm' })(TimeComponent);
