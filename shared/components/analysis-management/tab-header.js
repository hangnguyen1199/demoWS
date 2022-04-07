import constants from '@spo/config/constants';
import { useCustomRoute } from '@spo/lib/use-custom-route';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
/**
 * ****************************************************************************
 * DUNGNT TabHeader CODE
 * tab-header.js
 *
 * description		:
 * created at		:	2020-07-19
 * created by		:	DungNT
 * package			:	spo\shared\components\item-list-management\tab-header.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function TabHeader(props) {
    const { active } = props;
    const dispatch = useDispatch();
    const router = useRouter();
    const list = [
        {
            name: 'Sản phẩm bán chay',
            code: constants.MANAGEMENT.ANALYSIS.TAB.HOT_SALE,
        },
        {
            name: 'Sản phẩm xem nhiều',
            code: constants.MANAGEMENT.ANALYSIS.TAB.MOST_VIEW,
        },
    ];
    const onChangeTab = (code) => {
        let newParams = {};
        newParams[constants.PARAM_URL.LIMIT] = constants.MANAGEMENT.ITEM.LIMIT;
        newParams[constants.PARAM_URL.OFFSET] = 0;
        newParams.tab = code;
        useCustomRoute(dispatch, router.pathname.replace('/', ''), newParams);
    };
    return (
        <ul className="nav nav-tabs nav-tabs-bottom">
            {list.map((item, index) => {
                return (
                    <li
                        key={index}
                        onClick={() => onChangeTab(item.code)}
                        className="nav-item">
                        <a
                            className={
                                `nav-link pointer ${ 
                                    active == item.code ? 'active' : ''}`
                            }
                            data-toggle="tab">
                            {item.name}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
TabHeader.propTypes = {
    active: PropTypes.string,
};
TabHeader.defaultProps = {
    active: constants.MANAGEMENT.ANALYSIS.TAB.HOT_SALE,
};
export default TabHeader;
