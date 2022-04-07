import { format } from 'date-fns';
import parse from 'date-fns/parse';
import React, { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import IconDate from '../common/icon-date';
/**
 * ****************************************************************************
 * DUNGNT CustomDatePicker CODE
 * custom-date-picker.js
 *
 * description		:
 * created at		:	2020-12-15
 * created by		:	DungNT
 * package			:	spo\shared\components\common\custom-date-picker.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function CustomDatePicker(props) {
    const { maxDate } = props;
    const onChangeDate = (val) => {
        props.onChange(format(val, 'dd/MM/yyyy'));
    };
    const dateRef = useRef(null);
    return (
        <div className="custom_date_picker pointer">
            <DatePicker
                dateFormat="dd/MM/yyyy"
                ref={dateRef}
                className={props.className ?? 'form-control floating'}
                selected={Date.parse(
                    parse(props.value, 'dd/MM/yyyy', new Date()),
                )}
                onChange={onChangeDate}
                maxDate={maxDate}
                showDisabledMonthNavigation
            />
            <div
                className="icon link-hover"
                onClick={() => dateRef.current.setOpen(true)}>
                <IconDate />
            </div>
        </div>
    );
}
CustomDatePicker.propTypes = {};
CustomDatePicker.defaultProps = {
    maxDate :null
};
export default CustomDatePicker;
