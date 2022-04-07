import React from 'react';
import IconCheckSquareFill from './../common/icon-check-square-fill';
import IconSquare from './../common/icon-square';

function RowItemCheckbox (props) {
    const { item, field, checked, mode, style, className } = props
    const onCheck = (item) => {
        if (typeof props.onCheck === 'function') {
            props.onCheck(item)
        }
    }
    return (
        <div className={`row-item-checkbox ${className}`} style={style}>
            <div
                className="item-title"
                onClick={() => onCheck(item)}>
                <span>{item[field]}</span>
                {(mode != 'single' && item.brand_id != 0) &&
                    <span className={`d-center icon `}>
                        {checked ? (
                            <IconCheckSquareFill />
                        ) : (
                            <IconSquare />
                        )}
                    </span>}
            </div>
        </div>
    )
}
RowItemCheckbox.propTypes = {}
RowItemCheckbox.defaultProps = {}
export default React.memo(RowItemCheckbox);