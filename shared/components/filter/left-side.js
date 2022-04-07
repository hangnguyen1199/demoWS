const Display = dynamic(
    () => import('@spo/components/common/display'),
    { ssr: false },
);
import dynamic from 'next/dynamic';
import ColorFilter from '@spo/components/filter/color-filter';
import GenderFilter from '@spo/components/filter/gender-filter';
import HashTagFilter from '@spo/components/filter/hashtag-filter';
import PriceFilter from '@spo/components/filter/price-filter';
import SizeFilter from '@spo/components/filter/size-filter';
import CategoryFilter from '@spo/components/left-side/category-filter';
import AppActions from '@spo/redux/app/action';
import { Router } from '@spo/routes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BrandFilter from './brand-filter';
import constants from '@spo/config/constants';
import { FormattedMessage } from 'react-intl';


/**
 * ****************************************************************************
 * DUNGNT LeftSide CODE
 * left-side.js
 *
 * description		:
 * created at		:	2020-09-18
 * created by		:	DungNT
 * package			:	spo\shared\containers\view-item\components\left-side.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function LeftSide(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [openSearchFilter, setOpenSearchFilter] = useState(false);
    const [brand, setBrand] = useState({});
    const {
        data: { listCategory, listHottrend, listBrand, listColor, listSize },
    } = useSelector((state) => state.Common);
    const {
        data: { menus },
    } = useSelector((state) => state.App);
    const { includeColor, includeSize } = props;
    const [showFilter, setShowFilter] = useState(true);
    useEffect(() => {
        if (openSearchFilter) {
            document.getElementsByTagName('html')[0].classList.add('no-scroll');
        } else {
            document
                .getElementsByTagName('html')[0]
                .classList.remove('no-scroll');
        }
    }, [openSearchFilter]);
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onChangeCategory = (val) => {
        let data = router.query;
        data[constants.PARAM_URL.CATEGORY_SLUG] = `${val.slug}`;
        data[constants.PARAM_URL.OFFSET] = 0;
        data[constants.PARAM_URL.LIMIT] = 12;
        Router.pushRoute(router.pathname.replace(/\//g, ''), data);
    };
    const onOpenBrandModal = () => {
        dispatch({ type: AppActions.TOGGLE_MODAL_BRAND, data: true });
    };
    const onToggleFilter = () => {
        setShowFilter(!showFilter);
    };
    const [isHovered, setIsHovered] = React.useState();
    // const [sideRef, isHovered] = useHover();
    // useEffect(() => {
    //     console.log("isHovered",isHovered);
    // }, [isHovered])
    return (
        <Display>
            <div
                className={`new_sidebar d-block ${
                    showFilter ? 'active' : isHovered ? 'active' : ''
                }`}>
                <div
                    className="show_hide_filter d-flex"
                    onClick={onToggleFilter}>
                    {showFilter ? 'X' : isHovered ? 'X' : 'Bộ lọc'}
                </div>
                <div
                    className="sidebar filterbar d-block pl-0"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <div className="right_hover"></div>
                    <div className="pb-2 col">
                        <GenderFilter data={menus} />
                    </div>

                    <div className="wrap_scroll dir-rtl">
                        <div className=" dir-ltr">
                            <div className="pb-2">
                                <div className="widget-title">
                                    <div className="title-leftside">
                                        <FormattedMessage id="common.brand" />
                                    </div>
                                </div>
                                <BrandFilter
                                    brand={brand}
                                    brandMaster={listBrand}
                                />
                                <div
                                    className="py-3 link-hover"
                                    onClick={onOpenBrandModal}>
                                    <FormattedMessage id="common.choose_brand" />
                                </div>
                            </div>

                            <CategoryFilter
                                data={listCategory}
                                onChange={onChangeCategory}
                            />
                            <div className="pb-2">
                                <div className="widget-title">
                                    <div className="title-leftside">
                                        <FormattedMessage id="common.color" />
                                    </div>
                                </div>
                                <ColorFilter
                                    includeColor={includeColor}
                                    colorMaster={listColor}
                                />
                            </div>
                            <div className="pb-2">
                                <div className="widget-title">
                                    <div className="title-leftside">
                                        <FormattedMessage id="common.size" />
                                    </div>
                                </div>
                                <SizeFilter
                                    sizeMaster={listSize}
                                    includeSize={includeSize}
                                />
                            </div>
                            <div className="pb-3">
                                <div className="widget-title">
                                    <div className="title-leftside">Giá </div>
                                </div>
                                <PriceFilter />
                            </div>
                            <HashTagFilter data={listHottrend} />
                        </div>
                    </div>
                </div>
            </div>
        </Display>
    );
}
LeftSide.defaultProps = {
    includeSize: [],
    includeColor: [],
};
export default LeftSide;
