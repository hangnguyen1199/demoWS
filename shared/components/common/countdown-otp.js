import React from 'react';

function CountdownOtp(props) {
    const { time, loadingResend, onResend } = props;
    return (
        <div className="countdown-otp">
            <div className="_sub-title3">Không nhận được OTP</div>
            <div className="_sub-title4">
                <span
                    className={`pointer ${time > 0 || loadingResend ? 'link-disabled' : ''}`}
                    onClick={onResend}>
                    Gửi lại
                </span>{' '}
                ({new Date(time * 1000).toISOString().substr(14, 5)})
            </div>
        </div>
    );
}
export default CountdownOtp;
