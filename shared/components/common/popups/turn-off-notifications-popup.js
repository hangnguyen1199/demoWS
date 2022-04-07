import React from 'react';
import IconBellSlash from '../icon-bell-slash'
import ComponentWarningPopupType from './component-warning-popup-type'

function TurnOffNotificationsPopup(props) {
    const {payload, showVisible} = props

    const Content = ()=>{
        return (
            <div>
                <h5 className="account-locked-main-content-title">Tắt thông báo</h5>
                <p className="text-start account-locked-text-large account-locked-text"> 
                    Bạn đã tắt tính năng thông báo thì đồng nghĩa 
                    với việc bạn sẽ không nhận được bất kỳ ưu đãi nào 
                    của FM Plus.
                    <span className="title-main-content-red"> FM Push </span >
                </p>
            </div>
        )
    }

    return (
        <ComponentWarningPopupType 
            payload={payload}
            showVisible={showVisible}
            icon={<IconBellSlash />}
            content={<Content/>}
            button2={{title:'Đóng',type:'main'}}
        />
    );
}

export default TurnOffNotificationsPopup;