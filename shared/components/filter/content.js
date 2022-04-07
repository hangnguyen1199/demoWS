const Display = dynamic(
    () => import('@spo/components/common/display'),
    { ssr: false },
);
import dynamic from 'next/dynamic';
import NavFilter from '@spo/components/filter/nav-filter';
import NavFilterFull from '@spo/components/filter/nav-filter-full';
import ListItemsGrid from '@spo/components/item/list-items';
import constants from '@spo/config/constants';
import { Router } from '@spo/routes';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ListFilter from './list-filter';

/**
 * ****************************************************************************
 * DUNGNT Content CODE
 * content.js
 *
 * description		:
 * created at		:	2020-09-15
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\content.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
export default function Content(props) {
    const router = useRouter();
    const _queryParam = router.query;
    const {
        data: {
            total,
            loading,
            products,
            wishlist,
            brandMaster,
            categoryMaster,
            colorMaster,
            sizeMaster,
            collectionMaster,
        },
    } = props;
    const active = _queryParam.view ?? 1;
    const rowsPerPage = _queryParam[constants.PARAM_URL.LIMIT] ?? 12;
    const page = _queryParam[constants.PARAM_URL.OFFSET]
        ? _queryParam[constants.PARAM_URL.OFFSET] /
              _queryParam[constants.PARAM_URL.LIMIT] +
          1
        : 1;
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    // useEffect(() => {
    //     window.addEventListener('scroll', loadMore);
    //     return () => {
    //         window.removeEventListener('scroll', loadMore);
    //     };
    // }, []);
    //----------------------------------------------
    // Function
    //----------------------------------------------
    // const loadMore = () => {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop ===
    //         document.scrollingElement.scrollHeight
    //     ) {
    //         // Do load more content here!
    //         console.log("loadMore");
    //     }
    // };
    const handlePageChange = (pageNumber) => {
        let data = _queryParam;
        data[constants.PARAM_URL.LIMIT] = 12;
        data[constants.PARAM_URL.OFFSET] = (pageNumber - 1) * 12;
        Router.pushRoute(router.pathname.replace(/\//g, ''), data);
        window.scroll({
            top: 0,
            left: 0,
        });
    };
    const fetchMoreData = () => {
        if (typeof props.fetchMoreData == 'function') {
            props.fetchMoreData();
        }
    };
    return (
        <div className="_content">
            <NavFilter data={{ products: products, total: total }} />
            <div className="col-12 px-lg-0 new_wrap_filter_tag ">
                <ListFilter
                    data={{
                        brandMaster,
                        categoryMaster,
                        colorMaster,
                        sizeMaster,
                        collectionMaster,
                    }}
                />
            </div>
            <div className="col-12 col-sm-12 px-0 ">
                <div className="d-flex flex-wrap w-100">
                    <Display>
                        <div className="toolbar col-12 px-0 py-4 ">
                            <NavFilterFull data={{ total }} />
                        </div>
                    </Display>

                    <div className="col-12 px-0 mt-3 mt-lg-0 overflow-hidden">
                        <ListItemsGrid
                            items={products}
                            loading={loading}
                            isShowMore={false}
                            typeView={
                                Number.parseInt(active) === 1 ? 'GRID' : 'LIST'
                            }
                            wishlist={wishlist}
                            fetchMoreData={fetchMoreData}
                            scrollLoad={true}
                            scrollLoadStop={total <= products.length}
                        />
                    </div>

                    {/* <div className="py-3 px-md-2 w-100">
                        <MaterialPagination
                            activePage={page}
                            itemsCountPerPage={rowsPerPage}
                            totalItemsCount={total}
                            onChange={handlePageChange}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
}
