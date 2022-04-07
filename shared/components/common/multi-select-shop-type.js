import React from 'react';
import MultiSelectBox from './multi-select-box';
import PropTypes from 'prop-types';

export default function MultiSelectShopType(props) {
    const onChangeSelect = (val) => {
        props.onChangeSelect(val);
    };
    
    return (
        <MultiSelectBox
            placeholder={props.placeholder}
            data={props.data.shopTypes}
            selected={props.selected}
            onChangeSelect={onChangeSelect}
        />
    );
}
MultiSelectShopType.propTypes = {
    placehoder: PropTypes.string,
    onChangeSelect: PropTypes.func,
    selected: PropTypes.array,
    data: PropTypes.object
};
MultiSelectShopType.defaultProps = {
    placehoder: "",
    selected: [],
    data: {},
}
