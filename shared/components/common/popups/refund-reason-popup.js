// import IconSuccess from '@spo/icons/icon-success';
import React, { useEffect, useState } from 'react';
import ButtonMain from '../button-main';
import ButtonRipple from '../button-ripple';
import ResizePopup from './resize-popup';

function RefundReasonPopup (props) {
    const { payload, showVisible } = props;
    const [choice, setChoice] = useState(null);
    useEffect(() => {
        setChoice(payload?.active)
    }, [payload?.active])
    
    const handleChoice = (item) => {
        setChoice(item);
    };
    const handleClick = () => {
        if (typeof payload.callback == 'function') {
            payload.callback(choice);
        }
        showVisible(false);
    };

    const renderBody = () => {
        return (
            <div>
                <ul className="cancel-reason">
                    {payload?.List?.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleChoice(item)}
                            className={`cancel-reason--item ${choice?.Id == item?.Id && 'active'
                            }`}>
                            {item?.Name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    const renderFooter = () => {
        return (
            <div className="col-12 d-center px-0">
                <ButtonMain
                    className="__btn_main btn-returned"
                    title={"Xác nhận"}
                    onClick={handleClick}
                    fontSize={14}
                />
            </div>
        );
    };
    return (
        <ResizePopup
            // className="refund_reason_popup"
            payload={payload}
            showVisible={showVisible}
            body={renderBody}
            footer={renderFooter}
        />
    );
}
RefundReasonPopup.defaultProps = {
    payload: {
        title: 'Đã lưu thành công',
    },
};
export default RefundReasonPopup;
