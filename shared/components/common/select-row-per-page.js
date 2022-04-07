import React from 'react';
import SelectCodeDefinition from '@spo/components/common/select-code-definition';

/**
 * ****************************************************************************
 * DUNGNT SelectRowPerPage CODE
 * select-row-per-page.js
 *
 * description		:
 * created at		:	2021-03-16
 * created by		:	DungNT
 * package			:	spo\shared\components\common\select-row-per-page.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function SelectRowPerPage(props) {
    const { data } = props;
    return (
        <div className="select-row-per-page">
            <SelectCodeDefinition data="ROW_PER_PAGE" />
        </div>
    );
}
SelectRowPerPage.defaultProps = {
    list: [5, 10, 25, 50, 100],
};
export default SelectRowPerPage;
