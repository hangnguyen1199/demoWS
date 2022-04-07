import React from 'react'
import constants from '@spo/config/constants';
import Link from 'next/link';
import {
    getCategoryName,
    getCategoryNameMaster,
    renderBreadcrumb,
    renderHrefRenderName
} from './help'
import PageList from './../../../config/PageList';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function RenderBreadCrumbMobile(props) {
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
        router.replace({
            query: params
        })

        if(props.handleCloseModal){
            props.handleCloseModal();
        }
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
                <p onClick={() =>  props.handleCloseModal && props.handleCloseModal()} style={{ textTransform: 'capitalize' }} className='title-breadcum breadcrumb-item pointer '>
                    {router.query[constants.ROUTER_NAME.GENDER] && <span className='title-breadcum-line'>|</span>}
                    {getCategoryNameMaster(tmpArr?.Id, common)}
                </p>
            </Link>
        }
    }
    return (
        <>
            <div style={{ paddingRight: 15 }} className='d-flex breadcrumb  d-start pd-lr-common align-items-start'>
                {
                    renderBreadcrumb(breadcrumbPage, handleCategoryEmpty)
                }
                {/* {
                    genderId ?
                        renderHrefRenderName(genderId, common, path_name, handleCategoryEmpty)
                        :
                        <></>
                }
                {
                    props.typeCategory == constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST_CATEGORY
                        ? GetCategory() : <></>
                } */}
            </div>
        </>
    )
}
