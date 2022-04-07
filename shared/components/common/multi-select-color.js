import React, { useState, useEffect } from 'react';
import MultiSelectBox from './multi-select-box';
import { PropTypes } from 'prop-types';

function MultiSelectColor(props) {
    const { data, selected ,placeholder} = props;
    const [values, setValues] = useState([]);
    useEffect(() => {
        setValues(selected ?? []);
    }, [selected]);
    const onChangeSelect = (val) => {
        // setValues(val)
        props.onChange(val)
    };
    return (
        <div className="multi-select-size">
            <MultiSelectBox
                className={props.className ?? ""}
                placeholder={placeholder}
                data={data}
                selected={values}
                onChangeSelect={onChangeSelect}
                field={["color_name","color_id"]}
            />
        </div>
    );
}
MultiSelectColor.propTypes = {
    placehoder: PropTypes.string,
    onChangeSelect: PropTypes.func,
    selected: PropTypes.array,
    data: PropTypes.array,
};
MultiSelectColor.defaultProps = {
    placehoder: '',
    selected: [],
    data: [
        { code: 1, value: 'S' },
        { code: 2, value: 'M' },
        { code: 3, value: 'L' },
        { code: 4, value: 'SM' },
    ],
};
export default MultiSelectColor;
