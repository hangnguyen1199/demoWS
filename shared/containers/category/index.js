import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import _ from 'lodash';
import constants from '@spo/config/constants';
import { useCustomRoute } from '@spo/lib/use-custom-route';
import Display from '@spo/components/common/display';
import HomeActions from '@spo/redux/home/action';
import CategoryMaleContainer from './component/category-male';
import CategoryFemaleContainer from './component/category-female';
import CategoryChildren from './component/category-children';
import CategoryGender from './component/category-gender';
import CategoryUnisexGender from './component/category-unisex';
import CategoryCoupleGender from './component/category-couple';
import { GENDER } from '../../config/constants';
import PageList from '../../config/PageList'
import CustomFrame from '../../components/common/custom-frame';
import Image from '../../components/common/image';
/**
 * ****************************************************************************
 * HAIDT Index CODE
 * index.js
 *
 * description		:
 * created at		:	2020-11-16
 * created by		:	HAIDT
 * package			:	spo\shared\containers\category\index.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */

const CategoryContainer = (props) => {
    const dispatch = useDispatch();
    const [listItem, setListItem] = useState([]);
    const router = useRouter();
    const common = useSelector((state) => state.Common);
    const { loading, data } = useSelector((state) => state.Home);
    const {
        data: { wishlistProducts },
    } = useSelector((state) => state.Wishlist);
    const {
        loading: { loadingSlide },
        data: { settingMaster },
    } = useSelector((state) => state.Common);
    let categories = common.data.listCategory.filter(c => c.GenderId == props.type);
    useEffect(() => {
        let data = [...listItem];
        let dataListDefault = common.data.listCategory;
        let dataItemGroup = dataListDefault.filter(v => v.GenderId == constants.GENDER_SLUG['be-trai'] || v.GenderId == constants.GENDER_SLUG['be-gai']);
        if (props.type == constants.GENDER_SLUG['tre-em']) {
            if (dataItemGroup.length > 0) {
                data = dataItemGroup;
            }
        } else {
            let categories = common.data.listCategory.filter(c => c.GenderId == props.type);
            if (categories.length > 0) {
                data = categories[0]?.ListCategory;
            }
        }
        setListItem(data);
    }, [common.data.listCategory, props.type])


    const handleOnClickLink = (url) => {
        useCustomRoute(dispatch, url);
    }

    const renderURL = (id, idCategory) => {
        return `${PageList.PRODUCT_LIST.SERVER}/${`?${constants.ROUTER_NAME.GENDER}=${id}&${constants.ROUTER_NAME.CATEGORY}=${idCategory}`}`;
    }
    const renderURL_Child = (id) => {
        return `${PageList.PRODUCT_LIST.SERVER}/${`?${constants.ROUTER_NAME.GENDER}=${id}`}`;
    }
    const ItemChild = ({ id, slug, name, dataChild, image, type = '', idCategory }) => {
        return <div
            className="group group-hover">
            {slug ? <Link
                prefetch={false}
                href={renderURL(id, idCategory)}
                as={renderURL(id, idCategory)}>
                <a className="item-title-header-menu-top">
                    <span className="fontsize16">
                        {
                            name
                        }
                    </span>
                </a>
            </Link> :
                <Link
                    prefetch={false}
                    href={renderURL_Child(id)}
                    as={renderURL_Child(id)}>
                    <a className="item-title-header-menu-top">
                        <span className="fontsize16 button-hover">
                            {
                                name
                            }
                        </span>
                    </a>
                </Link>}
            {dataChild && dataChild.length > 0 &&
        <>
            <ul className="menu-item-sub">
                <div className="menu-item-sub-wap">
                    <div className={`content-menu-left ${type && 'd-flex flex-row align-items-start flex-wrap'}`}>
                        {dataChild.map(
                            (sub, indexSub) => (
                                <li
                                    key={
                                        indexSub
                                    }
                                    className={`${type ? 'item-title-menu-2' : 'item-title-menu'} `}
                                >
                                    <Link
                                        prefetch={
                                            false
                                        }
                                        href={renderURL(id, sub.Id)}
                                        as={renderURL(id, sub.Id)}>
                                        <a style={{ fontWeight: type ? 500 : '' }} className="button-hover fontsize16">
                                            {
                                                sub.Name
                                            }
                                        </a>
                                    </Link>
                                    <div style={{ marginTop: 5 }}>
                                        {sub.CategoriesChild.length > 0 &&
                          sub.CategoriesChild.map((el, _id) => {
                              return (
                                  <Link
                                      key={_id}
                                      prefetch={
                                          false
                                      }
                                      href={renderURL(id, el.Id)}
                                      as={renderURL(id, el.Id)}>
                                      <a className="button-hover fontsize16">
                                          {
                                              el.Name
                                          }
                                      </a>
                                  </Link>
                              )
                          })}
                                    </div>
                                </li>
                            ),
                        )}
                    </div>
                    {(image && id != constants.GENDER_SLUG['be-gai']) &&
                <div className='content-menu-right'>
                    <CustomFrame ratio={175 / 372}>
                        <Image className="w-100 h-100" src={image} lazyLoad={false} />
                    </CustomFrame>
                </div>}
                </div>
            </ul>
            <ul className="_overlay_header_menu_new"></ul>
        </>
            }
        </div>
    }

    const renderMenu = (_props) => {
        const { dataItem, type } = _props;
        if (type == constants.GENDER_SLUG['tre-em']) {
            return dataItem?.map(
                (childGroup, indexGroup) => (
                    <ItemChild
                        key={indexGroup}
                        type={type}
                        image={childGroup?.WebImage ?? childGroup?.ImageUrl}
                        dataChild={childGroup.ListCategory}
                        id={childGroup.GenderId}
                        slug={childGroup?.Slug}
                        name={childGroup.GenderName} />
                )
            )
        }
        return dataItem?.map(
            (childGroup, indexGroup) => {
                // console.log(childGroup);
                return <ItemChild
                    key={indexGroup}
                    image={childGroup.Image}
                    dataChild={childGroup?.CategoriesChild}
                    id={categories[0].GenderId}
                    idCategory={childGroup.Id}
                    slug={childGroup.Slug}
                    name={childGroup.Name} />
            }
        )
    }
    const renderCategoryPage = (type) => {
        switch (type) {
            case GENDER.Male.Id:
                return <CategoryMaleContainer Gender={props.type} />
            case GENDER.Female.Id:
                return <CategoryFemaleContainer Gender={props.type} />
            case GENDER.Unisex.Id:
                return <CategoryUnisexGender Gender={props.type} />
            case GENDER.Couple.Id:
                return <CategoryCoupleGender Gender={props.type} />
            case GENDER.Child.Id:
                return <CategoryChildren Gender={props.type} />
            default:
                return <CategoryChildren Gender={props.type} />
        }
    }
    const productNew = () => {
        let params={}
        params[constants.ROUTER_NAME.GENDER]=props.type
        return (
            <>
                <div className="group group-hover  hover-product-top w-auto">

                    <Link href={{
                        pathname: PageList.PRODUCT_LIST_TREND.SERVER,
                        query: params
                    }}>
                        <a className="item-title-header-menu-top group-hover-first top-product">
              Sản phẩm bán chạy
                        </a>
                    </Link>
                    {/* <ul className="menu-item-sub">
            <div className="menu-item-sub-wap">Sản phẩm bán chạy</div>
          </ul>
          <ul className="_overlay_header_menu_new"></ul> */}
                </div>
                <div className="group group-hover">

                    <Link href={{
                        pathname: PageList.PRODUCT_LIST_NEW.SERVER,
                        query: params
                    }}>
                        <a className=" item-title-header-menu-top top-product">
              Sản phẩm mới
                        </a>
                    </Link>
                    {/* <ul className="menu-item-sub">
            <div className="menu-item-sub-wap">Sản phẩm mới</div>
          </ul>
          <ul className="_overlay_header_menu_new"></ul> */}
                </div>
                <div />
            </>
        );
    }

    return (
        <>
            <div className="category-with-type">
                <Display>
                    <div
                        className="d-flex col-12 menu px-0 px-lg-3 header-wrap-sub header-wrap-sub-con pd-lr-common ">
                        <div className="item-sub-group item-sub-group-scroll">
                            {
                                productNew()
                            }
                        </div>

                        <div className="line-menu">
                        </div>
                        <div className="item-sub-group item-sub-group-scroll">
                            {renderMenu({ dataItem: listItem, type: props.type })}
                        </div>
                    </div>
                </Display>
                {renderCategoryPage(props.type)}
            </div>
        </>
    );
};

export default CategoryContainer;