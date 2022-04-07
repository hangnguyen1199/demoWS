import React from 'react';
import SelectBox from './select-box';
import PropTypes from 'prop-types';

export default function SelectBoxDistrict(props) {
    let list = props.data;
    if (props.filter) {
        list = list.filter((x) => x.city_code == props.filter);
    } else {
        list = [];
    }
    list = list.map((e) => {
        return { label: e.district_name, value: e.district_id };
    });

    return (
        <SelectBox
            showSearch={true}
            readonly={props.readonly}
            value={props.value}
            onChange={(val) => props.onChange(val)}
            placeholder="Chọn Quận"
            // list={list}
            defaultValue={0}
            isShowSelectAll={false}
        />
    );
}
SelectBoxDistrict.propTypes = {
    data: PropTypes.array,
    readonly: PropTypes.bool,
    value: PropTypes.number,
    onChange: PropTypes.func,
};
SelectBoxDistrict.defaultProps = {
    filter: '',
    data: [],
    value: null,
    readonly: false,
};
