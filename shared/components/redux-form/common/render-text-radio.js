import React, { useEffect } from 'react';
/**
 * ****************************************************************************
 * DUNGNT RenderTextRadio CODE
 * render-input.js
 *
 * description		:
 * created at		:	2020-07-19
 * created by		:	DungNT
 * package			:	spo\shared\components\redux-form\render-input.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function RenderTextRadio(props) {
    const {
        placeholder,
        input,
        label,
        type,
        icon,
        meta: { touched, error },
        readonly = false,
        master = [],
        defaultValue,
    } = props;
    const onChange = (e) => {
        input.onChange(e?.Id);
    };
    useEffect(() => {
        input.onChange(defaultValue)
    }, [defaultValue])
    return (
        <div className="d-center wrap_select_address_type render-text-radio">
            {master.map((e, i) => {
                return (
                    <div
                        key={i}
                        className={`_custon_text_radio pointer ${
                            input.value == e?.Id ? 'active' : ''
                        }`}
                        onClick={() => onChange(e)}>
                        {e?.Name}
                    </div>
                );
            })}
        </div>
    );
}
RenderTextRadio.defaultProps = {
    placeholder: 'Nhập',
};
export default RenderTextRadio;
