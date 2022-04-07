import constants from '@spo/config/constants';
import React, { useRef } from 'react';

/**
* ****************************************************************************
* DUNGNT ButtonLight CODE
* button-light.js 
* 
* description		:	
* created at		:	2020-06-15 
* created by		:	DungNT 
* package			:	spo\shared\components\common\button-light.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
export default function ButtonLight (props) {
    const btnRef = useRef(null)
    const { tabIndex, className, fontSize, title, disabled, height, type, borderRadius, backgroundColor, borderWidth } = props;
    const onClick = () => {
        btnRef.current.click()
    };
    const onButtonClick = (e) => {
        e.preventDefault()
        if (typeof props.onClick === 'function') {props.onClick();}
    }
    return (
        <button
            disabled={props.disabled}
            tabIndex={tabIndex}
            type={type ?? "button"}
            onClick={onButtonClick}
            className={`common_btn_light button-focus pointer custom_btn py-1 h-100 ${props.className ?? ''
            }  ${disabled ? 'disabled' : ''
            }`}
            style={{
                borderRadius: borderRadius ?? 0,
                backgroundColor: backgroundColor ?? constants.COLOR.WHITE,
                // height: props.height ?? 30,
                // paddingLeft: 14,
                // paddingRight: 14,
                color: constants.COLOR.BLACK,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                border: '1px solid gray',
                borderWidth: borderWidth ?? 0,
            }}>
            <span>{title}</span>
        </button>
    );
}
