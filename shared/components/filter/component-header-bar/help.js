import _ from "lodash";
import Link from 'next/link';
import constants from '@spo/config/constants';
import PageList from './../../../config/PageList';
import { GENDER } from "../../../config/constants";
import { useRouter } from 'next/router';

export default function checkExits(list, id) {
    if (list) {
        if (typeof list[0] === 'number') {
            return list.indexOf(Number.parseInt(id));
        }
        return list.indexOf((id).toString());
    }
}
export function checkExitsArray(list, id) {
    if (list) {
        let index = list.findIndex(v => v == id);
        return index;
    }
}

export const renderBreadcrumb = (data = [], handleCategoryEmpty) => {
    const onCategoryEmpty = () => {
        handleCategoryEmpty()
    }
    if (data.length > 0) {
        return (
            <div className="breadCrumb-filter-left" style={{ padding: '0px var(--paddingScreen) 15px var(--paddingScreen)' }}>
                <div className="breadCum-filter-left title-breadcum d-flex">
                    {data.map((item, key) => {
                        return (
                            <Link
                                href={{
                                    pathname: item.path_name,
                                }}
                                key={key}
                            >
                                <p
                                    onClick={onCategoryEmpty}
                                    key={key}
                                    className="title-breadcum"
                                >
                                    {key > 0 && (
                                        <span className="title-breadcum-line breadcrumb-item pointer ">
                                            |
                                        </span>
                                    )}
                                    {item.name}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        )
    }
}

export function getCategoryName(id, common) {
    let mainArr = common.data.listCategories;
    let allChild = [];
    mainArr.forEach(chil => {
        allChild = allChild.concat(chil.CategoriesChild);
    });
    let cateAll = _.find(mainArr, function (e) {
        return e?.Id == id
    });
    if (cateAll) {
        return cateAll?.Name;
    } else {
        let cate = _.find(allChild, function (c) {
            return c?.Id == id;
        });
        if(cate){
            return cate?.Name;
        }else{
            return false
        }
    }

}

export function getCategoryNameMaster(id, common) {
    let item = common.data.listCategoryMasterAll.find(v => v.Id == id);
    if (item) {
        return item?.Name;
    }

}

export function getSizeName(id, common) {
    let size = _.find(common.data.listSize, function (size) {
        return size?.Id == id;
    });
    return size?.Name;
}

export function getGenderName(id, common) {
    let gender = _.find(common.data.listCategory, function (gender) {
        return gender?.GenderId == id;
    });
    return gender?.GenderName;
}


const ArrayPathName = [
    {
        id: PageList.PRODUCT_LIST_TOP.DESTINATION,
        value: '/tim-kiem-hang-dau'
    },
    {
        id: PageList.PRODUCT_LIST_NEW.DESTINATION,
        value: '/san-pham-moi'
    }
    ,
    {
        id: PageList.PRODUCT_LIST_TREND.DESTINATION,
        value: '/xu-huong'
    },
    {
        id: PageList.SUPPER_SALE.DESTINATION,
        value: '/sieu-sale'
    },
    {
        id: PageList.HOUR_GOLD.DESTINATION,
        value: '/gio-vang'
    }
]


export const renderHrefRenderName = (id, common, path_Router, handleCategoryEmpty) => {
    const onCategoryEmpty = () => {
    // handleCategoryEmpty()
    }
    let params = {}
    params[constants.ROUTER_NAME.GENDER] = id;
    params[constants.ROUTER_NAME.PAGE] = 1;
    let renderHref = null;
    const router=useRouter()
    if (ArrayPathName.findIndex(v => v.id == path_Router) != -1) {
        if(id == GENDER.Child.Id){
            renderHref = <>
                <span className='title-breadcum-line'>|</span>
                <Link href={{
                    pathname: ArrayPathName.find(v => v.id == path_Router)?.value,
                    query: params
                }}>
                    <p onClick={onCategoryEmpty} className='title-breadcum '>{GENDER.Child.Title}</p>
                </Link>
            </>
        }else{
            renderHref = <>
                <span className='title-breadcum-line'>|</span>
                <Link href={{
                    pathname: ArrayPathName.find(v => v.id == path_Router)?.value,
                    query: params
                }}>
                    <p onClick={onCategoryEmpty} className='title-breadcum '>{getGenderName(id, common)}</p>
                </Link>
            </>
        }
    }
    else if (id == constants.GENDER_SLUG['tre-em']) {
        let p1={};
        p1[constants.ROUTER_NAME.GENDER]=router.query[constants.ROUTER_NAME.GENDER];
        p1[constants.ROUTER_NAME.PAGE]=1
        renderHref = <>
            <Link href={{
                pathname:`${PageList.PRODUCT_LIST.SERVER}`,
                query:p1
            }}>
                <p onClick={onCategoryEmpty} className='title-breadcum '>{GENDER.Child.Title}</p>
            </Link></>
    }
    else if (id == constants.GENDER_SLUG['be-trai'] || id == constants.GENDER_SLUG['be-gai']) {
        let p2={};
        p2[constants.ROUTER_NAME.GENDER]=router.query[constants.ROUTER_NAME.GENDER];
        p2[constants.ROUTER_NAME.PAGE]=1
        renderHref = <>
            <Link href={{
                pathname:`${PageList.PRODUCT_LIST.SERVER}`,
                query:p2
            }}>
                <p onClick={onCategoryEmpty} className='title-breadcum '>{getGenderName(id, common)}</p>
            </Link></>
    } else {
        renderHref = <>
            <Link href={`${PageList.CATEGORY.INDEX}${constants.GENDER_ID[id]}`}>
                <p onClick={onCategoryEmpty} className='title-breadcum '>{getGenderName(id, common)}</p>
            </Link></>
    }
    return renderHref;

}


export const getNameCategoryCommon = (common, slug) => {
    let sub;
    common.data.listCategory.forEach((gender) => {
        gender.ListCategory.forEach((cate) => {
            if (cate.Slug == slug) {
                sub = cate;
            }
            let category = cate.CategoriesChild.filter(
                (c) => c.Slug == slug,
            );
            if (category.length > 0) {
                sub = category[0];
            }
        });
    });
    return sub;
}