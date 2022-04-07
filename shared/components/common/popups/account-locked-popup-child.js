import React from 'react';
import IconAccountLock from '../icon-account-lock'
import ComponentWarningPopupType from './component-warning-popup-type'

function AccountLockedPopupChild(props) {
    const {payload, showVisible} = props
    const Content = ()=>{
        return (
            <div>
                <h5 className="account-locked-main-content-title">Khóa tài khoản</h5>
                <p className="account-locked-main-sub-title">Tài khoản của bạn đã bị tạm khóa.</p>
                <p className="account-locked-text">Vui lòng liên hệ với Bộ phận <span className="customer-care">Chăm Sóc Khách Hàng</span> của chúng tôi theo số điện thoại</p>
                <p><span className="title-main-content-red">090.1800.888 </span > (Bấm số 8) để được hỗ trợ</p>
            </div>
        )
    }
    return (
        <ComponentWarningPopupType 
            payload={payload}
            showVisible={showVisible}
            icon={<IconAccountLock />}
            content={<Content/>}
        />
    );
}

export default AccountLockedPopupChild;