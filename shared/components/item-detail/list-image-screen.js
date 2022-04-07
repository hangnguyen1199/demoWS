import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import IconChevronLeft from './../common/icon-chevron-left';
import IconArrowLeftShort from './../common/icon-arrow-left-short';

/**
* ****************************************************************************
* DUNGNT ListImageScreen CODE
* list-image-screen.js 
* 
* description		:	
* created at		:	2020-09-10 
* created by		:	DungNT 
* package			:	spo\shared\components\item-detail\list-image-screen.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/
function ListImageScreen (props) {
    const { show, data } = props;
    return (
        <div className={`list-image-screen ${show ? 'active' : ''}`}>
            <div className="h-100 w-100">
                <div className="top w-100 col-12 px-0">
                    <div className="d-start col-3 px-0">
                        <div
                            className="close"
                            onClick={() => props.onCloseScreen()}>
                            <IconArrowLeftShort fontSize={30} />
                        </div>
                    </div>
                    <div className="col-6 text-center">Hình ảnh sản phẩm</div>
                    <div className="col-3"></div>
                </div>
                <div
                    className="d-flex flex-wrap col-12 p-1">
                    {data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="col-3"
                                style={{ padding: 3 }}
                                onClick={() => props.onShowImage(index)}>
                                <div className="pointer square-container_3_4" >
                                    <div className="square_3_4" style={{ background: `url(${item.image_m})` }}>
                                    </div>
                                </div>
                                {/* <img
                                    className="w-100 h-100"
                                    src={item.image_m}
                                    alt=""
                                /> */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
ListImageScreen.propTypes = {};
export default ListImageScreen;
