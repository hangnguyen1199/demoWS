import React from 'react';
import constants from '@spo/config/constants';
import LineX from '../common/line-x';

/**
 * ****************************************************************************
 * HaiDT ColorItem CODE
 * color-item.js
 *
 * description		:
 * created at		:	2021-11-30
 * created by		:	HaiDT
 * package			:	spo\shared\components\item\color-item.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
function ColorItem(props) {
    const { active, name } = props;
    const onChangeColor = () => props.onChange();
    return (
        <div className="pr-2 py-1 color-box-grid-item">
            <div className={`d-center color-item pointer ${active ? 'active': ''}` } style={{width: 100, fontSize: 16, color: "#333333", fontWeight: 400}} onClick={onChangeColor}>
                {name}
            </div>
        </div>
    );
}
ColorItem.defaultProps = {
    name: '',
    active: false,
    disabled: false,
};
export default ColorItem;
