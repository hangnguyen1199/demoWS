import { PropTypes } from 'prop-types';
import React from 'react';
import IconX from './icon-x';

/**
 * ****************************************************************************
 * DUNGNT Chip CODE
 * chip.js
 *
 * description		:
 * created at		:	2020-08-24
 * created by		:	DungNT
 * package			:	spo\shared\components\common\chip.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function Chip(props) {
    const onClose = () =>{
        if(typeof props.onClose == "function"){
            props.onClose()
        }
    }
    return (
        <div className="wrap_chip">
            <div className={`chip ${props.className ?? ''}`}>{props.name}</div>
            <span className="close" onClick={onClose}>
                <IconX fontSize={10} />
            </span>
        </div>
    );
}
Chip.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
};
Chip.defaultProps = {};
export default Chip;
