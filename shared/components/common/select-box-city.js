import React from 'react';
import SelectBox from './select-box';
import PropTypes from 'prop-types';

function SelectBoxCity(props) {
    const { data } = props
    const list = data?.map((e) => {
        return { label: e.city_name, value: e.city_code };
    });
    return (
        <SelectBox
            showSearch={true}
            readonly={props.readonly}
            value={props.value}
            onChange={(val) => props.onChange(val)}
            placeholder="Chọn Thành Phố"
            list={list}
            isShowSelectAll={false}
        />
    );
}
SelectBoxCity.propTypes = {
    data: PropTypes.array,
    readonly: PropTypes.bool,
    value: PropTypes.number,
    onChange: PropTypes.func,
};
SelectBoxCity.defaultProps = {
    data: [],
    value: null,
    readonly: false,
};
export default SelectBoxCity