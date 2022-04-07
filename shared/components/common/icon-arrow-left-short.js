import React from 'react';

/**
 * ****************************************************************************
 * DUNGNT IconArrowLeftShort CODE
 * icon-arrow-left-short.js
 *
 * description		:
 * created at		:	2020-08-16
 * created by		:	DungNT
 * package			:	spo\shared\components\common\icon-arrow-left-short.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function IconArrowLeftShort(props) {
    return (
        <div
            className="icon-arrow-left-short"
            style={{ fontSize: props.fontSize ?? 20 }}>
            <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-left-short"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M7.854 4.646a.5.5 0 0 1 0 .708L5.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
                />
                <path
                    fillRule="evenodd"
                    d="M4.5 8a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
                />
            </svg>
        </div>
    );
}
export default IconArrowLeftShort;
