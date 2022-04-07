const ButtonDark = dynamic(() => import('./button-dark'), { ssr: false });
import AppActions from '@spo/redux/app/action';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
// import ButtonDark from './button-dark';
import dynamic from 'next/dynamic';

/**
 * ****************************************************************************
 * DUNGNT Alert CODE
 * alert.js
 *
 * description		:
 * created at		:	2021-03-15
 * created by		:	DungNT
 * package			:	\spo\shared\components\common\alert.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function Alert(props) {
    const dispatch = useDispatch();
    const _state = props.data.alert;
    const _action = _state?.action;
    const onCancel = () => {
        dispatch(AppActions.closeAlert());
    };
    const renderIcon = () => {
        switch (_state?.icon) {
            case 'success':
                return <i className="far fa-check-circle fa-3x"></i>;
            case 'failed':
                return <i className="far fa-times-circle fa-3x"></i>;
            case 'success':
                return <i className="fas fa-exclamation-circle fa-3x"></i>;
            case 'confirm':
                return <i className="far fa-question-circle fa-3x"></i>;
            default:
                return '';
        }
    };
    const duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    };
    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };
    return (
        props.alert && (
            <div className={'_wrap_alert'}>
                <CSSTransition
                    in={props.alert}
                    timeout={300}
                    classNames="alert"
                    unmountOnExit>
                    <div className="card _alert _shadow1">
                        <div className="icon">{renderIcon()}</div>
                        {/* {_state.icon && <div className="icon">{renderIcon}</div>} */}
                        <div className="title">{_state?.title ?? ''}</div>
                        {_state?.content && (
                            <div className="content">
                                {_state?.content ?? ''}
                            </div>
                        )}

                        <div className="action">
                            <div className="d-flex justify-content-center align-items-center">
                                {_action?.cancel && (
                                    <ButtonDark
                                        title={_action?.cancel}
                                        onClick={onCancel}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        )
    );
}
Alert.propTypes = {
    alert: PropTypes.bool,
    data: PropTypes.object,
};
Alert.defaultProps = {
    alert: false,
    data: {},
};
export default React.memo(Alert);
