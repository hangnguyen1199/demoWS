import React from 'react';
import CustomDatePicker from './../../common/custom-date-picker';

function RenderDatePicker(props) {
    const {
        maxDate,
        input,
        meta: { touched, error, submitFailed },
    } = props;
    const showError = submitFailed && touched && error;
    return (
        <div className="render-date-picker position-relative">
            <div className="position-relative">
                <CustomDatePicker
                    className="form-control floating max_width_date_picker"
                    {...input}
                    maxDate={maxDate}
                />
            </div>
            <div className={`error-float ${showError ? '' : 'd-none'} `}>
                <div className="wrap _shadow1">
                    <span className="text-error">{error}</span>
                </div>
            </div>
        </div>
    );
}
RenderDatePicker.propTypes = {
};
RenderDatePicker.defaultProps = {
    maxDate: null,
};
export default RenderDatePicker;
