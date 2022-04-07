import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LeftSide from './components/left-side';
import RightSide from './components/right-side';
import styles from '../../../public/css/category/category-mobile.module.css';
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import constants from "@spo/config/constants";


CategoryMobileContainer.propTypes = {
    genderId: PropTypes.number,
    tabIndex: PropTypes.number,
};

CategoryMobileContainer.defaultProps = {
    genderId: 1,
    tabIndex: 0,
};

function CategoryMobileContainer (props) {

    const { genderId, tabIndex } = props;
    const router = useRouter();
    const common = useSelector((state) => state.Common);
    const [rightSideData, setRightSideData] = useState([]);
    const [leftSideData, setLeftSideData] = useState([]);
    const [activedTab, setActivedTab] = useState(0);
    const [categoryParent, setCategoryParent] = useState({});

    useEffect(() => {
        let cateData = common.data.listCategory.find(el => el.GenderId == genderId);
        //
        if (cateData === undefined) {
            // dump code start
            if (genderId === 99) {
                const boyCate = common.data.listCategory.find(el => el.GenderId == constants.GENDER_SLUG['be-trai']);
                const girlCate = common.data.listCategory.find(el => el.GenderId == constants.GENDER_SLUG['be-gai']);
                //
                if (boyCate === undefined || girlCate === undefined) {
                    return;
                }
                const mergedCate = [...boyCate?.ListCategory];
                girlCate?.ListCategory.forEach(element => {
                    const id = element?.Id;
                    //
                    const duplicatedCateIndex = mergedCate.findIndex(el => el.Id === id);
                    if (duplicatedCateIndex === -1) {
                        mergedCate.push(element);
                        mergedCate[mergedCate.length - 1]['CategoriesChild2'] = element?.CategoriesChild;
                    } else {
                        mergedCate[duplicatedCateIndex]['CategoriesChild2'] = element?.CategoriesChild;
                    }
                });
                //
                cateData = common.data.listCategory.find(el => el.GenderId == constants.GENDER_SLUG['be-trai']);
                cateData.ListCategory = [...mergedCate];
                // dump code end
            } else {
                cateData = common.data.listCategory[0];
            }
        }
        //
        setLeftSideData(cateData?.ListCategory);
        //
        if (tabIndex && tabIndex < cateData?.ListCategory.length) {
            setActivedTab(tabIndex);
            // setRightSideData(cateData?.ListCategory[tabIndex]?.CategoriesChild);
            setRightSideData(cateData?.ListCategory[tabIndex]);
            setCategoryParent(cateData?.ListCategory[tabIndex]);
        } else {
            setActivedTab(0);
            // setRightSideData(cateData?.ListCategory[0]?.CategoriesChild);
            setRightSideData(cateData?.ListCategory[0]);
            setCategoryParent(cateData?.ListCategory[0]);
        }
    }, [genderId, common.data.listCategory, tabIndex]);


    const onChangeTab = (tabIndex) => {
        let query = { ...router.query };
        delete router.query.paramName;
        router.replace(
            {
                // pathname: router.pathname,
                query: {
                    ...query,
                    tab: tabIndex,
                },
            },
            undefined,
            { shallow: true }
        );
    }
    return (
        <div className={` ${styles.category_mobile_wrapper}`}>
            <LeftSide categoryList={leftSideData} activedTab={activedTab} onChangeTab={onChangeTab} />
            <RightSide categoryList={rightSideData} genderId={genderId} categoryParent={categoryParent} />
        </div>
    );
}

export default CategoryMobileContainer;