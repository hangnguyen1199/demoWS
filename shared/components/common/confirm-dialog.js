import ButtonLight from '@spo/components/common/button-light';
import ButtonPrimary from '@spo/components/common/button-primary';
import SimpleModal from '@spo/components/common/simple-modal';
import constants from '@spo/config/constants';
import React from 'react';

/**
* ****************************************************************************
* DUNGNT ConfirmDialog CODE
* confirm-dialog.js 
* 
* description		:	
* created at		:	2021-03-15 
* created by		:	DungNT 
* package			:	spo\shared\components\common\confirm-dialog.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
function ConfirmDialog(props) {
    const { title, open, text, mode } = props;
    const onCancel = () => {
        props.onCancel();
    };
    const onConfirm = () => {
        props.onConfirm();
    };
    return (
        <div className="confirm-dialog">
            <SimpleModal open={open} title={false} onClose={onCancel}>
                <div className="dialog-title">{title}</div>
                <div className="dialog-sub-title">{text}</div>

                <div className="dialog-action d-center mt-5">
                    <ButtonLight
                        className={`border-darked border ${
                            mode == constants.CONFIRM_SERVICE.ONLY_BUTTON_OK
                                ? 'd-none'
                                : ''
                        }`}
                        title="Hủy"
                        onClick={onCancel}
                    />
                    <div className="px-2"></div>
                    <ButtonPrimary title="Xác nhận" onClick={onConfirm} />
                </div>
            </SimpleModal>
        </div>
    );
}
export default ConfirmDialog;
