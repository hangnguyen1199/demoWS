import React from 'react';
import IconFrown from '../icon-frown'
import ComponentWarningPopupType from './component-warning-popup-type'

function CancelAccountPopup(props) {
    const {payload, showVisible} = props
    const Content = ()=>{
        return (
            <div>
                <h5 className="account-locked-main-content-title">Hủy tài khoản</h5>
                <p className="account-locked-main-sub-title"> Khi huỷ tài khoản, toàn bộ ưu đãi của Quý khách sẽ bị mất </p>
            </div>
        )
    }
    return (
        <ComponentWarningPopupType 
            payload={payload}
            showVisible={showVisible}
            icon={<IconFrown />}
            content={<Content/>}
            button1={{title:'Xác Nhận',type:'main'}}
            button2={{title:'Hủy',type:'light'}}
        />
    );
}

export default CancelAccountPopup;