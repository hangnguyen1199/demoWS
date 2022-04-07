import React from 'react';

/**
* ****************************************************************************
* DUNGNT IconCheckCircle CODE
* icon-check-circle.js 
* 
* description		:	
* created at		:	2021-03-16 
* created by		:	DungNT 
* package			:	spo\shared\components\common\icon-check-circle.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
export default function IconCheckCircle(props) {
    return (
        <div className="d-center" style={{fontSize: props.fontSize ?? 20, color: props.color ?? '#5555555' }}>
            <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-check-circle"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                    fillRule="evenodd"
                    d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                />
            </svg>
        </div>
    );
}
