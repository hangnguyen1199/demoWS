import React from 'react';
/**
 * ****************************************************************************
 * DUNGNT WrapDialog CODE
 * wrap-dialog.js
 *
 * description		:
 * created at		:	2020-08-03
 * created by		:	DungNT
 * package			:	spo\shared\components\common\wrap-dialog.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function WrapDialog(props) {
    return (
        <div className={`wrap-dialog ${props.className}`}>{props.children}</div>
    );
}
export default WrapDialog;
