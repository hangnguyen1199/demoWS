import React, { useState, useEffect } from 'react';

/**
* ****************************************************************************
* Haidt ListFilterChild CODE
* list-category.js 
* 
* description		:	
* updated at		:	2021-11-20 
* updated by		:	Haidt 
* package			:	\shared\components\filter\list-filter-child.js  
* copyright			:	Copyright (c) Haidt 
* version			:	1.0.0 
* ****************************************************************************
*/
function ListFilterChild (props) {
    const { selected } = props
    const list = props.list ?? [];
    const [checked, setChecked] = useState([]);
    const onChange = (item) => {
        props.onChange(item)
    };
    return (
        <div className={`_list_category mb-2`} style={{ paddingLeft: 1 }}>
            {list?.map((item, index) => {
                return (
                    <div
                        onClick={(id) => onChange(item)}
                        key={index}
                        className="d-flex justify-content-start align-items-center pl-3 link-hover link-hover-tree">
                        {/* <RadioButton
                            active={checked.includes(item.category_id)}
                            onChange={() => onChange(item.category_name)}
                        /> */}
                        <input type="checkbox"/>
                        <div className={`px-2 no-select ${selected?.category_id == item.category_id ? "color-primary" : ""}`}>{item.category_name}</div>
                    </div>
                );
            })}
        </div>
    );
}
export default ListFilterChild