import React from 'react';
import SelectBox from './select-box';
import PropTypes from 'prop-types';

export default function SelectBoxCountry(props) {
    // const list = data.listCity.map((e) => {
    //     return { label: e.city_name, value: e.city_code };
    // });
    const list = [{ label: 'Việt Nam', value: 1 }];
    return (
        <SelectBox 
            readonly={props.readonly}
            value={props.value}
            onChange={(val) => props.onChange(val)}
            placeholder="Chọn Quốc Gia"
            list={list}
            isShowSelectAll={false}
        />
    );
};
SelectBoxCountry.propTypes = {
    data: PropTypes.object,
    readonly: PropTypes.bool,
    value: PropTypes.number,
    onChange: PropTypes.func
};
SelectBoxCountry.defaultProps = {
    readonly: false,
    value: 0,
};
