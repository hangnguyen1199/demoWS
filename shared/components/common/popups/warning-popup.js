// import IconWarning from '@spo/icons/icon-warning';
import React from 'react';
import ButtonPopup from '../button-popup';

function WarningPopup(props) {
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
                {/* <IconWarning /> */}
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
                        title={payload?.buttonTitle ?? 'Đóng'}
                        onClick={handleClick}
                    />
                </div>
            </div>
        </div>
    );
}
WarningPopup.defaultProps = {
    payload: {
        title: 'Đã lưu thành công',
    },
};
export default WarningPopup;
