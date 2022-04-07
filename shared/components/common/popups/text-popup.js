// import IconSuccess from '@spo/icons/icon-success';
import React from 'react';
import ButtonPopup from '../button-popup';

function TextPopup(props) {
    const { payload, showVisible, config } = props;
    const handleClick = () => {
        if (typeof payload.callback == 'function') {
            payload.callback();
        }
        showVisible(false);
    };
    return (
        <div className="text-popup">
            {config?.showTopTitle && (
                <div className="main-title">{config.topTitle}</div>
            )}
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
                    marginTop: 30,
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
TextPopup.defaultProps = {
    config: {
        topTitle: 'Thông báo',
        showTopTitle: true,
    },
};
export default TextPopup;
