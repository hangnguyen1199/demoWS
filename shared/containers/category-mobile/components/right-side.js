import React from "react";
import PropTypes from "prop-types";
import styles from "../../../../public/css/category/category-mobile.module.css";
import Image from "@spo/components/common/image";
import CustomFrame from "@spo/components/common/custom-frame";
import Link from "next/link";
import constants from "@spo/config/constants";
import { useRouter } from "next/router";
import PageList from "../../../config/PageList";

RightSide.propTypes = {};

RightSide.propTypes = {
    genderId: PropTypes.number,
    categoryList: PropTypes.object,
    categoryParent: PropTypes.object,
};

RightSide.defaultProps = {
    genderId: 1,
    // dump data
    // categoryList: [0, 1, 2, 3, 4],
    categoryList: {},
    categoryParent: {},
};

function RightSide(props) {
    const demoImageLink = "/images/icon/category/icon_category.jpeg";
    const { categoryList, genderId, categoryParent } = props;

    const dump_girl_text = "Bé Gái";
    const dump_boy_text = "Bé Trai";

    const viewAll = {
        Name: "Xem tất cả",
        Image: categoryParent?.Image || demoImageLink,
    };

    const router = useRouter();

    const generateLink = (item = null, titleCategory = "") => {
        const url = "/";
        let gt = genderId;
        // dump code start
        if (genderId === constants.GENDER_SLUG["tre-em"]) {
            if (titleCategory == dump_girl_text) {
                gt = constants.GENDER_SLUG['be-gai'];
            } else {
                gt = constants.GENDER_SLUG['be-trai'];
            }
        }
        // dump code end
        try {
            if (item.Slug) {
                return `${PageList.PRODUCT_LIST.SERVER}?${constants.ROUTER_NAME.GENDER}=${gt}&${constants.ROUTER_NAME.CATEGORY}=${item.Id}`;
            }
            if (categoryParent) {
                return `${PageList.PRODUCT_LIST.SERVER}?${constants.ROUTER_NAME.GENDER}=${gt}&${constants.ROUTER_NAME.CATEGORY}=${categoryParent?.Id}`;
            }
            return `${PageList.PRODUCT_LIST.SERVER}?${constants.ROUTER_NAME.GENDER}=${gt}`;
        } catch {
            return url;
        }
    };

    const _renderCategoryItem = (item, titleCategory = "") => {
        return (
            <div className={`d-flex flex-column ${styles.right_cate_child}`}>
                <Link
                    prefetch={false}
                    href={generateLink(item, titleCategory)}
                    as={generateLink(item, titleCategory)}
                >
                    <a>
                        <div>
                            <CustomFrame ratio={4 / 3}>
                                <Image
                                    className="w-100 h-100"
                                    lazyLoad={false}
                                    src={item?.Image || demoImageLink}
                                />
                            </CustomFrame>
                        </div>
                        <div className={`${styles.right_cate_child_title}`}>
                            {item?.Name}
                        </div>
                    </a>
                </Link>
            </div>
        );
    };

    const _renderCategorySection = (categoryChild, titleCategory = "") => {
        return (
            <div
                className={`d-flex flex-column ${styles.right_side_section_wrapper}`}
            >
                {titleCategory && (
                    <div className={`${styles.right_side_section_header}`}>
                        {titleCategory}
                    </div>
                )}
                <div className={`${styles.right_side_section_content}`}>
                    <div className={` ${styles.right_group}`}>
                        {_renderCategoryItem(viewAll, titleCategory)}
                    </div>
                    {categoryChild &&
            categoryChild.map((item, index) => {
                return (
                    <div key={index} className={` ${styles.right_group}`}>
                        {_renderCategoryItem(item, titleCategory)}
                    </div>
                );
            })}
                </div>
            </div>
        );
    };

    // this code prepare for update category
    // const _renderCategorySection2 = (element) => {
    //   return (
    //     <>
    //       {element.Name && (
    //         <div className={`${styles.right_side_section_header}`}>
    //           {element.Name}
    //         </div>
    //       )}

    //       <div className={`${styles.right_side_section_content}`}>
    //         <div className={` ${styles.right_group}`}>
    //           {_renderCategoryItem(viewAll)}
    //         </div>
    //         {element?.categoryChild?.length > 0 &&
    //           element.categoryChild.map((item, index) => {
    //             return (
    //               <div key={index} className={` ${styles.right_group}`}>
    //                 {_renderCategoryItem(item)}
    //               </div>
    //             );
    //           })}
    //       </div>
    //     </>
    //   );
    // };
    return (
        <div
            className={`d-flex flex-column ${styles.right_side_wrapper}`}
            style={{ marginTop: 15 }}
        >
            {_renderCategorySection(
                categoryList?.CategoriesChild,
                router.query?.slug == 99 ? dump_boy_text : ""
            )}
            {categoryList?.CategoriesChild2?.length > 0 &&
        _renderCategorySection(
            categoryList?.CategoriesChild2,
            router.query?.slug == 99 ? dump_girl_text : ""
        )}

            {/* this code prepare for update category */}
            {/* {categoryList?.length > 0 &&
        categoryList.map((el, index) => {
          return (
            <div
              key={index}
              className={`d-flex flex-column ${styles.right_side_section_wrapper}`}
            >
              {_renderCategorySection(el)}
            </div>
          );
        })} */}
        </div>
    );
}


export default RightSide;
