import React from 'react';
import SelectBox from './select-box';
import PropTypes from 'prop-types';

/**
 * ****************************************************************************
 * DUNGNT SelectBoxWard CODE
 * select-box-ward.js
 *
 * description		:
 * created at		:	2020-08-20
 * created by		:	DungNT
 * package			:	spo\shared\components\common\select-box-ward.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function SelectBoxWard(props) {
    let list = props.data;
    if (props.filter) {
        list = list.filter((x) => x.district_id == props.filter);
    } else {
        list = [];
    }
    list = list.map((e) => {
        return { label: e.ward_name, value: e.ward_id };
    });
    return (
        <SelectBox
            showSearch={true}
            readonly={props.readonly}
            value={props.value}
            onChange={(val) => props.onChange(val)}
            placeholder="Chọn Phường"
            list={list}
            defaultValue={0}
            isShowSelectAll={false}
        />
    );
}
SelectBoxWard.propTypes = {
    filter: PropTypes.number,
    data: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    readonly: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
};
SelectBoxWard.defaultProps = {
    filter: '',
    data: [],
    value: null,
    readonly: false,
};
export default SelectBoxWard;
