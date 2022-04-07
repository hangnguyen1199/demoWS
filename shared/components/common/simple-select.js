import { xoa_dau } from '@spo/lib/helper';
import React, { useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import IconChevronDown from './icon-chevron-down';
import InputSearch from './input-search';
import ListDropdown from './list-dropdown';

/**
 * ****************************************************************************
 * DUNGNT SimpleSelect CODE
 * simple-select.js
 *
 * description		:
 * created at		:	2020-08-21
 * created by		:	DungNT
 * package			:	spo\shared\components\common\simple-select.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function SimpleSelect(props) {
    const { id, field, error, data, showEmpty, image, showArrow = false ,checkValueItem=false} = props;
    const [show, setShow] = useState(false);
    const [label, setLabel] = useState('');
    const [scrollTo, setScrollTo] = useState(0);
    const elRef = useRef(null);
    const wrapRef = useRef(null);
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        const item_selected =
            data[data.findIndex((x) => x[field[1]] == props.value)];
        if (props.value && data) {
            setLabel(item_selected ? item_selected[field[0]] : '');
        } else {
            setLabel('');
        }
    }, [props.value, data]);

    useEffect(() => { }, []);
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onClick = (e) => {
        setShow(!show);
    };

    const onSelect = () => {
        props.onChangeSelect(null);
        setShow(false);
    };

    const onChangeSearch = (val) => {
        let index = data.findIndex((x) =>
            xoa_dau(x[field[0]]).includes(xoa_dau(val)),
        );
        setScrollTo(index);
    };
    const onKeyDown = (e) => {
        if (e.keyCode == 13) {
            setShow(!show);
        }
    };
    const onCheck = (item) => {
        if(checkValueItem){
            props.onChangeSelect(item);
        }else{
            props.onChangeSelect(item[field[1]]);
        }
        setShow(false);
    };
    const onSubmitSearch = (event) => {
        let listRef = findDOMNode(elRef.current);
        if (event.keyCode == 13) {
            if (listRef) {
                listRef
                    .querySelector(`.select-focus._tab_index_${scrollTo}`)
                    ?.focus();
            }
        } else if (event.keyCode == 9) {
            if (listRef) {
                listRef
                    .querySelector(`.select-focus._tab_index_${scrollTo - 1}`)
                    ?.focus();
            }
        }
    };
    const onWrapKeyDown = (event) => {

    };
    return (
        <div
            className={`simple-select `}
            style={{
                pointerEvents: props.readonly ? 'none' : '',
                backgroundColor: props.readonly ? 'whitesmoke' : '',
            }}>
            <div
                tabIndex="0"
                id={id}
                onKeyDown={onKeyDown}
                className={`_input pointer d-flex justify-content-between flex-wrap align-items-center px-2 ${props.className
                } ${error ? 'error' : ''} `}
                onClick={onClick}>
                {label &&
                    <div className="render-input-icon">
                        <span>{label}</span>
                    </div>
                }
                {(!label || label == '') && (
                    <div className="render-input-icon" >
                        <span className="_placeholder">{`${props.placeholder}`}</span>
                    </div>
                )}
                <div
                    className="d-flex justify-content-center flex-wrap align-items-center ml-2"
                    style={{ fontSize: '1rem', color: '#495057' }}>
                    {
                        showArrow && <IconChevronDown />
                    }
                </div>
            </div>
            <div
                className={`overlay ${show ? '' : 'invisible'}`}
                onClick={() => setShow(false)}></div>
            <div
                className={`_dropdown show ${show ? '' : 'invisible'}`}
                onKeyDown={onWrapKeyDown}
                ref={wrapRef}>
                <div
                    className={` p-2 ${props.showSearch ? 'd-block' : 'd-none'
                    }`}>
                    {show && (
                        <InputSearch
                            onChange={onChangeSearch}
                            onKeyDown={onSubmitSearch}
                        />
                    )}
                </div>
                <div
                    className={`wrap_select ${props.dropdownClass}`}
                    ref={elRef}>
                    <ListDropdown
                        field={field}
                        scrollTo={scrollTo}
                        listBrand={data}
                        listChecked={[props.value]}
                        onCheck={onCheck}
                        active={props.value}
                        data={data}
                        placehoder={props.placeholder}
                        showEmpty={showEmpty}
                    />
                </div>
            </div>
        </div>
    );
}
SimpleSelect.defaultProps = {
    field: ['label', 'value'],
};
export default SimpleSelect;
