import React from 'react';
import Image from '@spo/components/common/image';
import LazyLoad from 'react-lazyload';
/**
 * ****************************************************************************
 * DUNGNT EmptyRow CODE
 * empty-row.js
 *
 * description		:
 * created at		:	2020-10-05
 * created by		:	DungNT
 * package			:	spo\shared\components\common\empty-row.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function EmptyRow(props) {
    const { title, width } = props;
    return (
        <div className="empty-row">
            <div className="title">{title}</div>
        </div>
    );
}
EmptyRow.defaultProps = {
    title: 'Chưa có sản phẩm nào',
};
export default EmptyRow;
