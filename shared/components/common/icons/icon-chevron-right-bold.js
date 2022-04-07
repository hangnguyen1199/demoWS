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
export default function IconChevronRightBold (props) {
    const onClick = () => {
        if (typeof props.onClick === 'function') {
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
                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 7 12">
                <g  >
                    <path id="Path_347" d="M20.86,16l-4.621,4.543a.806.806,0,0,0,.087,1.286.927.927,0,0,0,1.177-.086L22.691,16.6a.805.805,0,0,0,0-1.2L17.5,10.258a.927.927,0,0,0-1.177-.086.806.806,0,0,0-.087,1.286Z" transform="translate(-15.959 -10.001)" fill="currentColor" />
                </g>
            </svg>
        </div>
    );
}
