import React, { useState } from 'react';
import IconArrowLeftShort from './../common/icon-arrow-left-short';
import IconCheckSquareFill from './../common/icon-check-square-fill';
import IconCheckCircle from '../common/icon-check-circle';
import IconSquare from './../common/icon-square';

/**
 * ****************************************************************************
 * DUNGNT HashtagFilterScreen CODE
 * hashtag-filter-screen.js
 *
 * description		:
 * created at		:	2020-08-24
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\hashtag-filter-screen.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function HashtagFilterScreen(props) {
    const { data, show } = props;
    const [listChecked, setListChecked] = useState(props.listChecked);
    //----------------------------------------------
    // Function
    //----------------------------------------------

    const onDone = () => {
        props.onChange(listChecked);
        props.onCloseScreen();
    };
    const onCheck = (hashtag_name) => {
        let newChecked = [...listChecked];
        const index = newChecked.findIndex((x) => x == hashtag_name);
        if (index != -1) {
            newChecked.splice(index, 1);
        } else {
            newChecked.push(hashtag_name);
        }
        setListChecked(newChecked);
    };
    return (
        <div className={`hashtag-filter-screen ${show ? 'active' : ''}`}>
            <div className="col-12 px-0">
                <div className="top w-100 col-12 px-2">
                    <div className="d-start col-3 px-0">
                        <div
                            className="close"
                            onClick={() => props.onCloseScreen()}>
                            <IconArrowLeftShort fontSize={30} />
                        </div>
                    </div>
                    <div className="col-6 text-center">HashTags</div>
                    <div className="col-3 px-2">
                        <div className=" d-end" onClick={onDone}>
                            Xong
                        </div>
                    </div>
                </div>
                <div className="px-3 py-2">
                    {data?.map((item, index) => {
                        return (
                            <div key={index} className={`category-wrap `}>
                                <div
                                    className="category-title"
                                    onClick={() => onCheck(item.hashtag_name)}>
                                    <span>{item.hashtag_name}</span>
                                    <span className={`d-center icon `}>
                                        {listChecked.includes(
                                            item.hashtag_name,
                                        ) ? (
                                                <IconCheckSquareFill />
                                            ) : (
                                                <IconSquare />
                                            )}
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
HashtagFilterScreen.propTypes = {};
HashtagFilterScreen.defaultProps = {
    listChecked: [],
};
export default HashtagFilterScreen;
