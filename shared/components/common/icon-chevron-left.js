import React from 'react';

/**
 * ****************************************************************************
 * DUNGNT IconChevronLeft CODE
 * icon-chevron-left.js
 *
 * description		:
 * created at		:	2020-08-15
 * created by		:	DungNT
 * package			:	spo\shared\components\common\icon-chevron-left.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

export default function IconChevronLeft(props) {
    const onClick = () =>{
        if(typeof props.onClick === 'function'){
            props.onClick();
        }
    }
    return (
        <div className={`d-center ${props.className}`} onClick={onClick} >
            <svg
                style={{
                    fontSize: props.fontSize ?? 20,
                    color: props.color ?? '',
                }}
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-chevron-left"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
            </svg>
        </div>
    );
}
