import React from 'react';

/**
* ****************************************************************************
* DUNGNT IconCash CODE
* icon-cash.js 
* 
* description		:	
* created at		:	2021-03-16 
* created by		:	DungNT 
* package			:	spo\shared\components\common\icon-cash.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
export default function IconCash(props) {
    return (
        <svg
            fontSize={props.fontSize}
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-cash"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                d="M15 4H1v8h14V4zM1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1z"
            />
            <path d="M13 4a2 2 0 0 0 2 2V4h-2zM3 4a2 2 0 0 1-2 2V4h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 12a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
        </svg>
    );
}
