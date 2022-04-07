import { PropTypes } from 'prop-types';
import React from 'react';
import SelectBox from './select-box';

function CustomDataSelect(props) {
    const {data} = props;
    
    const list = data.map((e) => {
        return {
            label: e.value,
            value: e.code,
        };
    });
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
CustomDataSelect.propTypes  = {
    data: PropTypes.array,
    className: PropTypes.string,
    dropdownClass: PropTypes.string,
    placeholder: PropTypes.string,
    id:PropTypes.string,
};
CustomDataSelect.defaultProps = {
    placeholder: 'Chọn giới tính',
    data:[],
    id:""
};
export default CustomDataSelect;
