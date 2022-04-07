import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MultiHashtag from '../common/multi-hashtag';
import HashTag from './../utility/hashtag';
import { Router } from '@spo/routes';
import { arrayToString } from '@spo/lib/helper';
import AppActions from '@spo/redux/app/action';
import { useDispatch } from 'react-redux';
import constants from '@spo/config/constants';

/**
 * ****************************************************************************
 * DUNGNT HashtagFilter CODE
 * hashtag-filter.js
 *
 * description		:
 * created at		:	2020-09-16
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\hashtag-filter.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function HashtagFilter(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data, listChecked } = props;
    const [hashtag, setHashtag] = useState(null);
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        if (router.query[constants.PARAM_URL.HOTTREND]) {
            let newString = router.query[constants.PARAM_URL.HOTTREND];
            if (newString.includes(',')) {
                let newArr = newString.split(',');
                setHashtag(newArr);
            } else {
                setHashtag([newString]);
            }
        } else {
            setHashtag([]);
        }
    }, [router.query[constants.PARAM_URL.HOTTREND]]);
    useEffect(() => {
        if (typeof props.onChange == 'function') {
            setHashtag(listChecked);
        }
    }, [listChecked]);
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onChange = (hashtag_name) => {
        let newChecked = [...hashtag];
        const index = newChecked.findIndex((x) => x == hashtag_name);
        if (index != -1) {
            if (router.pathname == '/hot-trend' && newChecked.length == 1) {
            } else {
                newChecked.splice(index, 1);
            }
        } else {
            newChecked.push(hashtag_name);
        }
        if (typeof props.onChange == 'function') {
            props.onChange(newChecked);
        } else {
            let data = router.query;

            let stringHashtag = arrayToString(newChecked);
            if (!stringHashtag) {
                delete data[constants.PARAM_URL.HOTTREND];
            } else {
                data[constants.PARAM_URL.HOTTREND] = `${stringHashtag}`;
            }
            data[constants.PARAM_URL.LIMIT] = 12;
            data[constants.PARAM_URL.OFFSET] =
                router[constants.PARAM_URL.OFFSET] ?? 0;
            // dispatch(AppActions.callLoading());
            Router.pushRoute(router.pathname.replace(/\//g, ''), data).then(
                () => {
                    // dispatch(AppActions.closeLoading());
                },
            );
        }
    };
    return (
        data.length > 0 && (
            <div className="sidebar_widget">
                <div className="widget-title">
                    <div className="title-leftside">Xu hướng</div>
                </div>
                <MultiHashtag
                    listChecked={hashtag}
                    data={data}
                    onChange={onChange}
                />
            </div>
        )
    );
}
HashtagFilter.defaultProps = {
    data: [],
};
export default HashtagFilter;
