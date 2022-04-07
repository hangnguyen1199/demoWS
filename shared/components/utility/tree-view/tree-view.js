import React, { useEffect, useState } from 'react';
import TreeItem from './tree-item';


/**
* ****************************************************************************
* DUNGNT TreeView CODE
* tree-view.js 
* 
* description		:	
* updated at		:	2020-09-28 
* updated by		:	DungNT 
* package			:	C:\Outfiz_Shop\spo\shared\components\utility\tree-view\tree-view.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/
const TreeView = (props) => {
    const { selected } = props
    const [items, setItems] = useState(props.items);
    //----------------------------------------------
    // Effect 
    //----------------------------------------------
    useEffect(() => {
        setItems(props.items)
    }, [props.items])
    //----------------------------------------------
    // Function 
    //----------------------------------------------
    function toggleOpen (item) {
        setItems(toggle(items, item));
        function toggle (items) {
            let result = items.map((i) => {
                return i.category_id === item.category_id
                    ? {
                        ...i,
                        $open: !i.$open,
                    }
                    : {
                        ...i,
                        ...(i.child_categories && { items: toggle(i.child_categories) }),
                    };
            });
            return result;
        }
    }
    const labelSlot =
        props.children instanceof Function
            ? (item) => (
                <a
                    onClick={() => onChange(item)}
                    className="tree-view_label link-hover">
                    {props.children(item)}
                </a>
            )
            : (item) => (
                <a
                    onClick={() => onChange(item)}
                    className={`tree-view_label link-hover no-select ${props.isTwoColumn ? 'pl-3' : ''}`}>
                    <input type="checkbox"/><div className="pl-3">{item.category_name}</div>
                </a>
            );
    const prependSlot =
        props.prependSlot instanceof Function
            ? (item) => props.prependSlot(item)
            : () => props.prependSlot;
    const onChange = (val) => {
        props.onChange(val)
    }
    return (
        <TreeItem
            {...{
                ...props,
                prependSlot,
                labelSlot,
                toggleOpen,
                items,
                selected
            }}
            onChange={onChange}
        />
    );


};
export default TreeView