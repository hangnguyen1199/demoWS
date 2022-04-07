import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { List } from 'react-virtualized';

/**
 * ****************************************************************************
 * DUNGNT ListDropdown CODE
 * list-dropdown.js
 *
 * description		:
 * created at		:	2020-09-22
 * created by		:	DungNT
 * package			:	spo\shared\components\common\list-dropdown.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function ListDropdown(props) {
    const { scrollTo, data, field, placehoder, showEmpty } = props;
    const onCheck = (item) => {
        props.onCheck(item);
    };
    const [list, setList] = useState([]);
    useEffect(() => {
        let newList = [...data];
        if (showEmpty) {
            let placeValue = {};
            placeValue[field[0]] = `${placehoder}`;
            placeValue[field[1]] = null;
            newList.unshift(placeValue);
        }
        setList(newList);
    }, [data]);
    const onKeyDown = (e, item) => {
        if (e.keyCode == 13 || e.keyCode == 32) {
            props.onCheck(item);
        }
    };
    const renderRow = ({ index, style }) => {
        return (
            <div
                onKeyDown={(e) => onKeyDown(e, list[index])}
                tabIndex="0"
                style={style}
                key={index}
                className={`select-focus select w-100   _tab_index_${index}`}
                onClick={(e) => {
                    e.stopPropagation()
                    onCheck(list[index])
                }}>
                <span className="text-truncate">{list[index][field[0]]}</span>
            </div>
        );
    };
    const rowHeight = 40;
    return (
        <div>
            <List
                // onScroll={onScroll}
                field={field}
                scrollToIndex={scrollTo}
                scrollToAlignment="start"
                width={200}
                height={150}
                rowHeight={rowHeight}
                rowRenderer={renderRow}
                rowCount={list.length}
                overscanRowCount={10}
            />
        </div>
    );
}
ListDropdown.propTypes = {
    data: PropTypes.array,
    field: PropTypes.array,
};
ListDropdown.defaultProps = {
    data: [],
    field: ['label', 'value'],
    // placehoder:"Chọn"
};
export default ListDropdown;
