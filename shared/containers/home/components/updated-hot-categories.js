import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Display from "@spo/components/common/display";
import styles from "../../../../public/css/homepage/updated-hot-categories.module.css";
import Slider from 'react-slick';
import Image from "@spo/components/common/image";
import CustomFrame from "@spo/components/common/custom-frame";
import Link from "next/link";
import useWindowSize from "@spo/lib/use-window-size";
import constants from "@spo/config/constants";
import CustomSlideChild from '../../../components/category/item-slide-child';
import { useRouter } from 'next/router';
import PageList from "../../../config/PageList";
import { useSelector } from "react-redux";
import { getNameCategoryCommon } from './../../../components/filter/component-header-bar/help';
import CategoryLoader from "./loader/category-loader";

UpdatedHotCategories.propTypes = {};

function UpdatedHotCategories (props) {
    const { width } = useWindowSize();
    const router =useRouter()
    const common=useSelector(state=>state.Common)
    const NUM_OF_ITEM_IN_ROW = width <= constants.WINDOW_SIZE.MEDIUM ? 4 : 5;
    const GAP = 40;
    const SPACE_ALL = (NUM_OF_ITEM_IN_ROW - 1) * GAP;
    const { categoryList = [], title, NumOfRow = 2, isChild = false,loading, categorySubList = [] } = props;
    const [list, setlist] = useState([])

    // const generateLink = (genderId, slug) => {
    // 	let url = "/product-list";
    // 	if (genderId) {
    // 		url += `/?gt=${constants.GENDER_ID[genderId]}`;
    // 	}
    // 	if (slug) {
    // 		url += `&sp=${slug}`;
    // 	}
    // 	return url;
    // };
    useEffect(() => {
        if (categoryList.length > 0) {
            let _data = [...categoryList];

            if (_data.length < NUM_OF_ITEM_IN_ROW * NumOfRow) {
                for (
                    let i = 0;
                    i < NUM_OF_ITEM_IN_ROW * NumOfRow - categoryList.length;
                    i++
                ) {
                    _data.push({ type: 'empty' });
                }
            }
            setlist(_data);
        }
        
    }, [categoryList])

    const handleClick = (e, value) => {
        e.preventDefault()
        e.stopPropagation()
        let param = {}
        if (value?.GenderId) {
            param[constants.ROUTER_NAME.GENDER]= value?.GenderId
        }
        if (value?.CategoryId) {
            param[constants.ROUTER_NAME.CATEGORY]= value?.CategoryId;
        }
        if (value?.SizeId) {
            param[constants.ROUTER_NAME.SIZE]= value?.SizeId;
        }
        // param[constants.ROUTER_NAME.HOT_CATEGORY]=constants.TYPE_CATEGORY_HOME['Type'];
        router.push({
            pathname: PageList.PRODUCT_LIST.SERVER,
            query: param
        })
    }
    const generateLink = (value) => {
        let param = {}
        if (value?.GenderId) {
            param[constants.ROUTER_NAME.GENDER]= value?.GenderId
        }
        if (value?.CategoryId) {
            param[constants.ROUTER_NAME.CATEGORY]= value?.CategoryId;
        }
        if (value?.SizeId) {
            param[constants.ROUTER_NAME.SIZE]= value?.SizeId;
        }

        // param[constants.ROUTER_NAME.HOT_CATEGORY]=constants.TYPE_CATEGORY_HOME['Type'];
        return {
            pathname: PageList.PRODUCT_LIST.SERVER,
            query: param
        }
    };


    const _renderItemDesktopSize = (el) => {
        return (
            <>
                <Link prefetch={false} href={generateLink(el)}>
                    <a onClick={(e)=>handleClick(e,el)}>
                        {/* <CustomFrame ratio={139 / 348}>
                            <Image className="w-100 h-100" lazyLoad={false} src={el?.WebImage} />
                        </CustomFrame> */}
                        <Image className="w-100 h-100" lazyLoad={false} src={el?.WebImage} />
                    </a>
                </Link>
            </>
        );
    };

    const _renderItemMobileSize = (el) => {
        return (
            <>
                <Link prefetch={false} href={generateLink(el)}>
                    <a onClick={(e)=>handleClick(e,el)}>
                        {/* <CustomFrame ratio={250 / 177}>
                        </CustomFrame> */}
                        <div style={{'padding': 10}}>
                            <Image
                                className="w-100 h-100"
                                lazyLoad={false}
                                src={el?.MobileImage}                                                                
                            />
                        </div>
                    </a>
                </Link>
            </>
        );
    };
    const eleParent = useRef(null)
    const [widthParent, setWidthParent] = useState(0)
    useEffect(() => {
        if (eleParent?.current?.offsetWidth) {
            setWidthParent(eleParent.current.offsetWidth)
        }
    }, [eleParent?.current?.offsetWidth])

    const _renderDesktopSize = () => {
        // return (
        //     <div className="col-12 col-lg-12 px-0" style={{ marginBottom: 30 }}>
        //         <div className={`${styles.desktop_header_title}`}>{title}</div>
        //         {isChild ? (
        //             <Display>
        //                 <div className={`${styles.sub_category_container}`}>
        //                     <CustomSlideChild items={categorySubList} />
        //                 </div>
        //             </Display>
        //         ) : (
        //             <div
        //                 className={` d-flex flex-wrap ${styles.line_child} ${styles.wrap_category}`}
        //                 ref={eleParent}
        //             >
        //                 {loading ? (
        //                     <CategoryLoader />
        //                 ) : (
        //                     list.map((el, index) => {
        //                         if (index >= NUM_OF_ITEM_IN_ROW * NumOfRow) {
        //                             return;
        //                         }
        //                         return (
        //                             <div
        //                                 key={index}
        //                                 className={`pointer ${styles.child}`}
        //                                 style={{
        //                                     width:
        //                                         (widthParent - SPACE_ALL) /
        //                                         NUM_OF_ITEM_IN_ROW,
        //                                 }}
        //                             >
        //                                 {el?.type != 'empty' &&
        //                                     _renderItemDesktopSize(el)}
        //                             </div>
        //                         );
        //                     })
        //                 )}
        //             </div>
        //         )}
        //     </div>
        // );
        return (
            <div className="col-12 col-lg-12 px-0" style={{ marginBottom: 30 }}>
                <div className={`${styles.desktop_header_title}`}>{title}</div>
                {isChild ? (
                    <Display>
                        <div className={`${styles.sub_category_container}`}>
                            <CustomSlideChild items={categorySubList} />
                        </div>
                    </Display>
                ) : (
                    <div
                        className={` d-flex flex-wrap ${styles.line_child} ${styles.wrap_category}`}
                        ref={eleParent}
                    >
                        {loading ? (
                            <CategoryLoader />
                        ) : (
                            list.map((el, index) => {
                                if (index >= NUM_OF_ITEM_IN_ROW * NumOfRow) {
                                    return;
                                }
                                return (
                                    <div
                                        key={index}
                                        className={`pointer ${styles.child}`}
                                        style={{
                                            width:
                                                (widthParent - SPACE_ALL) /
                                                NUM_OF_ITEM_IN_ROW,
                                        }}
                                    >
                                        {el?.type != 'empty' &&
                                            _renderItemDesktopSize(el)}
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        );
    };
    const _renderMobileSize = () => {
        return (
            <>
                <div className="col-12 col-lg-12 px-0" style={{ marginTop: 15 }}>
                    <div
                        style={{
                            color: "#000000",
                            fontWeight: 'var(--fontMedium)',
                            fontSize: 16,
                            textTransform: "uppercase",
                            marginBottom: 15,
                            paddingTop: 15,
                        }}
                    >
                        {title}
                    </div>
                    <div>
                        {
                            isChild && <div className={`${styles.sub_category_container}`} style={{marginBottom:15, marginTop: 15}}>
                                <CustomSlideChild NumItemInRow={3} items={categorySubList} />
                            </div>
                        }
                    </div>
                    <div>
                        {loading ? (
                            <CategoryLoader/>
                        ) : (
                            <div className={`${styles.line_child} ${styles.wrap_category_mobile} dots-categories`} ref={eleParent}>
                                <Slider {...props.settings}>
                                    {list.map((el, index) => {
                                        if (index >= NUM_OF_ITEM_IN_ROW * NumOfRow) {
                                            return
                                        }
                                        return (
                                            <div key={index} className={`pointer ${styles.child_mobile}`}>
                                                {el?.type != 'empty' && _renderItemMobileSize(el)}
                                            </div>
                                        );
                                    })}
                                </Slider>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    };

    return <div className={`${styles.update_hot_categories}`}>{width <= constants.WINDOW_SIZE.MEDIUM ? _renderMobileSize() : _renderDesktopSize()}</div>;
}

export default UpdatedHotCategories;
