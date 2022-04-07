import React from 'react';
import IconTriangleFill from '../icon-triangle-fill'
import ComponentWarningPopupType from './component-warning-popup-type'

function LoginAnotherDevicePopup(props) {
    const {payload, showVisible} = props

    const Content = ()=>{
        return (
            <div>
                <h5 className="account-locked-main-content-title">Cảnh báo đăng nhập từ thiết bị lạ</h5>
                <p className="text-start account-locked-main-sub-title"> 
                    Có 1 thiết bị đã đăng nhập vào tài khoản của bạn. 
                    Như 1 biện pháp bảo mật, chúng tôi gởi thông tin về thiết bị 
                    đã đăng nhập vào tài khoản của bạn.
                </p>
                <div className="text-start login-device-infor">
                    <div className="login-device-infor-title">
                        <p>Thời gian</p>
                        <p>Vị trí</p>
                        <p>Địa chỉ IP</p>
                        <p>Thiết bị</p>
                    </div> 
                    <div className="login-device-infor-content">
                        <p>14.05.2021 11:24:06</p>
                        <p>Hà Nội, Việt Nam</p>
                        <p>14.191.57.159</p>
                        <p>Samsung SM-A125F</p>
                    </div>
                </div>
                <p className="text-start account-locked-text-large account-locked-text"> 
                    Nếu bạn không nhận ra hoạt động này, vui lòng khoá tài khoản &
                    liên hệ với Bộ phận  <span className="customer-care">Chăm Sóc Khách Hàng</span> 
                    của chúng tôi theo số điện thoại <span className="title-main-content-red"> 090.1800.888 </span >
                    (Bấm số 8) để được hỗ trợ
                </p>
            </div>
        )
    }

    return (
        <ComponentWarningPopupType 
            payload={payload}
            showVisible={showVisible}
            icon={<IconTriangleFill />}
            content={<Content/>}
            button1={{title:'Xác Nhận',type:'main'}}
            button2={{title:'Hủy',type:'light'}}
        />
    );
}

export default LoginAnotherDevicePopup;