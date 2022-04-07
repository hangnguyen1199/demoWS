import React from 'react';
import SelectBox from './select-box';
import { PropTypes } from 'prop-types';

/**
* ****************************************************************************
* DUNGNT SelectGender CODE
* select-gender.js 
* 
* description		:	
* created at		:	2021-03-16 
* created by		:	DungNT 
* package			:	spo\shared\components\common\select-gender.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
function SelectGender (props) {
    const { value, data } = props;
    const list = data && data.length > 0 ? data?.map((e) => {
        return {
            label: e.value,
            value: e.code,
        };
    }) : [];
    return (
        <SelectBox
            id={props.id}
            className={props.className}
            dropdownClass={props.dropdownClass}
            value={props.value}
            onChange={(val) => props.onChange(val)}
            placeholder={props.placeholder}
            list={list}
            defaultValue={0}
            isShowSelectAll={false}
        />
    );
}
SelectGender.propTypes = {
    data: PropTypes.array,
    className: PropTypes.string,
    dropdownClass: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string
};
SelectGender.defaultProps = {
    placeholder: 'Chọn giới tính',
    data: [],
    id: "",
    value: "A"
};
export default SelectGender;
