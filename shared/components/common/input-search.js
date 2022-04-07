import React, { useRef, useEffect } from 'react';
import IconSearch from './icon-search';
import { debounce } from 'lodash';
/**
 * ****************************************************************************
 * DUNGNT InputSearch CODE
 * input-search.js
 *
 * description		:
 * created at		:	2020-08-21
 * created by		:	DungNT
 * package			:	spo\shared\components\common\input-search.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function InputSearch(props) {
    const inputRef = useRef(null);
    const { data } = props;
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    //----------------------------------------------
    // Function
    //----------------------------------------------

    const onChangeSearch = () => {
        if (typeof props.onChange == 'function') {
            props.onChange(inputRef.current.value);
        }
    };
    const handleInputThrottled = debounce(onChangeSearch, 200);
    const onKeyDown = (event) => {
        if (typeof props.onKeyDown == 'function') {
            props.onKeyDown(event);
        }
    };
    return (
        <div className="w-100 position-relative">
            <input
                defaultValue={data}
                ref={inputRef}
                style={{ height: 40 }}
                onChange={handleInputThrottled}
                type="text"
                className=" form-control bg-white text-dark  border-secondary"
                placeholder=""
                onKeyDown={onKeyDown}
            />
            <div
                className="d-center"
                style={{
                    position: 'absolute',
                    width: 40,
                    right: 0,
                    top: 0,
                    height: '100%',
                }}>
                <IconSearch />
            </div>
        </div>
    );
}
export default React.memo(InputSearch);
