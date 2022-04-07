// import IconSuccess from '@spo/icons/icon-success';
import React from 'react';
import ButtonPopup from '../button-popup';
import IconSuccess from './../icons/icon-success';

function SuccessPopup(props) {
    const { payload, showVisible } = props;
    const handleClick = () => {
        if (typeof payload.callback == 'function') {
            payload.callback();
        }
        showVisible(false);
    };
    return (
        <div className="save-success-popup">
            <div className="icon" style={{ paddingTop: 10 }}>
                <IconSuccess />
            </div>
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 20,
                    fontSize: 14,
                    fontWeight: 'normal',
                }}>
                {payload?.title}
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                <div style={{ width: 140 }}>
                    <ButtonPopup
                        type="main"
                        onClick={handleClick}
                        title={payload?.buttonTitle ?? 'Đóng'}
                    />
                </div>
            </div>
        </div>
    );
}
SuccessPopup.defaultProps = {
    payload: {
        title: 'Đã lưu thành công',
    },
};
export default SuccessPopup;
