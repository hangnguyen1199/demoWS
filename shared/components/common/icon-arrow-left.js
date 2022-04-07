import React from 'react';

/**
 * ****************************************************************************
 * DUNGNT IconArrowLef CODE
 * icon-arrow-left.js
 *
 * description		:
 * created at		:	2020-12-21
 * created by		:	chinhvn
 * package			:	spo\shared\components\common\icon-arrow-left.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function IconArrowLeft (props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
                fontSize: props.fontSize ?? 20,
                color: props?.color ?? '#707070',
            }}
            width="1em"
            height="1em"
            viewBox="0 0 6.67 11.541">
            <g
                id="Group_4387"
                data-name="Group 4387"
                transform="translate(-34.404 1.06)">
                <line
                    id="Line_506"
                    data-name="Line 506"
                    x2="4.5"
                    y2="4.86"
                    transform="translate(35.464)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                // stroke-width="1.5"
                />
                <path
                    id="Path_18146"
                    data-name="Path 18146"
                    d="M4.549-.026,0,4.561"
                    transform="translate(35.465 4.86)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                // stroke-width="1.5"
                />
            </g>
        </svg>
    );
}
export default IconArrowLeft;
