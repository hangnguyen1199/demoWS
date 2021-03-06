import React from 'react';

/**
* ****************************************************************************
* DUNGNT IconBucket CODE
* icon-bucket.js 
* 
* description		:	
* created at		:	2021-03-15 
* created by		:	DungNT 
* package			:	spo\shared\components\common\icon-bucket.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
export default function IconBucket(props) {
    return (
        <div style={{ fontSize: props.fontSize ?? 20 }}>
            <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-bucket"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M8 1.5A4.5 4.5 0 0 0 3.5 6h-1a5.5 5.5 0 1 1 11 0h-1A4.5 4.5 0 0 0 8 1.5z"
                />
                <path
                    fillRule="evenodd"
                    d="M1.61 5.687A.5.5 0 0 1 2 5.5h12a.5.5 0 0 1 .488.608l-1.826 8.217a1.5 1.5 0 0 1-1.464 1.175H4.802a1.5 1.5 0 0 1-1.464-1.175L1.512 6.108a.5.5 0 0 1 .098-.42zm1.013.813l1.691 7.608a.5.5 0 0 0 .488.392h6.396a.5.5 0 0 0 .488-.392l1.69-7.608H2.624z"
                />
            </svg>
        </div>
    );
}
