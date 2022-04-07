import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Router } from '@spo/routes';
import { useRouter } from 'next/router';
import constants from '@spo/config/constants';

/**
* ****************************************************************************
* DUNGNT GenderFilter CODE
* gender-filter.js 
* 
* description		:	
* created at		:	2020-09-17 
* created by		:	DungNT 
* package			:	C:\Outfiz_Shop\spo\shared\components\filter\gender-filter.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/
function GenderFilter (props) {
    const { data, value } = props
    const router = useRouter()
    const [gender, setGender] = useState("A")
    // const onChange = (code) => {
    //     props.onChange(code)
    // }
    //----------------------------------------------
    // Effect 
    //----------------------------------------------
    useEffect(() => {
        if (router.query[constants.PARAM_URL.GENDER_ITEM]) {
            let newString = router.query[constants.PARAM_URL.GENDER_ITEM]
            setGender(newString)
        }
        else {
            setGender("A")
            if (typeof props.onChange == "function") {
                props.onChange("A")
            }
        }
    }, [router.query[constants.PARAM_URL.GENDER_ITEM]])

    useEffect(() => {
        if (typeof props.onChange == "function") {
            setGender(value)
        }
    }, [value])
    //----------------------------------------------
    // Function 
    //----------------------------------------------
    const onChange = (code) => {
        if (typeof props.onChange == "function") {
            props.onChange(code)
        } else {
            let data = { ...router.query }
            if (code) {
                data[constants.PARAM_URL.GENDER_ITEM] = `${code}`
            } else {
                delete data[constants.PARAM_URL.GENDER_ITEM]
            }
            data[constants.PARAM_URL.LIMIT] = 12
            data[constants.PARAM_URL.OFFSET] = router[constants.PARAM_URL.OFFSET] ?? 0
            Router.pushRoute(router.pathname.replace(/\//g, ""), data)
        }
    }
    return (
        data.length > 0 && <div className="gender-filter pb-3">
            <div className="_btn_group ">
                {data.map((item, index) => (
                    <span
                        key={index}
                        className={`_item_group no-select ${gender == item.code ? "active" : ""}`}
                        onClick={() => onChange(item.code)}
                    >{item.value}</span>
                ))}
            </div>
        </div >
    )
}
GenderFilter.propTypes = {
    data: PropTypes.array,
    gender: PropTypes.string
}
GenderFilter.defaultProps = {
    data: [],
    gender: "A"
}
export default React.memo(GenderFilter);