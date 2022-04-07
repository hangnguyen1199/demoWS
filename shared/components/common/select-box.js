import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SimpleSelect from './simple-select';

/**
 * ****************************************************************************
 * DUNGNT SelectBox CODE
 * select-box.js
 *
 * description		:
 * created at		:	2020-08-21
 * created by		:	DungNT
 * package			:	spo\shared\components\common\select-box.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

const SelectBox = (props) => {
    const { list, field, id, error, showEmpty, image, showArrow } = props;
    const [data, setData] = useState([]);
    const [val, setVal] = useState([]);
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        setData(list);
    }, [list]);

    useEffect(() => {
        setVal(props.value);
    }, [props.value]);
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onChange = (val) => {
        // setVal(val);
        props.onChange(val)
    };
    return (
        <div>
            <SimpleSelect
                id={id}
                showSearch={props.showSearch}
                className={`${props.className ?? ''}`}
                dropdownClass={props.dropdownClass}
                readonly={props.readonly}
                onChangeSelect={onChange}
                data={data}
                value={val}
                placeholder={props.placeholder}
                field={field}
                error={error}
                showEmpty={showEmpty}
                image={image}
                showArrow={showArrow}
                checkValueItem={props.checkValueItem}
            />
        </div>
    );
};

SelectBox.propTypes = {
    list: PropTypes.array,
    showSearch: PropTypes.bool,
    className: PropTypes.string,
    dropdownClass: PropTypes.string,
    readonly: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
};
SelectBox.defaultProps = {
    list: [],
    showSearch: false,
    className: '',
    dropdownClass: '',
    readonly: false,
    value: 0,
    placeholder: 'Chọn ...',
    showEmpty: false,
};
export default SelectBox;
