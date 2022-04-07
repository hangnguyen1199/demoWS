import React, { useState, useEffect } from 'react';
import SelectBox from './select-box';
import InputSearch from './input-search';
import {xoa_dau} from '@spo/lib/helper'

let _ = require('lodash');


const SelectBrand = (props) => {
    const {brandMaster} = props;
    const list = brandMaster.map((e) => {
        return {
            label: e.brand_name,
            value: e.brand_id,
        };
    });
    const [filterList, setFilterList] = useState(list ?? []);
    const onChangeSearch = _.debounce((val) => {
        let search_string = val.toString() ?? '';
        let newlist = list.filter((x) =>
            xoa_dau(x.label ?? '').includes(xoa_dau(search_string)),
        );
        setFilterList(newlist);
    }, 500);
    // console.log('filterList: ', filterList);
    const onChange = (val) => {
        props.onChangeBrand(val);
    };
    return (
        <div>
            <SelectBox
                onChangeSearch={onChangeSearch}
                showSearch={true}
                className={props.className}
                dropdownClass={props.dropdownClass}
                value={props.value}
                onChange={(val) => onChange(val)}
                placeholder="Chọn nhãn hiệu"
                list={list}
                defaultValue={0}
                isShowSelectAll={false}
            />
        </div>
    );
};
export default React.memo(SelectBrand);
