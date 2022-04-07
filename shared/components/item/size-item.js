import React from 'react';
import LineX from '../common/line-x';

function SizeItem(props) {
    const {
        name,
        active
    } = props;
    const onChangeSize = () => props.onChange();
    return (
        <div className="pr-2 py-1 size-box-grid-item">
            <div className={`d-center size-item pointer ${active ? 'active': ''}` } style={{width: 100, fontSize: 16, color: "#333333", fontWeight: 400}} onClick={onChangeSize}>
                {name}
            </div>
        </div>
    );
}
SizeItem.defaultProps = {
    name: '',
    active: false,
    disabled: false,
};
export default SizeItem;
