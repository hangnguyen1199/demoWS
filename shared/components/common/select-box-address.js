import React from 'react';
import SelectBox from './select-box';
import PropTypes from 'prop-types';

/**
 * ****************************************************************************
 * DUNGNT SelectBoxAddress CODE
 * select-box-address.js
 *
 * description		:
 * created at		:	2020-08-19
 * created by		:	DungNT
 * package			:	spo\shared\components\common\select-box-address.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function SelectBoxAddress(props) {
    const { address } = props;
    const list = address.map((e) => {
        return {
            label: `${e.user_address_type_name  }: ${  e.full_address}`,
            value: e.user_address_id,
        };
    });
    list.push({ value: 'ADD', label: 'Thêm địa chỉ' });
    return (
        <SelectBox
            value={props.value}
            onChange={(val) => props.onChange(val)}
            placeholder="Chọn địa chỉ nhận hàng"
            list={list}
            defaultValue={0}
            isShowSelectAll={false}
        />
    );
}
SelectBoxAddress.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    address: PropTypes.array,
};
SelectBoxAddress.defaultProps = {
    value: 0,
    address: [],
};
export default SelectBoxAddress;
