import IconWarning from '@spo/icons/icon-warning';
import React from 'react';
import ButtonMain from '../button-main';
import ButtonPopup from '../button-popup';

function ConfirmPopup(props) {
    const { payload, showVisible } = props;
    const handleOK = () => {
        if (typeof payload.callback === 'function') {
            payload.callback(true);
        }
        showVisible(false);
    };
    const handleClose = () => {
        if (typeof payload.callback === 'function') {
            payload.callback(false);
            showVisible(false);
        }
    };
    return (
        <div className="save-success-popup">
            <div className="icon" style={{ paddingTop: 10 }}>
                <IconWarning />
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
                <div
                    style={{
                        // width: 145,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <ButtonPopup
                        type="light"
                        style={{ marginLeft: 10 }}
                        onClick={handleClose}
                        title="Đóng"
                    />
                    <ButtonMain
                        type="main"
                        className="btn-accept"
                        onClick={handleOK}
                        title="Đồng ý"
                    />
                </div>
            </div>
        </div>
    );
}
ConfirmPopup.defaultProps = {
    payload: {
        title: 'Đã lưu thành công',
    },
};
export default ConfirmPopup;
