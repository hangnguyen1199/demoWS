import React, { useState } from 'react';
import ListFilterChild from '@spo/components/filter/list-filter-child';
import LoadMoreLeftSide from '@spo/components/common/load-more-left-side';
import constants from '@spo/config/constants';

/**
 * ****************************************************************************
 * HaiDT TreeItem CODE
 * tree-item.js
 *
 * description		:
 * updated at		:	2021-11-20
 * updated by		:	HaiDT
 * package			:	spo\shared\components\utility\tree-view\tree-item.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const TreeItem = (props) => {
    const {
        items,
        style,
        prependSlot,
        labelSlot,
        toggleOpen,
        selected,
        isTwoColumn
    } = props;
    const onChangeCategory = (val) => {
        setActive(val);
        props.onChange(val);
    };
    const [isStatus, setStatus] = useState(true);
    const [limit, setLimit] = useState(constants.limitCategory);
    const [active, setActive] = useState(null);
    const onLoadMore = () => {
        setLimit(items.length);
        setStatus(false);
    };
    const onLoadLimit = () => {
        setLimit(5);
        setStatus(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={isTwoColumn ? 'row': ""}>
            {items.slice(0, limit).map((item, index) => (
                <div
                    key={index}
                    style={style}
                    className={`tree-view root${item.category_id} ${isTwoColumn ? 'col-6' : ''}`}>
                    <div
                        className="category-root link-hover position-relative"
                        style={{ color: item.$open ? 'black' : '' }}>
                        {prependSlot(item)}
                        {/* <div className="label_shot"></div> */}
                        {labelSlot(item)}
                        <div
                            className="tree_overlay"
                            onClick={() => toggleOpen(item)}></div>
                        <a
                            className="expander link-hover"
                            onClick={() => toggleOpen(item)}>
                            {item.child_categories ? (
                                item.$open ? (
                                    <div
                                        style={{
                                            backgroundImage:
                                                'url(' +
                                                '/images/icon/tree-arrow-down.svg' +
                                                ')',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            width: 15,
                                            height: 15,
                                        }}></div>
                                ) : (
                                    <div
                                        style={{
                                            backgroundImage:
                                                'url(' +
                                                '/images/icon/tree-arrow-up.svg' +
                                                ')',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            width: 15,
                                            height: 15,
                                        }}></div>
                                )
                            ) : null}
                        </a>
                    </div>
                    {item.child_categories && item.$open && (
                        <ListFilterChild
                            selected={selected}
                            active={active}
                            list={item.child_categories}
                            open={item.$open}
                            onChange={onChangeCategory}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};
export default TreeItem;
