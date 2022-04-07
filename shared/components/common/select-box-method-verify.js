import React from 'react';
import SelectBox from './select-box';
import PropTypes from 'prop-types';

export default function SelectBoxMethodVerify(props) {
    const list = props.data?.listMethodVerify.map((e) => {
        return { label: e.value, value: e.code };
    }); 
    return (
        <SelectBox
            value={props.value}
            onChange={(val) => props.onChange(val)}
            placeholder="Chọn phương thức xác thực"
            list={list}
            defaultValue={0}
            isShowSelectAll={false}
        />
    );
};
SelectBoxMethodVerify.propTypes = {
    list: PropTypes.array,
    defaultValue: PropTypes.number,
    isShowSelectAll: PropTypes.bool,
    data: PropTypes.object,
    onChange: PropTypes.func
};
SelectBoxMethodVerify.defaultProps = {
    list: [],
    defaultValue: 0,
    isShowSelectAll: false
};
