import React from 'react';
import { useSelector } from 'react-redux';
import ListItems from '../../../components/item/list-items';
import constants from '@spo/config/constants';

export default function Bottom () {
    const { data: { mayBeYouCareProducts } } = useSelector((state) => state.Home);
    return (
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 px-0 _care_product bottom ">
            <ListItems
                sectionTitle={'CÓ THỂ BẠN QUAN TÂM'}
                isViewInSlider={true}
                items={mayBeYouCareProducts}
                loading={false}
                isShowMore={true}
                isFullWidth={false}
                textColor="#000000"
                backgroundHeader="#ffffff"
                seeAllPath={constants.PAGE_URL.MAY_BE_YOU_CARE}
            />
        </div>
    );
}
