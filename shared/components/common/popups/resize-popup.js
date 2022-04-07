// import IconSuccess from '@spo/icons/icon-success';
import constants from '@spo/config/constants';
import React, { useEffect, useRef, useState } from 'react';
import ClosePopupBtn from './close-popup-btn';

function ResizePopup(props) {
    const { payload, showVisible } = props;
    const refParent = useRef(false);
    const headerRef = useRef(false);
    const bodyRef = useRef(false);
    const footerRef = useRef(false);
    const [maxBodyHeight, setMaxBodyHeight] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            let marginTop = 56;
            if (window.innerWidth < constants.WINDOW_SIZE.MEDIUM) {
                marginTop = 0;
            }
            let maxHeight =
                window.innerHeight -
                (headerRef.current.clientHeight +
                    footerRef.current.clientHeight +
                    marginTop);
            setMaxBodyHeight(maxHeight);
        }, 0);
       
    }, []);
    return (
        <div className={`resize-popup ${props?.className}`} ref={refParent}>
            <div className="popup-header " ref={headerRef}>
                <div className="_content d-center">
                    {typeof props?.header == 'function' ? (
                        props?.header()
                    ) : (
                        <span
                            className="text-weight-bold"
                            style={{ fontSize: '20px' }}>
                            {payload?.title ?? ''}
                        </span>
                    )}
                    <div className="d-center float_btn">
                        <ClosePopupBtn onClick={() => showVisible(false)} />
                    </div>
                </div>
            </div>
            <div
                className="popup-body"
                ref={bodyRef}
                style={{ maxHeight: maxBodyHeight }}>
                {props?.body()}
            </div>
            <div className="popup-footer" ref={footerRef}>
                {props?.footer && props?.footer()}
            </div>
        </div>
    );
}

export default ResizePopup;
