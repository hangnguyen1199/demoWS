const Children = dynamic(() => import('@spo/components/common/children'), {
    ssr: false,
});
import React, { useEffect } from 'react';
import IconX from './icon-x';
import dynamic from 'next/dynamic';

/**
 * ****************************************************************************
 * DUNGNT SimpleModal CODE
 * simple-modal.js
 *
 * description		:
 * created at		:	2020-09-22
 * created by		:	DungNT
 * package			:	spo\shared\components\common\simple-modal.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function SimpleModal(props) {
    const { open, children, title, header, className, footer } = props;
    const onClose = () => {
        props.onClose();
    };

    useEffect(() => {
        let html_element = document.getElementsByTagName('html')[0];
        // console.log("html_element",html_element);
        if (open) {
            html_element.classList.add('modal-open');
        } else {
        }
        return () => {
            html_element.classList.remove('modal-open');
        };
    }, [open]);
    return (
        <div
            className={`simple-modal _modal ${className ?? ''} ${
                open ? 'active' : ''
            }`}>
            <div className="overlay" onClick={onClose}></div>
            <div className="wrap_modal">
                {typeof props.header == 'function' ? (
                    props.header()
                ) : (
                    <div className="header">
                        <div>{title}</div>
                        <span className="close" onClick={onClose}>
                            <IconX />
                        </span>
                    </div>
                )}
                <div className="body d-start w-100">
                    {open ? <Children data={children} /> : null}
                </div>
                {footer && (
                    <div className="d-center w-100 py-3 position-sticky">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
SimpleModal.defaultProps = {
    footer: null,
};
export default SimpleModal;
