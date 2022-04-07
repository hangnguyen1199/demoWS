import React from 'react';
import SelectBox from './select-box';
import { useSelector } from 'react-redux';

/**
* ****************************************************************************
* DUNGNT SelectItemType CODE
* select-item-type.js 
* 
* description		:	
* created at		:	2021-03-16 
* created by		:	DungNT 
* package			:	spo\shared\components\common\select-item-type.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
export default function SelectItemType(props) {
    const data = useSelector((state) => state.Common?.data?.listItemType) ?? [];

    const list = data.map((e) => {
        return {
            label: e.value,
            value: e.code,
        };
    });
    const onChangeSearch = (val) => {
        // if (typeof props.onChangeSearch == 'function') {
        //     props.onChangeSearch(val);
        // }
    };
    return (
        <SelectBox
            onChangeSearch={onChangeSearch}
            className={props.className}
            dropdownClass={props.dropdownClass}
            value={props.value}
            onChange={(val) => props.onChange(val)}
            placeholder="Chọn loại sản phẩm"
            list={list}
            defaultValue={0}
            isShowSelectAll={false}
        />
    );
}
