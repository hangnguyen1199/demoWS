import React, { useEffect, useState } from 'react';
import SelectBox from '@spo/components/common/select-box';
import { PropTypes } from 'prop-types';
import constants from '@spo/config/constants';

/**
* ****************************************************************************
* DUNGNT SelectCodeDefinition CODE
* select-code-definition.js 
* 
* description		:	
* created at		:	2021-03-16 
* created by		:	DungNT 
* package			:	spo\shared\components\common\select-code-definition.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
function SelectCodeDefinition(props) {
    const {
        data,
        placeholder,
        readonly,
        showSearch,
        defaultValue,
        value,
    } = props;
    const [list, setList] = useState([]);
    useEffect(() => {
        if (data) {
            let newList = [];
            Object.keys(constants[data]).map((key) => {
                newList.push({
                    value: constants[data][key].VALUE,
                    code: constants[data][key].CODE,
                });
            });
            setList(newList);
        } else {
            setList([]);
        }
    }, [data]);
    const onChange = (e) => {
        props.onChange(e);
    };
    return (
        <div className="select-code-definition">
            <SelectBox
                value={value}
                field={['value', 'code']}
                readonly={readonly}
                showSearch={showSearch}
                className="p-0 select-box"
                dropdownClass="dropdown-class"
                placeholder={placeholder}
                list={list}
                defaultValue={defaultValue}
                isShowSelectAll={false}
                onChange={onChange}
            />
        </div>
    );
}
SelectCodeDefinition.propTypes = {
    data: PropTypes.string,
    placeholder: PropTypes.string,
    showSearch: PropTypes.bool,
    readonly: PropTypes.bool,
};
SelectCodeDefinition.defaultProps = {
    data: [],
    showSearch: false,
    readonly: false,
    placeholder: 'Chọn ...',
    defaultValue: 0,
};
export default SelectCodeDefinition;
