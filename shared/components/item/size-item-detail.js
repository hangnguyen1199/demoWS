import React from 'react';
import LineX from '../common/line-x';

function SizeItemDetail(props) {
    const { name, active } = props;
    const onChangeSize = () => props.onChange();
    return (
        <div className="size-box-grid-item _custom">
            <div
                className={`d-center size-item pointer ${
                    active ? 'active' : ''
                }`}
                onClick={onChangeSize}>
                {name}
            </div>
        </div>
    );
}
SizeItemDetail.defaultProps = {
    name: '',
    active: false,
    disabled: false,
};
export default SizeItemDetail;
