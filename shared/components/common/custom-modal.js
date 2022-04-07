import React from 'react';
import IconX from './icon-x';

export default function CustomModal(props) {
    return (
        <div
            className={`custom-modal  _shadow1  ${props.open ? 'active' : ''} `}>
            <div className="overlay" onClick={() => props.hide()}></div>
            <div
                className={`wrap-content _shadow1 ${props.className ?? ''} ${props.card ? 'card' : ''}`}
                style={props.style}>
                <div className="modal-header d-between">
                    <span className=" font-weight-bold ">
                        {props.title ?? ''}
                    </span>
                    <div
                        className="d-center link-hover"
                        onClick={() => props.hide()}>
                        <IconX />
                    </div>
                </div>
                <div className=" modal-body">{props.children}</div>
                <div className="modal-footer">{props.footer ?? ''}</div>
            </div>
        </div>
    );
}
