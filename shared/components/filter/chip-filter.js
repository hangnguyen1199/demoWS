import React from 'react';
import IconXCircleFill from '@spo/components/common/icon-x-circle-fill';

function ChipFilter(props) {
    const { name, title, disabled, className } = props;
    const onRemove = () => {
        props.onRemove();
    };
    return (
        <div
            className={`${className ?? ''} chip-filter pointer ${
                disabled ? 'disabled' : ''
            }`}
            onClick={onRemove}
            title={title}>
            <span className="name">{name}</span>
            <span>
                <IconXCircleFill fontSize={10} />
            </span>
        </div>
    );
}
ChipFilter.defaultProps = {
    title: 'Xóa',
    disabled: false,
};
export default ChipFilter;
