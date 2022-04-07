import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../../../public/css/category/category-mobile.module.css";

LeftSide.propTypes = {
    categoryList: PropTypes.array,
    onChangeTab: PropTypes.func,
    activedTab: PropTypes.number,
};

LeftSide.defaultProps = {
    // dump data
    categoryList: [0, 1],
    onChangeTab: null,
    activedTab: 0
};

function LeftSide(props) {
    const { categoryList, onChangeTab, activedTab } = props;

    const onChangeTabIndex = (index) => {
        if (onChangeTab) {
            onChangeTab(index);
        }
    };

    const _renderCategoryItem = (index, item) => {
        return (
            <div
                className={`${styles.left_cate_item} ${
                    index === activedTab ? styles.left_actived_item : ""
                }`}
                onClick={() => {
                    onChangeTabIndex(index);
                }}
            >
                <span>{item?.Name}</span>
            </div>
        );
    };

    return (
        <div className={` ${styles.left_side_wrapper}`}>
            {categoryList.map((item, index) => {
                return <div key={index}>{_renderCategoryItem(index, item)}</div>;
            })}
        </div>
    );
}

export default LeftSide;
