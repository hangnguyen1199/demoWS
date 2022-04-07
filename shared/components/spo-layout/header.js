import Image from '@spo/components/common/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Display from '../common/display';
import MenuActions from '../../../redux/top-search-menu/action';
import constants from '../../config/constants';
import AppConfig from '../../config/AppConfig';

;
import TopMenu from './../spo-top/top-menu';
import TopSearch from './../spo-top/TopSearchComponent/top-search';
import { useRouter } from 'next/router';
import PageList from '../../config/PageList';
import useCustomRoute from '../../library/use-custom-route';
import navigate, { getUrlDynamic } from '../../library/navigate';

/**
 * ****************************************************************************
 * HaiDT Header CODE
 * header.js
 *
 * description		:
 * created at		:	2021-11-23
 * created by		:	HaiDT
 * package			:	spo\shared\components\spo-layout\header.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const Header = (props) => {
    const { user, carts, wishlist, notifications, count_unread } = props;
    const common = useSelector((state) => state.Common);
    const [listMenu, setListMenu] = useState([]);
    const router = useRouter();
    const [isSubMenuMobile, setIsSubMenuMobile] = useState([]);
    const dispatch = useDispatch();
    const onGoHome = (e) => {
        e.preventDefault();
        useCustomRoute(dispatch, '/');
    };
    useEffect(() => {
        let isShowArray = [];
        if (isSubMenuMobile.length == 0) {
            common.data.listCategory.forEach(el => {
                isShowArray.push(false);
            });
            setIsSubMenuMobile(isShowArray);
        }
    }, [common]);
    const handleClickOnWrapper = () => {
        // dispatch({
        //     type: MenuActions.CLOSE_SEARCH_INPUT,
        // });
    };
    const showSubOnMobile = (gid = 1) => {
        // isSubMenuMobile[index] = false;
        router.push({
            pathname: `/category-mobile/${gid}`,
        }, undefined, { shallow: true })
    };
    const closeSubOnMobile = (index) => {
        isSubMenuMobile[index] = true;
    };
    useEffect(() => {
        let dataListDefault = common.data?.listCategory;
        let listGender = [];

        let dataItemGroup = dataListDefault.filter(v => v.GenderId == constants.GENDER_SLUG['be-trai'] || v.GenderId == constants.GENDER_SLUG['be-gai']);
        listGender = dataListDefault.filter(v => v.GenderId != constants.GENDER_SLUG['be-trai'] && v.GenderId != constants.GENDER_SLUG['be-gai']);
        if (dataItemGroup.length > 0) {
            listGender.push({
                GenderId: constants.GENDER_SLUG['tre-em'],
                GenderName: "Trẻ em",
            })
        }
        setListMenu(listGender);
    }
    , [common]);

    const showHref = (menu) => {
        if (router.pathname == PageList.CATEGORY_MOBILE.ROUTE) {
            // return "/category-mobile/[slug]"
            return {
                pathname: PageList.CATEGORY_MOBILE.CLIENT,
                query: {
                    slug: constants.GENDER_ID[menu.GenderId]
                }
            }
        }
        return {
            pathname: PageList.CATEGORY.CLIENT,
            query: {
                slug: constants.GENDER_ID[menu.GenderId]
            }
        }
    }

    const handleChangeCategory = (e, menu) => {
        e.preventDefault();
        e.stopPropagation()
        if (router.pathname == PageList.CATEGORY_MOBILE.ROUTE) {
            // useCustomRoute(dispatch, `${PageList.CATEGORY_MOBILE.INDEX}${constants.GENDER_ID[menu.GenderId]}`, {}, false);
            // useCustomRoute(dispatch, PageList.CATEGORY_MOBILE.CLIENT, {
            //     slug: constants.GENDER_ID[menu.GenderId]
            // }, false,null,  3);
            navigate({...getUrlDynamic(PageList.CATEGORY_MOBILE.NAME, constants.GENDER_ID[menu.GenderId])})
        } else {
            // useCustomRoute(dispatch, `${PageList.CATEGORY.INDEX}${constants.GENDER_ID[menu.GenderId]}`, {}, false);
            // useCustomRoute(dispatch, PageList.CATEGORY.CLIENT, {
            //     slug: constants.GENDER_ID[menu.GenderId]
            // }, false,null,  3);
            navigate({...getUrlDynamic(PageList.CATEGORY.NAME, constants.GENDER_ID[menu.GenderId])})

        }

    }

    return (
        <div
            className={`header-wrap classicHeader header`}
            onClick={handleClickOnWrapper}>
            <div className="align-items-center pl-0 pr-0">
                <Display mobile={true}>
                    <div className="d-start menu col-12 px-0 header-wrap-menu pd-lr-common justify-content-between">
                        <div className={`item pr-2`}>
                            <span
                                className="d-block "
                                href="/"
                                onClick={onGoHome}>
                                <Image
                                    width="35px"
                                    title="Logo FM"
                                    seo="logo-fm"
                                    className="object_fit_contain object-position-left"
                                    src={AppConfig.APP_LOGO}
                                />
                            </span>
                        </div>
                        {listMenu.map((menu, index) => {
                            return (
                                <div className={`item pr-2`} key={index}>
                                    <span
                                        className={`menu-name d-center 
                                            ${router.query?.slug == constants.GENDER_ID[menu.GenderId]
                                                || router.query[constants.ROUTER_NAME.GENDER] == menu.GenderId
                                            || router.query[constants.ROUTER_NAME.GENDER] == (
                                                menu.GenderId == constants.GENDER_SLUG['tre-em'] && constants.GENDER_SLUG['be-trai']
                                            )
                                            || router.query[constants.ROUTER_NAME.GENDER] == (
                                                menu.GenderId == constants.GENDER_SLUG['tre-em'] && constants.GENDER_SLUG['be-gai']
                                            )
                                    ? 'menu-name-header-active'
                                    : ''}`}>
                                        <Link
                                            prefetch={false}
                                            href={showHref(menu)}

                                            // as={showHrefAs(menu)}
                                        >
                                            <a onClick={(e) => handleChangeCategory(e, menu)}>{menu.GenderName}</a>
                                        </Link>
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </Display>
                <Display>
                    <div style={{ borderBottom: '2px inset' }} className='d-flex justify-content-between align-items-center'>
                        <div className="d-start menu px-0 header-wrap-menu pd-lr-common ">
                            <div

                                className={`justify-content-start d-flex h-100  align-items-center pointer`}>
                                <a className="d-block" href='/' onClick={onGoHome}>
                                    <Image
                                        title="Logo FM"
                                        seo="logo-fm"
                                        className="logo-fm-new object_fit_contain object-position-left"
                                        // src={`/images/icon/logo_fm_2.svg`}
                                        src={AppConfig.APP_LOGO}
                                    />
                                </a>
                            </div>
                            {listMenu.map((menu, index) => (
                                <Link
                                    prefetch={false}
                                    href={showHref(menu)}
                                    key={index}
                                    // as={showHrefAs(menu)}
                                >
                                    <div className={`item pr-4`} >
                                        <span className={`menu-name ${router.query?.slug == constants.GENDER_ID[menu.GenderId] 
                                            || router.query[constants.ROUTER_NAME.GENDER] == menu.GenderId
                                            || router.query[constants.ROUTER_NAME.GENDER] == (
                                                menu.GenderId == constants.GENDER_SLUG['tre-em'] && constants.GENDER_SLUG['be-trai']
                                            )
                                            || router.query[constants.ROUTER_NAME.GENDER] == (
                                                menu.GenderId == constants.GENDER_SLUG['tre-em'] && constants.GENDER_SLUG['be-gai']
                                            )
                                            ? 'menu-name-header-active' : ''} menu-name-header d-center`}>
                                            <a onClick={(e) => handleChangeCategory(e, menu)}>
                                                {menu.GenderName}
                                            </a>
                                            {/* <Link
                                        prefetch={false}
                                        href="/category/[slug]"
                                        as={`/category/${constants.GENDER_ID[menu.GenderId]}`}
                                        >
                                        {menu.GenderName}
                                    </Link> */}
                                        </span>
                                        {/* <div
                                    className="d-start menu col-12 px-0 px-lg-3 header-wrap-sub pd-lr-common"
                                    style={{ paddingRight: '0 !important' }}>
                                    <div className="d-flex itemimport { useRouter } from 'next/router';
-sub-group">import { useRouter } from 'next/router';
import { useCustomRoute } from '../../library/use-custom-route';

                                        {menu.ListCategory.map(
                                            (childGroup, indexGroup) => (
                                                <div
                                                    key={indexGroup}
                                                    className="group"
                                                    style={{ minWidth: 145 }}>
                                                    <Link
                                                        prefetch={false}
                                                        href={`/product-list/${`?gt=${constants.GENDER_ID[
                                                            menu.GenderId
                                                        ]
                                                            }&sp=${childGroup.Slug
                                                            }`}`}
                                                        as={`/product-list/${`?gt=${constants.GENDER_ID[
                                                            menu.GenderId
                                                        ]
                                                            }&sp=${childGroup.Slug
                                                            }`}`}>
                                                        <a>
                                                            <span className="fontsize16">
                                                                {
                                                                    childGroup.Name
                                                                }
                                                            </span>
                                                        </a>
                                                    </Link>

                                                    <ul className="item-sub">
                                                        {childGroup.CategoriesChild.map(
                                                            (sub, indexSub) => (
                                                                <li
                                                                    key={
                                                                        indexSub
                                                                    }
                                                                    style={{
                                                                        paddingTop:
                                                                            indexSub ==
                                                                                0
                                                                                ? 20
                                                                                : 13,
                                                                    }}>
                                                                    <Link
                                                                        prefetch={
                                                                            false
                                                                        }
                                                                        href={`/product-list/${`?gt=${constants
                                                                            .GENDER_ID[
                                                                            menu
                                                                                .GenderId
                                                                        ]
                                                                            }&sp=${sub.Slug
                                                                            }`}`}
                                                                        as={`/product-list/${`?gt=${constants
                                                                            .GENDER_ID[
                                                                            menu
                                                                                .GenderId
                                                                        ]
                                                                            }&sp=${sub.Slug
                                                                            }`}`}>
                                                                        <a className="link-hover fontsize16">
                                                                            {
                                                                                sub.Name
                                                                            }
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                                <div className="_overlay _overlay_header"></div> */}
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className='d-start menu px-0 header-wrap-menu pd-lr-common '>
                            <TopSearch offsetHeight={props.isShowContentTop && 40} />
                            <TopMenu
                                notifications={notifications}
                                count_unread={count_unread}
                                user={user}
                                carts={carts}
                                wishlist={wishlist}
                            />
                        </div>
                    </div>
                </Display>
            </div>
        </div>
    );
};

export default Header;
