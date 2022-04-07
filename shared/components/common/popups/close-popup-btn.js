import React from 'react';
import { IconX } from '@spo/components/common/icon-x';

function ClosePopupBtn(props) {
    const onClose = ()=>{
        props.onClick()
    }
    return (
        <div className="close-popup-btn" onClick={onClose}>
            <IconX />
        </div>
    );
}
export default ClosePopupBtn;
