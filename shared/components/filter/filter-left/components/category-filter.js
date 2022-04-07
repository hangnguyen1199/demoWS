import React, { useEffect, useState } from 'react';
import IconChevronDown from '../../../common/icon-chevron-down';
import IconChevronUp from '@spo/components/common/icon-chevron-up';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import constants from './../../../../config/constants';
import CommonActions from '@spo/redux/common/action';
import AccordinCategory from './accordin-category';
import EventRegister, { DELETE_DATA_FILTER } from '../../../../utils/EventRegister';
import IconFeatherPlus from '../../../common/icon-feather-plus';
import IconFeatherPlusShow from '../../../common/icon-feather-plus-show';

function CategoryFilter(props) {
    const [open, setOpen] = useState(true);
    const router = useRouter();
    const { typeCategory } = props;
    const dispatch = useDispatch();
    const common = useSelector((state) => state.Common);
    const [categoriesState, setCategoriesState] = useState([]);

    useEffect(() => {
        let cate =
            router.query[constants.ROUTER_NAME.CATEGORY]?.split(',') ?? [];
        let newList = common.data.listCategories.map((parent) => {
            if (cate.findIndex((x) => x == parent.Id) != -1) {
                parent.checked = true;
            } else {
                parent.checked = false;
            }
            if (parent.checked) {
                parent.CategoriesChild = parent?.CategoriesChild.map(
                    (child) => {
                        child.checked = true;
                        return child;
                    }
                );
            } else {
                parent.CategoriesChild = parent?.CategoriesChild.map(
                    (child) => {
                        if (cate.findIndex((x) => x == child.Id) != -1) {
                            child.checked = true;
                        } else {
                            child.checked = false;
                        }
                        return child;
                    }
                );
            }
            return parent;
        });
        setCategoriesState(newList);
    }, [
        common.data.listCategories,
        router.query[constants.ROUTER_NAME.CATEGORY],
    ]);
    useEffect(() => {
        let newArr = [];
        categoriesState.map((parent) => {
            if (parent?.checked) {
                newArr.push(parent?.Id);
            }
            parent?.CategoriesChild.map((child) => {
                if (child?.checked) {
                    newArr.push(child?.Id);
                }
                return child;
            });
            return parent;
        });
        props?.onChange && props?.onChange(newArr);
    }, [categoriesState]);

    useEffect(() => {
        dispatch({
            type: CommonActions.LOAD_CATEGORY_MASTER_BY_GENDER,
            data: { Gender: router.query[constants.ROUTER_NAME.GENDER] },
        });
    }, [router.query[constants.ROUTER_NAME.GENDER]]);
    const handleClickAccordion = () => {
        setOpen(!open);
    };
    const handleCheckCategory = (item, indexParent) => {
        if (indexParent != null) {
            let newList = [...categoriesState];
            let indexChild = newList[indexParent]?.CategoriesChild.findIndex(
                (x) => x.Id == item.Id
            );
            newList[indexParent].CategoriesChild[indexChild] = {
                ...newList[indexParent].CategoriesChild[indexChild],
                checked: newList[indexParent].CategoriesChild[indexChild]
                    ?.checked
                    ? false
                    : true,
            };
            let checkedNum = newList[indexParent].CategoriesChild.reduce(
                (t, e) => {
                    if (e?.checked) {
                        t++;
                    }
                    return t;
                },
                0
            );
            if (checkedNum == newList[indexParent].CategoriesChild.length) {
                newList[indexParent].checked = true;
            } else {
                newList[indexParent].checked = false;
            }
            setCategoriesState(newList);
        } else {
            let newList = [...categoriesState];
            let index = newList.findIndex((x) => x.Id == item.Id);
            let parentChecked = newList[index]?.checked ? false : true;
            newList[index] = { ...newList[index], checked: parentChecked };
            newList[index].CategoriesChild = newList[index].CategoriesChild.map(
                (child) => {
                    return { ...child, checked: parentChecked };
                }
            );
            setCategoriesState(newList);
        }
    };

    useEffect(() => {
        let reloadEvent= EventRegister.on(DELETE_DATA_FILTER, () => {
            let newList = common.data.listCategories.map((parent) => {
                parent.checked = false;
                parent.CategoriesChild = parent?.CategoriesChild.map(
                    (child) => {
                        child.checked = false;
                        return child;
                    }
                );
                return parent;
            });
            setCategoriesState(newList);
        });
        return () => {
            EventRegister.off(reloadEvent);
        };
    }, [common.data.listCategories]);

    return (
        <div className={`accordion-filter ${props.className}`}>
            <div
                onClick={handleClickAccordion}
                className="accordion-filter-title"
            >
                <p>Danh mục</p>
                <span>{open ? <IconFeatherPlus /> : <IconFeatherPlusShow />}</span>
            </div>
            <div
                className={`accordion-filter-main accordion-filter-main-details ${
                    open ? 'active' : ''
                }`}
            >
                <div className="accordion-filter-main-up mb-0 pb-0">
                    {categoriesState.map((childGroup, indexGroup) => (
                        <AccordinCategory
                            key={indexGroup}
                            handleCheckCategory={handleCheckCategory}
                            childGroup={childGroup}
                            indexGroup={indexGroup}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
CategoryFilter.propsType = {};
export default CategoryFilter;
