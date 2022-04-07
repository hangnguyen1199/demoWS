import React, { useState, useEffect } from 'react';
import MultiSelectBox from './multi-select-box';
import { PropTypes } from 'prop-types';

function MultiSelectSize(props) {
    const { data, selected, placeholder, error } = props;
    const [values, setValues] = useState([]);
    useEffect(() => {
        setValues(selected ?? []);
    }, [selected]);
    
    const onChangeSelect = (val) => {
        // setValues(val)
        props.onChange(val);
    };
    return (
        <div className="multi-select-size">
            <MultiSelectBox
                className={props.className ?? ''}
                placeholder={placeholder}
                data={data}
                selected={values}
                onChangeSelect={onChangeSelect}
                field={['size_name', 'size_id']}
                error={error}
            />
        </div>
    );
}
MultiSelectSize.propTypes = {
    placehoder: PropTypes.string,
    onChangeSelect: PropTypes.func,
    selected: PropTypes.array,
    data: PropTypes.array,
};
MultiSelectSize.defaultProps = {
    placehoder: '',
    selected: [],
    data: [
        { code: 1, value: 'S' },
        { code: 2, value: 'M' },
        { code: 3, value: 'L' },
        { code: 4, value: 'SM' },
    ],
};
export default MultiSelectSize;
