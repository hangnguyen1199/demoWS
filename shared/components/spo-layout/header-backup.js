import Image from '@spo/components/common/image';
import { useCustomRoute } from '@spo/lib/use-custom-route';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Display from '../common/display';
import MenuActions from '../../../redux/top-search-menu/action';
import constants from '../../config/constants';
import AppConfig from '../../config/AppConfig';
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
    const common = useSelector((state) => state.Common);
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
        dispatch({
            type: MenuActions.CLOSE_SEARCH_INPUT,
        });
    };
    const showSubOnMobile = (index) => {
        isSubMenuMobile[index] = false;
    };
    const closeSubOnMobile = (index) => {
        isSubMenuMobile[index] = true;
    };
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
                        {common.data.listCategory.map((menu, index) => (
                            <div className={`item pr-2`} key={index}>
                                <span className="menu-name d-center" onClick={() => showSubOnMobile(index)}>
                                    {menu.GenderName}
                                </span>
                                <div
                                    className={`d-start menu col-12 px-0 px-lg-3 header-wrap-sub pd-lr-common not-chlid-menu ${isSubMenuMobile[index] ? 'd-none' : ''}`}
                                    style={{ paddingRight: '0 !important' }}>
                                    <div className="d-flex item-sub-group">
                                        <div
                                            className="group"
                                            style={{ minWidth: 145 }}>
                                            <span className="fontsize14">
                                                {menu.Name}
                                            </span>
                                        </div>
                                        {menu.ListCategory.map(
                                            (childGroup, indexGroup) => (
                                                <div
                                                    onClick={() => closeSubOnMobile(index)}
                                                    key={indexGroup}
                                                    className="group"
                                                    style={{ minWidth: 145 }}>
                                                    <Link
                                                        prefetch={false}
                                                        href={`/product-list/${`?gt=${
                                                            constants.GENDER_ID[
                                                                menu.GenderId
                                                            ]
                                                        }&sp=${
                                                            childGroup.Slug
                                                        }`}`}
                                                        as={`/product-list/${`?gt=${
                                                            constants.GENDER_ID[
                                                                menu.GenderId
                                                            ]
                                                        }&sp=${
                                                            childGroup.Slug
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
                                                                    onClick={() => closeSubOnMobile(index)}
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
                                                                        href={`/product-list/${`?gt=${
                                                                            constants
                                                                                .GENDER_ID[
                                                                                    menu
                                                                                        .GenderId
                                                                                ]
                                                                        }&sp=${
                                                                            sub.Slug
                                                                        }`}`}
                                                                        as={`/product-list/${`?gt=${
                                                                            constants
                                                                                .GENDER_ID[
                                                                                    menu
                                                                                        .GenderId
                                                                                ]
                                                                        }&sp=${
                                                                            sub.Slug
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
                            </div>
                        ))}
                    </div>
                </Display>
                <Display>
                    <div className="d-start menu col-12 px-0 header-wrap-menu pd-lr-common">
                        {common.data.listCategory.map((menu, index) => (
                            <div className={`item pr-4`} key={index}>
                                <span className="menu-name d-center">
                                    <Link
                                        prefetch={false}
                                        href="/category/[slug]"
                                        as={`/category/${
                                            constants.GENDER_ID[menu.GenderId]
                                        }`}>
                                        {menu.GenderName}
                                    </Link>
                                </span>
                                <div
                                    className="d-start menu col-12 px-0 px-lg-3 header-wrap-sub pd-lr-common"
                                    style={{ paddingRight: '0 !important' }}>
                                    <div className="d-flex item-sub-group">
                                        {menu.ListCategory.map(
                                            (childGroup, indexGroup) => (
                                                <div
                                                    key={indexGroup}
                                                    className="group"
                                                    style={{ minWidth: 145 }}>
                                                    <Link
                                                        prefetch={false}
                                                        href={`/product-list/${`?gt=${
                                                            constants.GENDER_ID[
                                                                menu.GenderId
                                                            ]
                                                        }&sp=${
                                                            childGroup.Slug
                                                        }`}`}
                                                        as={`/product-list/${`?gt=${
                                                            constants.GENDER_ID[
                                                                menu.GenderId
                                                            ]
                                                        }&sp=${
                                                            childGroup.Slug
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
                                                                        href={`/product-list/${`?gt=${
                                                                            constants
                                                                                .GENDER_ID[
                                                                                    menu
                                                                                        .GenderId
                                                                                ]
                                                                        }&sp=${
                                                                            sub.Slug
                                                                        }`}`}
                                                                        as={`/product-list/${`?gt=${
                                                                            constants
                                                                                .GENDER_ID[
                                                                                    menu
                                                                                        .GenderId
                                                                                ]
                                                                        }&sp=${
                                                                            sub.Slug
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
                                <div className="_overlay"></div>
                            </div>
                        ))}
                    </div>
                </Display>
                <Display>
                    <div
                        className={`logo_center d-flex h-100  align-items-center pointer`}>
                        <a className="d-block" href='/' onClick={onGoHome}>
                            <Image
                                title="Logo FM"
                                seo="logo-fm"
                                className="logo-fm object_fit_contain object-position-left"
                                // src={`/images/icon/logo_fm_2.svg`}
                                src={AppConfig.APP_LOGO}
                            />
                            {/* <span>Your Fashion - Your Choice</span> */}
                        </a>
                    </div>
                </Display>
            </div>
        </div>
    );
};

export default Header;
