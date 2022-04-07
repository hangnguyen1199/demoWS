import React, { useRef } from 'react';
import { scrollToRef } from '../../../library/helper';
import IconRowLeftFill from '../../common/icon-row-left-fill';
import IconArrowRightFill from '../../common/icon-row-right-fill';
import SortPriceFilter from './components/sort-price-filter';
import constants from '@spo/config/constants';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import RenderDataFilters from './../component-header-bar/render-data-filter';
import Display from '@spo/components/common/display';

export default function RenderDataFilter(props) {
    const ref = useRef(null);
    const router = useRouter();
    const ref_hidden = useRef(null);
    const handleRemoveAll = () => {
        let params = { ...router.query };
        // none delete gender
        // delete params[constants.ROUTER_NAME.GENDER]
        delete params[constants.ROUTER_NAME.CATEGORY]
        delete params[constants.ROUTER_NAME.SIZE]
        delete params[constants.ROUTER_NAME.PROMOTION]
        delete params[constants.ROUTER_NAME.PRICE_FROM]
        delete params[constants.ROUTER_NAME.PRICE_TO]
        delete params[constants.ROUTER_NAME.SORT_BY_PRICE]
        // params[constants.ROUTER_NAME.HOT_CATEGORY]=constants.TYPE_CATEGORY_HOME['Type']
        params[constants.ROUTER_NAME.PAGE]=1;
        router.replace({
            query: params

        })
    };
    const common = useSelector((state) => state.Common);
    const checkShowDataFilter = () => {
        let cate = common.data.listCategoryMasterAll.find(
            (v) =>
                v.Id ==
                router.query[constants.ROUTER_NAME.CATEGORY].split(',')[0]
        );
        if (cate?.ParentId) {
            return true;
        } else {
            return false;
        }
    };

    const checkRenderDataCategory=()=>{
        let data=[];
        router.query[constants.ROUTER_NAME.CATEGORY]?.split(',')?.map((x)=>{
            let cate=common.data.listCategoryMasterAll.find(v=>v.Id == x);
            if(cate?.ParentId){
                data.push(x);
            }
            return x;
        })

        return data;
    }
    return (
        <Display>
            <div className="w-100 d-flex flex-row align-items-center justify-content-between">
                <div className="filter-show-item filter-show-item-new  mt-3">
                    {
                        router.query[constants.ROUTER_NAME.CATEGORY] &&
                        checkRenderDataCategory().length > 0 ||
                        router.query[constants.ROUTER_NAME.PRICE_FROM] ||
                        router.query[constants.ROUTER_NAME.PRICE_TO] ||
                        (router.query[constants.ROUTER_NAME.PROMOTION] &&
                            router.query[constants.ROUTER_NAME.PROMOTION].split(',').length > 0) ||
                        (router.query[constants.ROUTER_NAME.SIZE] &&
                            router.query[constants.ROUTER_NAME.SIZE].split(',').length > 0)
                            ?
                            <>
                                <span onClick={() => scrollToRef(-400, ref)}>
                                    <IconRowLeftFill />
                                </span>
                                <div
                                    style={{ overflow: 'hidden' }}
                                    className="w-100 px-3 flex-grow"
                                >
                                    <div
                                        ref={ref}
                                        className="w-100 px-1 d-flex flex-row align-items-start filter-show-item-scroll flex-grow"
                                    >
                                        <RenderDataFilters />
                                    </div>
                                </div>
                                <span onClick={() => scrollToRef(400, ref)}>
                                    <IconArrowRightFill fontSize={14} />
                                </span>
                                <ul onClick={handleRemoveAll} className="text-rename ml-3">
                                Xoá tất cả
                                </ul>
                            </>
                            :
                            <></>
                    }
                </div>
                <div
                    style={{width:'20%',minWidth: 300}}
                    className="d-flex flex-row justify-content-between align-items-center mt-3"
                >
                    <p className="pb-0 mb-0 text-sort-filter">Sắp xếp theo:</p>
                    <SortPriceFilter />
                </div>
            </div>
        </Display>
    );
}
