const Children = dynamic(
    () => import('@spo/components/common/children'),
    { ssr: false },
);
import React, { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';

/**
 * ****************************************************************************
 * DUNGNT Screen CODE
 * screen.js
 *
 * description		:
 * created at		:	2021-03-10
 * created by		:	DungNT
 * package			:	spo\shared\components\common\screen.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function Screen(props) {
    const { children, open, className, scrollClass } = props;
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        let html_element = document.getElementsByTagName('html')[0];
        if (open) {
            html_element.classList.add(scrollClass);
        } else {
        }
        return () => {
            html_element.classList.remove(scrollClass);
        };
    }, [open]);
    return (
        <div className={`screen ${className ?? ''} ${open ? 'open' : ''}`}>
            {open ? <Children data={children} /> : null}
        </div>
    );
}
Screen.defaultProps = {
    open: false,
    scrollClass: 'modal-open',
};
export default Screen;
