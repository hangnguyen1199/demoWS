import React from 'react';

/**
 * ****************************************************************************
 * DUNGNT IconUser CODE
 * icon-user.js
 *
 * description		:
 * created at		:	2020-08-01
 * created by		:	DungNT
 * package			:	spo\shared\components\common\icon-user.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function IconUser(props) {
    return (
        <div className="icon-user1">
            <svg
                style={{ fontSize: props.fontSize ?? 20 }}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 18.5 21.5">
                <g id="Tài_khoản" transform="translate(0.75 0.75)">
                    <ellipse
                        id="Ellipse_1750"
                        cx="5.438"
                        cy="5.601"
                        rx="5.438"
                        ry="5.601"
                        transform="translate(3.262)"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    />
                    <path
                        id="Path_18039"
                        d="M39.7,120.645v-.688a8.035,8.035,0,0,1,7.957-8.11h1.085a8.035,8.035,0,0,1,7.957,8.11v.688"
                        transform="translate(-39.702 -100.645)"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    />
                </g>
            </svg>
        </div>
    );
}
export default IconUser;
