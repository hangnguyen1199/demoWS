import React, { useEffect } from 'react';
import RowItemCheckbox from './row-item-checkbox';
// import { FixedSizeList as List } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
import { List, AutoSizer } from 'react-virtualized';

function BrandList(props) {
    const { listBrand, listChecked, mode, scrollTo } = props;
    const onCheck = (item) => {
        props.onCheck(item);
    };
    const renderRow = ({ index, style }) => {
        return (
            <RowItemCheckbox
                style={style}
                id={`RowItemCheckbox_${listBrand[index].brand_id}_${index}`}
                key={index.toString()}
                item={listBrand[index]}
                field="brand_name"
                className={`${
                    listBrand[index].brand_id == 0
                        ? 'row-disabled font-weight-bold'
                        : ''
                }`}
                checked={listChecked.includes(
                    Number.parseInt(listBrand[index].brand_id),
                )}
                onCheck={onCheck}
                mode={mode}
            />
        );
    };
    const rowHeight = 40;
    return (
        <AutoSizer>
            {({ width, height }) => {
                return (
                    <List
                        scrollToIndex={scrollTo}
                        scrollToAlignment="start"
                        width={width}
                        height={height}
                        rowHeight={rowHeight}
                        rowRenderer={renderRow}
                        rowCount={listBrand.length}
                        overscanRowCount={3}
                    />
                );
            }}
        </AutoSizer>
    );
}
BrandList.defaultProps = {
    scrollTo: 0,
    listBrand: [],
    listChecked: [],
    mode: '',
};
export default React.memo(BrandList);
