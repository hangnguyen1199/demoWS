import React from 'react';
import PropTypes from 'prop-types';
import IconX from '@spo/components/common/icon-x';

ModalComponent.propTypes = {};

function ModalComponent(props) {
    return (
        <div
            className={`custom-modal  _shadow1 ${props.open ? 'active' : ''} `}>
            <div className="overlay" onClick={() => props.hide()}></div>
            <div
                className={`wrap-content _shadow1 ${props.className ?? ''} ${
                    props.card ? 'card' : ''
                }`}
                style={props.style}>
                <div className="modal-header d-between">
                    <span className="text-weight-bold"></span>
                    <span
                        className="text-weight-bold"
                        style={{ fontSize: '20px' }}>
                        {props.title ?? ''}
                    </span>
                    <div
                        className="d-center link-hover"
                        onClick={() => props.hide()}>
                        <IconX />
                    </div>
                </div>
                <div className=" modal-body">
                    <hr
                        className="cross-line"
                        style={{ marginBottom: '20px' }}
                    />
                    {props.children}
                </div>
                {props.footer && (
                    <div className="modal-footer">{props.footer}</div>
                )}
            </div>
        </div>
    );
}

export default ModalComponent;
