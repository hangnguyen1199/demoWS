import React from 'react';
import IconChevronRight from './../common/icon-chevron-right';
import IconArrowLeftShort from './../common/icon-arrow-left-short';
import IconX from './../common/icon-x';

/**
 * ****************************************************************************
 * DUNGNT CategoryFilterSubScreen CODE
 * category-filter-sub-screen.js
 *
 * description		:
 * created at		:	2020-08-24
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\category-filter-sub-screen.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function CategoryFilterSubScreen(props) {
    const { data, show } = props;
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onChange = (cat) => {
        props.onChange(cat);
        props.onCloseScreen();
    };
    const onClose = () => {
        props.onClose();
    };
    return (
        <div className={`category-filter-screen ${show ? 'active' : ''}`}>
            <div className="col-12 px-0">
                <div className="top w-100 col-12 px-2">
                    <div className="d-start col-3 px-0">
                        <div
                            className="close"
                            onClick={() => props.onCloseScreen()}>
                            <IconArrowLeftShort fontSize={30} />
                        </div>
                    </div>
                    <div className="col-6 text-center">{data.title}</div>
                    <div className="col-3 px-0">
                        <div className=" d-end" onClick={onClose}>
                            <IconX fontSize={32} />
                        </div>
                    </div>
                </div>
                <div className="px-3 py-2">
                    {data.child_categories?.map((item, index) => {
                        return (
                            <div key={index} className={`category-wrap `}>
                                <div
                                    className="category-title"
                                    onClick={() => onChange(item)}>
                                    <span>{item.title}</span>
                                    <span className={`d-center icon `}>
                                        {/* <IconChevronRight /> */}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default CategoryFilterSubScreen;
