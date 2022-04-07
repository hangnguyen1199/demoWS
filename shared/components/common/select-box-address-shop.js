import React from 'react'
import SelectBox from './select-box';

export default function SelectBoxAddressShop(props) {
    
    return (
        <SelectBox
            readonly={props.readonly}
            value={props.value}
            onChange={(val) => props.onChange(val)}
            placeholder="Chọn chi nhánh"
            list={props.list}
            isShowSelectAll={false}
        />
    );
}
