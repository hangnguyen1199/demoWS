import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import _ from 'lodash';
import constants from '@spo/config/constants';
import CustomFrame from '../../components/common/custom-frame';
import { useCustomRoute } from '@spo/lib/use-custom-route';
import Display from '@spo/components/common/display';
import ListItemChild from './component/list-item-child';
import HomeActions from '@spo/redux/home/action';
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
let dataChildFake = [
    {
        id: 1,
        images: "https://f2.photo.talk.zdn.vn/8179392182162366980/7ea3721ce0972dc97486.jpg",
        title: 'Con gái',
        detail: "0-12"
    },
    {
        id: 2,
        images: "https://f9.photo.talk.zdn.vn/7782997488981276863/86fa6b43f9c834966dd9.jpg",
        title: 'Con trai',
        detail: "1-5"
    },
    {
        id: 3,
        images: "https://f19-zpc.zdn.vn/2893081547063182887/2c79fcc26e49a317fa58.jpg",
        title: 'Bé trai',
        detail: "1-5"
    },
    {
        id: 4,
        images: "https://f12.photo.talk.zdn.vn/8922935515478622639/b6376d88ff03325d6b12.jpg",
        title: 'Bé gái',
        detail: "6-12"
    },
    {
        id: 5,
        images: "https://f4.photo.talk.zdn.vn/4112783761488880602/b479d9fa4b71862fdf60.jpg",
        title: 'Em bé',
        detail: "6-12"
    },
]
const CategoryContainer = (props) => {
    const dispatch = useDispatch();
    const [listItem,setListItem]=useState([]);
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
    let itemsLive = [];
    useEffect(() => {
        let data=[...listItem];
        let dataListDefault=common.data.listCategory;
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
    },[common.data.listCategory,props.type])



    useEffect(() => {
        let topParam = {};
        topParam.Type = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_TOP;
        topParam.Limit = 12;
        topParam.Offset = 0;
        dispatch({
            type: HomeActions.LOAD_TOP_VIEWED_PRODUCT,
            data: { data: topParam },
        }); // TODO

        let newestParam = {};
        newestParam.Type = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_NEW;
        newestParam.Limit = 12;
        newestParam.Offset = 0;
        dispatch({
            type: HomeActions.LOAD_NEWEST_PRODUCT,
            data: { data: newestParam },
        });
        let goldenHourParam = {};
        goldenHourParam.TypeOfPromotion = constants.TYPE_SEARCH.PROMOTION.PROMOTION_GOLDEN_HOUR;
        goldenHourParam.Limit = 12;
        goldenHourParam.Offset = 0;
        dispatch({
            type: HomeActions.LOAD_GOLDEN_HOUR_PRODUCT,
            data: { data: goldenHourParam },
        });
        let supperSaleParam = {};
        supperSaleParam.TypeOfPromotion = constants.TYPE_SEARCH.PROMOTION.PROMOTION_SUPPER_SALE;
        supperSaleParam.Limit = 12;
        supperSaleParam.Offset = 0;
        dispatch({
            type: HomeActions.LOAD_SUPPER_SALE_PRODUCT,
            data: { data: supperSaleParam },
        });
        let trendingParam = {};
        trendingParam.Type = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_TREND;
        trendingParam.Limit = 12;
        trendingParam.Offset = 0;
        dispatch({
            type: HomeActions.LOAD_TRENDING_PRODUCT,
            data: { data: trendingParam },
        });

        let newsParam = {};
        newsParam.Limit = 4;
        newsParam.Offset = 0;
        dispatch({
            type: HomeActions.LOAD_NEWS,
            data: { data: newsParam },
        });

        let promotionParam = {};
        promotionParam.Limit = 2;
        promotionParam.Offset = 0;
        dispatch({
            type: HomeActions.LOAD_PROMOTION,
            data: { data: promotionParam },
        });

        let searchTopParam = {};
        searchTopParam.Type = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_SEARCH_TOP;
        searchTopParam.Limit = 12;
        searchTopParam.Offset = 0;
        dispatch({
            type: HomeActions.LOAD_PRODUCT_FILTER,
            data: { data: searchTopParam },
        }); // TODO
    }, []);


    let categoriesImage = [
        { img: "boy-ao.png", key: "Nam-Áo" },
        { img: "boy-dobo.png", key: "Nam-đồ bộ" },
        { img: "boy-phukien.png", key: "Nam-Phụ kiện" },
        { img: "boy-quan.png", key: "Nam-Quần" },
        { img: "boy.png", key: "Nam" },
        { img: "child-boy-ao.png", key: "Bé trai-Áo" },
        { img: "child-boy-dobo.png", key: "Bé trai-đồ bộ" },
        { img: "child-boy-phukien.png", key: "Bé trai-Phụ kiện" },
        { img: "child-boy-quan.png", key: "Bé trai-Quần" },
        { img: "child-boy.png", key: "Bé trai" },
        { img: "child-girl-ao.png", key: "Bé gái-Áo" },
        { img: "child-girl-dobo.png", key: "Bé gái-đồ bộ" },
        { img: "child-girl-phukien.png", key: "Bé gái-Phụ kiện" },
        { img: "child-girl-vay.png", key: "Bé gái-váy" },
        { img: "child-girl-quan.png", key: "Bé gái-Quần" },
        { img: "child-girl.png", key: "Bé gái" },
        { img: "couple-ao.png", key: "Đồ cặp-Áo" },
        { img: "couple-phukien.png", key: "Đồ cặp-Phụ kiện" },
        { img: "couple-quan.png", key: "Đồ cặp-Quần" },
        { img: "couple.png", key: "Đồ cặp" },
        { img: "girl-ao.png", key: "Nữ-Áo" },
        { img: "girl-dobo.png", key: "Nữ-đồ bộ" },
        { img: "girl-jumpsuit.png", key: "Nữ-Jumpsuit" },
        { img: "girl-phukien.png", key: "Nữ-Phụ kiện" },
        { img: "girl-quan.png", key: "Nữ-Quần" },
        { img: "girl-vay.png", key: "Nữ-váy" },
        { img: "girl.png", key: "Nữ" },
        { img: "unisex-ao.png", key: "Unisex-Áo" },
        { img: "unisex-phukien.png", key: "Unisex-Phụ kiện" },
        { img: "unisex-quan.png", key: "Unisex-Quần" },
        { img: "unisex.png", key: "Unisex" },
    ]

    function getImage(key) {
        if (!key) {
            return "";
        }
        let imgFind = _.find(categoriesImage, function (ct) {
            return ct.key.toString().toLowerCase() == key.toLowerCase();
        })
        return `/images/category/${  imgFind?.img}`;
    }

    const handleOnClickLink = (url) => {
        useCustomRoute(dispatch, url);
    }

    const renderURL=(id,slug)=>{
        return `/product-list/${`?gt=${constants.GENDER_ID[id]}&sp=${slug}`}`;
    }
    const renderURL_Child=(id,slug)=>{
        return `/product-list/${`?gt=${constants.GENDER_ID[id]}`}`;
    }
    const Url_Bg=`/images/category/bg-category-child.png`
    const ItemChild=({id,slug,name,dataChild,image,type=''})=>{
        return <div
            className={`group group-hover `}>
            {slug ? <Link
                prefetch={false}
                href={renderURL(id,slug)}
                as={renderURL(id,slug)}>
                <a className='item-title-header-menu-top '>
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
                    <a className='item-title-header-menu-top'>
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
                <div className={`menu-item-sub-wap`}>
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
                                        href={renderURL(id, sub.Slug)}
                                        as={renderURL(id, sub.Slug)}>
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
                                      href={renderURL(id, el.Slug)}
                                      as={renderURL(id, el.Slug)}>
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
                        image={childGroup?.ImageUrl}
                        dataChild={childGroup.ListCategory}
                        id={childGroup.GenderId}
                        slug={childGroup?.Slug}
                        name={childGroup.GenderName} />
                )
            )
        }
        return dataItem?.map(
            (childGroup, indexGroup) => (
                <ItemChild
                    key={indexGroup}
                    image={childGroup.Image}
                    dataChild={childGroup?.CategoriesChild}
                    id={categories[0].GenderId}
                    slug={childGroup.Slug}
                    name={childGroup.Name} />
            )
        )
    }
    const renderImages = () => {
        const categorie = common.data.listCategory.filter(c => c.GenderId == constants.GENDER_SLUG['be-trai']);
        return (
            <div className="" style={{ paddingBottom: 10 }}>
                <div className="row px-0 mx-0 d-flex">
                    <Link href={`/product-list/?gt=${constants.GENDER_ID[categorie[0]?.GenderId]}`}
                        onClick={
                            () => {
                                handleOnClickLink(`/product-list/?gt=${constants.GENDER_ID[categorie[0]?.GenderId]}`)
                            }}
                    >
                        <a className='w-100 h-100'>
                            {props.type == constants.GENDER_SLUG['tre-em'] ?
                                <CustomFrame ratio={722 / 1920}>
                                    <div className={`col-12 px-0 category-img`} style={{ backgroundImage: `url(${getImage("Bé trai")})` }}>
                                        <div className="d-center category-button-gender">
                                            <div className='pointer d-center see-more-gender'>
                        Xem thêm
                                            </div>
                                        </div>
                                    </div>
                                </CustomFrame>
                                :
                                <CustomFrame ratio={722 / 1920}>
                                    <div className={`col-12 px-0 category-img`} style={{ backgroundImage: `url(${getImage(categorie[0]?.GenderName)})` }}>
                                        <div className="d-center category-button-gender">
                                            <div className='pointer d-center see-more-gender'>
                        Xem thêm
                                            </div>
                                        </div>
                                    </div>
                                </CustomFrame>
                            }
                        </a>
                    </Link>
                    {categorie[0]?.ListCategory?.map((cate, index) => (
                        <Link key={index} href={`/product-list/?gt=${constants.GENDER_ID[categorie[0]?.GenderId]}&sp=${cate.Slug}`}
                            onClick={
                                () => {
                                    handleOnClickLink(`/product-list/?gt=${constants.GENDER_ID[categorie[0]?.GenderId]}&sp=${cate.Slug}`)
                                }}
                        >
                            <div className='col-lg-6 col-6 px-0 mx-0'>
                                <CustomFrame ratio={722 / 960}>
                                    <div className={` category-img category-sub`}
                                        style={{ backgroundImage: `url(${getImage(`${categorie[0]?.GenderName  }-${  cate?.Name}`)})`, backgroundSize: 'cover' }}>
                                        <div className='w-100 h-100 background-hover'>

                                        </div>
                                        <div className="d-start" style={{ width: '100%', position: 'absolute', bottom: '6%' }}>
                                            <div className='pointer see-more-category' style={{ fontWeight: 300 }}>
                        Xem thêm &nbsp; <img height="12" src="/images/icon/icon-left-arrow-white.svg" />
                                            </div>
                                        </div>
                                    </div>
                                </CustomFrame>
                            </div>
                        </Link>
                    )
                    )}
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="category-with-type">
                {/* <Header /> */}
                <Display>
                    <div
                        className="d-start menu col-12 px-0 px-lg-3 header-wrap-sub header-wrap-sub-con  pd-lr-common ">
                        <div className="d-flex item-sub-group item-sub-group-scroll">
                            {renderMenu({dataItem:listItem,type:props.type})}
                        </div>
                    </div>
                </Display>
                <ListItemChild
                    dataTopSearch={data.listSearchTop}
                    dataHourGold={data.goldenHourProducts}
                    dataLive={[]}
                    dataNews={data.listNews}
                    dataSale={data.supperSaleProducts}
                    dataTrend={data.trendingProducts}
                    dataProductNews={data.newestProducts}
                    dataPromotion={data.listPromotion}
                    wishlistProducts={wishlistProducts}
                    loading={loading}
                    dataChild={dataChildFake}
                    backgroundTop={Url_Bg} />
                {/* {
          props.type == constants.GENDER_SLUG['tre-em'] ?
          renderImages()
          :
            <div className="" style={{ paddingBottom: 10 }}>
              <div className="row px-0 mx-0 d-flex">
                <Link href={`/product-list/?gt=${constants.GENDER_ID[categories[0]?.GenderId]}`}
                  onClick={
                    () => {
                      handleOnClickLink(`/product-list/?gt=${constants.GENDER_ID[categories[0]?.GenderId]}`)
                    }}
                >
                  <a className='w-100 h-100'>
                    <CustomFrame ratio={722 / 1920}>
                      <div className={`col-12 px-0 category-img`} style={{ backgroundImage: `url(${getImage(categories[0]?.GenderName)})` }}>
                        <div className="d-center category-button-gender">
                          <div className='pointer d-center see-more-gender'>
                            Xem thêm
                          </div>
                        </div>
                      </div>
                    </CustomFrame>
                  </a>
                </Link>
                {categories[0]?.ListCategory?.map((cate, index) => (
                  <Link key={index} href={`/product-list/?gt=${constants.GENDER_ID[categories[0]?.GenderId]}&sp=${cate.Slug}`}
                    onClick={
                      () => {
                        handleOnClickLink(`/product-list/?gt=${constants.GENDER_ID[categories[0]?.GenderId]}&sp=${cate.Slug}`)
                      }}
                  >
                    <div className='col-lg-6 col-6 px-0 mx-0'>
                      <CustomFrame ratio={722 / 960}>
                        <div className={` category-img category-sub`}
                          style={{ backgroundImage: `url(${getImage(categories[0]?.GenderName + "-" + cate?.Name)})`, backgroundSize: 'cover' }}>
                          <div className='w-100 h-100 background-hover'>

                          </div>
                          <div className="d-start" style={{ width: '100%', position: 'absolute', bottom: '6%' }}>
                            <div className='pointer see-more-category' style={{ fontWeight: 300 }}>
                              Xem thêm &nbsp; <img height="12" src="/images/icon/icon-left-arrow-white.svg" />
                            </div>
                          </div>
                        </div>
                      </CustomFrame>
                    </div>
                  </Link>
                )
                )}
              </div>
            </div>
        } */}
            </div>
        </>
    );
};

export default CategoryContainer;


// listItem?.map(
//   (childGroup, indexGroup) => (
//     <div
//       key={indexGroup}
//       className="group group-hover">
//       <Link
//         prefetch={false}
//         href={`/product-list/${`?gt=${constants.GENDER_ID[
//           categories[0].GenderId
//         ]
//           }&sp=${childGroup.Slug
//           }`}`}
//         as={`/product-list/${`?gt=${constants.GENDER_ID[
//           categories[0].GenderId
//         ]
//           }&sp=${childGroup.Slug
//           }`}`}>
//         <a className='item-title-header-menu-top'>
//           <span className="fontsize16">
//             {
//               childGroup.Name
//             }
//           </span>
//         </a>
//       </Link>
//       {childGroup?.CategoriesChild?.length > 0 &&
//         <>
//         <ul className="menu-item-sub">
//           <div className='menu-item-sub-wap'>
//             <div style={{width:'70%'}}>
//               {childGroup.CategoriesChild.map(
//                 (sub, indexSub) => (
//                   <li
//                     key={
//                       indexSub
//                     }
//                     className='item-title-menu'
//                   >
//                     <Link
//                       prefetch={
//                         false
//                       }
//                       href={`/product-list/${`?gt=${constants
//                         .GENDER_ID[
//                         categories[0].GenderId
//                       ]
//                         }&sp=${sub.Slug
//                         }`}`}
//                       as={`/product-list/${`?gt=${constants
//                         .GENDER_ID[
//                         categories[0].GenderId
//                       ]
//                         }&sp=${sub.Slug
//                         }`}`}>
//                       <a className="link-hover fontsize16">
//                         {
//                           sub.Name
//                         }
//                       </a>
//                     </Link>
//                   </li>
//                 ),
//               )}
//             </div>
//             {childGroup.Image && 
//               <div className='content-menu-right'>
//                 <div className='img-menu-right'>
//                   <img alt="" src={childGroup.Image} />
//                 </div>
//               </div>}
//           </div>
//         </ul>
//         <ul className="_overlay_header_menu_new"></ul>
//         </>
//       }
//     </div>
//   ),
// )