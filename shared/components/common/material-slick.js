import React from 'react';
import IconChevronBarLeft from './icon-chevron-bar-left';
import IconChevronRight from './icon-chevron-right';
import IconChevronLeft from './icon-chevron-left';
import IconChevronBarRight from './icon-chevron-bar-right';

/**
* ****************************************************************************
* DUNGNT MaterialSlick CODE
* material-slick.js 
* 
* description		:	
* created at		:	2020-09-07 
* created by		:	DungNT 
* package			:	spo\shared\components\common\material-slick.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/
function MaterialSlick (props) {
    const { to, from, activePage } = props
    return (
        <div className="material-pagination border-top d-flex flex-row">
            <div className="left">
                <div
                    className={`item link-hover ${
                        activePage == from ? '_disabled' : ''
                    }`}
                    onClick={() => props.first()}>
                    <IconChevronBarLeft />
                </div>
                <div
                    className={`item link-hover ${
                        activePage == from ? '_disabled' : ''
                    }`}
                    onClick={() => props.prev()}>
                    <IconChevronLeft />
                </div>
            </div>
            <div className="mid">
                <span>{` ${activePage + 1} / ${to + 1}`}</span>
            </div>
            <div className="right">
                <div
                    className={`item link-hover ${
                        to == activePage
                            ? '_disabled'
                            : ''
                    }`}
                    onClick={() => props.next()}>
                    <IconChevronRight />
                </div>
                <div
                    className={`item link-hover ${
                        to == activePage ? '_disabled' : ''
                    }`}
                    onClick={() => {
                        props.end();
                    }}>
                    <IconChevronBarRight />
                </div>
            </div>
        </div>
    );
}
MaterialSlick.propTypes = {}
MaterialSlick.defaultProps = {}
export default MaterialSlick