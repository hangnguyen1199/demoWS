import { PropTypes } from 'prop-types';
import React, { useRef , useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import AppConfig from './../../../config/AppConfig';


/**
 * ****************************************************************************
 * DUNGNT RenderCaptcha CODE
 * render-input.js
 *
 * description		:
 * created at		:	2020-10-14
 * created by		:	DungNT
 * package			:	spo\shared\components\redux-form\common\render-input.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function RenderCaptcha(props) {
    const {
        label = 'Label',
        input,
        meta: { touched, error, submitFailed, pristine },
    } = props;
    const onChangeCatpcha = (e) => {
        input.onChange(e);
    };
    const ref = useRef(false);
    useEffect(() => {
        if(!input.value){
            ref.current.reset()
        }
    }, [input.value]);
    return (
        <ReCAPTCHA
            ref={ref}
            sitekey={AppConfig.CAPTCHA_SITE_KEY}
            onChange={onChangeCatpcha}
        />
    );
}
RenderCaptcha.propTypes = {
    autoComplete: PropTypes.bool,
    input       : PropTypes.object,
    placeholder : PropTypes.string,
    type        : PropTypes.string,
    meta        : PropTypes.object,
    maxLength   : PropTypes.number,
    readonly    : PropTypes.bool,
};
RenderCaptcha.defaultProps = {
    autoComplete: true,
    placeholder : 'Nhập ...',
    type        : 'text',
    maxLength   : -1,
    readonly    : false,
};
export default RenderCaptcha;
