import React from "react";
import PropTypes from "prop-types";
import Display from "@spo/components/common/display";
import styles from "../../../public/css/homepage/updated-hot-categories.module.css";
import Image from "@spo/components/common/image";
import CustomFrame from "@spo/components/common/custom-frame";
import Link from "next/link";
import useWindowSize from "@spo/lib/use-window-size";
import constants from "@spo/config/constants";
import PageList from "../../config/PageList";

HotCategories.propTypes = {};

function HotCategories(props) {
    const { categoryList, title } = props;
    const { width } = useWindowSize();
    const generateLink = (genderId, slug) => {
        let url = PageList.PRODUCT_LIST.SERVER;
        if (genderId) {
            url += `/?gt=${  constants.GENDER_ID[genderId]}`;
        }
        if (slug) {
            url += `&sp=${  slug}`;
        }
        return url;
    };

    const _renderItemDesktopSize = (el) => {
        return (
            <>
                <Link prefetch={false} href={generateLink(el?.GenderId, el?.Slug)}>
                    <a>
                        <CustomFrame ratio={139 / 348}>
                            <Image className="w-100 h-100" lazyLoad={false} src={el?.image} />
                        </CustomFrame>
                    </a>
                </Link>
            </>
        );
    };

    const _renderItemMobileSize = (el) => {
        return (
            <>
                <Link prefetch={false} href={generateLink(el?.GenderId, el?.Slug)}>
                    <a>
                        <CustomFrame ratio={303 / 177}>
                            <Image
                                className="w-100 h-100"
                                lazyLoad={false}
                                src={el?.imageMobile}
                            />
                        </CustomFrame>
                    </a>
                </Link>
            </>
        );
    };

    const _renderDesktopSize = () => {
        return (
            <>
                <div className="col-12 col-lg-12 px-0" style={{ marginBottom: 30 }}>
                    <div className={`${styles.desktop_header_title}`}>{title}</div>
                    <div style={{ padding: "0px 23px 0px 23px" }}>
                        <div className={`d-flex ${styles.line_child}`}>
                            {categoryList.map((el, index) => {
                                if (index >= categoryList.length / 2) {
                                    return;
                                }
                                return (
                                    <div key={index} className={`pointer ${styles.child}`}>
                                        {_renderItemDesktopSize(el)}
                                    </div>
                                );
                            })}
                        </div>
                        <div className={`d-flex ${styles.line_child}`}>
                            {categoryList.map((el, index) => {
                                if (index < categoryList.length / 2) {
                                    return;
                                }
                                return (
                                    <div key={index} className={`pointer ${styles.child}`}>
                                        {_renderItemDesktopSize(el)}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const _renderMobileSize = () => {
        return (
            <>
                <div className="col-12 col-lg-12 px-0" style={{ marginTop: 15 }}>
                    <div
                        style={{
                            color: "#000000",
                            fontWeight: 500,
                            fontSize: 16,
                            textTransform: "uppercase",
                            paddingBottom: 8,
                        }}
                    >
                        {title}
                    </div>
                    <div>
                        <div className={`d-flex ${styles.line_child}`}>
                            {categoryList.map((el, index) => {
                                if (index > 3) {
                                    return;
                                }
                                return (
                                    <div key={index} className={`pointer ${styles.child_mobile}`}>
                                        {_renderItemMobileSize(el)}
                                    </div>
                                );
                            })}
                        </div>
                        <div className={`d-flex pt-2 ${styles.line_child}`}>
                            {categoryList.map((el, index) => {
                                if (index < 4 || index > 7) {
                                    return;
                                }
                                return (
                                    <div key={index} className={`pointer ${styles.child_mobile}`}>
                                        {_renderItemMobileSize(el)}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return <>{width <= 576 ? _renderMobileSize() : _renderDesktopSize()}</>;
}

export default HotCategories;
