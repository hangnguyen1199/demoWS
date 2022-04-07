import PropTypes from 'prop-types';
import React from 'react';
import SelectBox from '../common/select-box';

export default function ColorBoxDetailUpdated(props) {
    const { colors, active, className } = props;

    const onChangeColor = (val) => {
        props.onChangeColor({
            ColorId: val?.ColorId,
            Thumb: val?.Thumb
        })
    };
    return (
        <>
            <div className={`size-box-detail-updated wrap ${className}`}>
                <div className=" _custom">
                    <SelectBox
                        value={active}
                        onChange={onChangeColor}
                        placeholder="Màu sắc"
                        list={colors}
                        defaultValue={0}
                        isShowSelectAll={false}
                        field={["Name", "ColorId"]}
                        showArrow={true}
                        showEmpty={false}
                        checkValueItem={true}
                    />
                </div>
            </div>
        </>
    );
}
ColorBoxDetailUpdated.propTypes = {
    colors: PropTypes.array,
    active: PropTypes.number,
    onChangeColor: PropTypes.func,
};
ColorBoxDetailUpdated.defaultProps = {
    colors: [],
    active: null,
};
