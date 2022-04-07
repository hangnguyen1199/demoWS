import React from 'react';
import { useSelector } from 'react-redux';
import ListItems from '../../../components/item/list-items';

/**
* ****************************************************************************
* DUNGNT Bottom CODE
* bottom.js 
* 
* description		:	
* created at		:	2020-09-07 
* created by		:	DungNT 
* package			:	spo\shared\containers\wishlist\components\bottom.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
export default function Bottom() {
    const {
        data: { relativeProducts },
    } = useSelector((state) => state.Wishlist);
    return (
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 px-0 bottom ">
            <div className='_care_product'>
                <ListItems
                    sectionTitle={'CÓ THỂ BẠN QUAN TÂM'}
                    isViewInSlider={true}
                    items={relativeProducts}
                    loading={false}
                    isShowMore={true}
                    isFullWidth={false}
                    textColor="#000000"
                    backgroundHeader="#ffffff"
                />
            </div>
        </div>
    );
}
