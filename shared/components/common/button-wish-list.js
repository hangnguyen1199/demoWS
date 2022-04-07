import { PropTypes } from 'prop-types';
import React from 'react';
import constants from './../../config/constants';
import IconHeart from './icon-heart';
import IconHeartFill from './icon-heart-fill';

/**
 * ****************************************************************************
 * DUNGNT ButtonWishList CODE
 * button-wish-list.js
 *
 * description		:
 * created at		:	2020-08-15
 * created by		:	DungNT
 * package			:	spo\shared\components\common\button-wish-list.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function ButtonWishList(props) {
    const { active } = props;
    return (
        <div
            className="button-wish-list d-center"
            onClick={() => props.onChange()}>
            {active ? (
                <div style={{ color: constants.COLOR.PRIMARY }}>
                    <IconHeartFill fontSize={20} />
                </div>
            ) : (
                <IconHeart fontSize={20} />
            )}
        </div>
    );
}
ButtonWishList.propTypes = {
    active: PropTypes.bool,
    onChange: PropTypes.func,
};
ButtonWishList.defaultProps = {
    active: false,
    onChange:()=>{alert("Not implement")}
};
export default ButtonWishList;
