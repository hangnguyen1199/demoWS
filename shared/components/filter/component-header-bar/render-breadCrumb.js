import React from 'react'
import constants from '@spo/config/constants';
import Link from 'next/link';
import {
    getCategoryName,
    getCategoryNameMaster,
    renderBreadcrumb,
    renderHrefRenderName
} from './help'
import PropTypes from 'prop-types';
import PageList from './../../../config/PageList';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function RenderBreadCrumb(props) {
    const {
        breadcrumbPage
    } = props;
    const router = useRouter();
    const handleCategoryEmpty = () => {
        let params = { ...router.query };
        delete params[constants.ROUTER_NAME.CATEGORY];
        delete params[constants.ROUTER_NAME.GENDER];
        delete params[constants.ROUTER_NAME.SIZE];
        delete params[constants.ROUTER_NAME.PROMOTION];
        delete params[constants.ROUTER_NAME.SORT_BY_PRICE];
        delete params[constants.ROUTER_NAME.PRICE_FROM];
        delete params[constants.ROUTER_NAME.PRICE_TO];
        params[constants.ROUTER_NAME.PAGE]=1;
        router.replace({
            query: params
        })
    }
    let common = useSelector(state => state.Common)
    let genderId = router.query[constants.ROUTER_NAME.GENDER];
    let path_name = router.pathname;

    const GetCategory = () => {
        let params = {};

        params[constants.ROUTER_NAME.PAGE] = 1;
        if (genderId) {
            params[constants.ROUTER_NAME.GENDER] = genderId;
        }
        let category = router.query[constants.ROUTER_NAME.CATEGORY];

        if (category) {
            const index = common.data.listCategoryMasterAll.find(v => v.Id == category.split(',')[0]);
            let tmpArr = {};
            if (index?.ParentId) {
                tmpArr = common.data.listCategories?.find(el => {
                    return el.Id == index?.ParentId
                });
            } else {
                tmpArr['Id'] = index?.Id
            }
            params[constants.ROUTER_NAME.CATEGORY] = tmpArr?.Id;
            return <Link href={
                {
                    pathname: PageList.PRODUCT_LIST.SERVER,
                    query: params
                }
            }>
                <p style={{ textTransform: 'capitalize' }} className='title-breadcum'>
                    {router.query[constants.ROUTER_NAME.GENDER] && <span className='title-breadcum-line'>|</span>}
                    {getCategoryNameMaster(tmpArr?.Id, common)}
                </p>
            </Link>
        }
    }

    const renderGenderChild=()=>{
        return (
            <Link
                href={{
                    pathname: `${PageList.CATEGORY.INDEX}${constants.GENDER_ID[constants.GENDER_SLUG['tre-em']]}`,
                }}
            >
                <p
                    style={{ textTransform: 'capitalize' }}
                    className="title-breadcum"
                >
                    TRẺ EM
                    <span className='title-breadcum-line pr-0 mr-0 pl-2'>|</span>
                </p>
            </Link>
        )
    }
    return (
        <>
            {
                renderBreadcrumb(breadcrumbPage, handleCategoryEmpty)
            }
            {/* {
            } */}
            {/* {
                (router.query[constants.ROUTER_NAME.GENDER] == constants.GENDER_SLUG['be-gai'] ||
                router.query[constants.ROUTER_NAME.GENDER] == constants.GENDER_SLUG['be-trai'] ) &&
                props.typeCategory != constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST
                    ?
                    renderGenderChild() : <></>
            }
            {
                genderId ?
                    renderHrefRenderName(genderId, common, path_name, handleCategoryEmpty)
                    :
                    <></>
            }
            {
                props.typeCategory == constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST_CATEGORY
                    ? GetCategory() : <></>
            } */}
        </>
    )
}


RenderBreadCrumb.propsType = {
    breadcrumbPage: PropTypes.shape()
}

export default RenderBreadCrumb;