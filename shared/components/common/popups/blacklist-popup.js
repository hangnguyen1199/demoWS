import React from 'react';
import IconBlacklist from '../icon-blacklist'
import ComponentWarningPopupType from './component-warning-popup-type'

function BlacklistPopup(props) {
    const {payload, showVisible} = props
    const Content = ()=>{
        return (
            <div>
                <h5 className="account-locked-main-content-title">Tài khoản Blacklist</h5>
                <p className="account-locked-main-sub-title">Tài khoản của bạn đã bị đưa vào<span className="customer-care"> Blacklist.</span></p>
                <p className="account-locked-text">Vui lòng liên hệ với Bộ phận <span className="customer-care">Chăm Sóc Khách Hàng</span> của chúng tôi theo số điện thoại</p>
                <p><span className="title-main-content-red">090.1800.888 </span > (Bấm số 8) để được hỗ trợ</p>
            </div>
        )
    }
    return (
        <ComponentWarningPopupType 
            payload={payload}
            showVisible={showVisible}
            icon={<IconBlacklist />}
            content={<Content/>}
        />
    );
}

export default BlacklistPopup;