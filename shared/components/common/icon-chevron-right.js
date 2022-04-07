import React from 'react';

/**
 * ****************************************************************************
 * DUNGNT IconChevronRight CODE
 * icon-chevron-right.js
 *
 * description		:
 * created at		:	2020-08-15
 * created by		:	DungNT
 * package			:	spo\shared\components\common\icon-chevron-right.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
export default function IconChevronRight(props) {
    const onClick = () =>{
        if(typeof props.onClick === 'function'){
            props.onClick();
        }
    }
    return (
        <div className={`d-center ${props.className}`} onClick={onClick}> 
            <svg
                style={{
                    fontSize: props.fontSize ?? 20,
                    color: props.color ?? '',
                }}
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-chevron-right"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
            </svg>
        </div>
    );
}
