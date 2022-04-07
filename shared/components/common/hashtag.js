import React from 'react';
import { Link } from '@spo/routes';
import { PropTypes } from 'prop-types';

/**
* ****************************************************************************
* DUNGNT Hashtag CODE
* hashtag.js 
* 
* description		:	
* created at		:	2020-09-06 
* created by		:	DungNT 
* package			:	spo\shared\components\common\hashtag.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/
function Hashtag (props) {

    /**
    * Khi click hashtag
    *
    * Author : DungNT - 2020-09-06 - create
    * @return {void} 
    */
    const onClick = (hashtag_name) => {
        if (typeof props.onClick === 'function') {
            props.onClick(hashtag_name)
        }
    }
    return (
        <div className="d-start">
            {props.data?.map((tag, index) => (
                <div key={index} className="hashtag link-hover" key={index} onClick={() => onClick(tag.hashtag_name)}>
                    # {tag.hashtag_name}
                </div>
            ))}
        </div>
    )
}
Hashtag.propsTypes = {
    onClick: PropTypes.func,
    data: PropTypes.array
}
Hashtag.defaultProps = {}
export default Hashtag;