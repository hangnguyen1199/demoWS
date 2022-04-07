// function handleFilter(e) {
//     let param = {};
//     const routerParam = { ...router.query };
//     param['Type'] = constants.PRODUCT_TYPE.NEWEST;
//     param['Limit'] = constants.PAGINATION_PRODUCT_LIST.LIMIT;
//     param['Offset'] = 0;
//     routerParam.Page = 1;
//     if (e.orderByPrice) {
//         // param['Sort'] = e.orderByPrice;
//         routerParam.Sort = param["Sort"] = e.orderByPrice;
//     } else {
//         delete routerParam.Sort;
//     }
//     if (e.filterSex) {
//         // param['Gender'] = e.filterSex;
//         routerParam.Gender = param["Gender"] = e.filterSex;
//     } else {
//         delete routerParam.Gender;
//     }
//     if (e.filterCategory.length > 0) {
//         // param['CategoryId'] = e.filterCategory.join(',');
//         routerParam.CategoryId = param["CategoryId"] = e.filterCategory.join(",");
//     } else {
//         delete routerParam.CategoryId;
//     }
//     if (e.filterSize.length > 0) {
//         // param['SizeId'] = e.filterSize.join(',');
//         routerParam.SizeId = param["SizeId"] = e.filterSize.join(",");
//     } else {
//         delete routerParam.SizeId;
//     }
//     // if (e.filterPromotion.length > 0) {
//     //     param['TypeOfPromotion'] = e.filterPromotion.join(',');
//     // }
//     if (e.filterPromotion.length > 0) {
//         routerParam.TypeOfPromotion = param[
//             "TypeOfPromotion"
//         ] = e.filterPromotion.join(",");
//     } else {
//         delete routerParam.TypeOfPromotion;
//     }
//     // if (e.filterPrice) {
//     //     param['PriceFrom'] = e.filterPrice.startPrice;
//     //     param['PriceTo'] = e.filterPrice.endPrice;
//     // }
//     if (e.filterPrice && (e.filterPrice.startPrice || e.filterPrice.endPrice)) {
//         routerParam.PriceFrom = param["PriceFrom"] = e.filterPrice.startPrice;
//         routerParam.PriceTo = param["PriceTo"] = e.filterPrice.endPrice;
//     } else {
//         delete routerParam.PriceFrom;
//         delete routerParam.PriceTo;
//     }
//     setCurrentParamFilter(param);
//     delete router.query.paramName;
//     router.replace(
//         {
//             pathname: router.pathname,
//             query: {
//                 ...routerParam,
//             },
//         },
//         undefined,
//         { shallow: true }
//     );
// }


// const handlePageChange=()=>{
// let param = {};
// param['Type'] = constants.PRODUCT_TYPE.NEWEST;
// param['Limit'] = constants.PAGINATION_PRODUCT_LIST.LIMIT;
// param['Offset'] = (pageNumber - 1) * param.Limit;
// dispatch({
//     type: ProducListNewActions.LOAD_NEWEST_PRODUCT_LIST,
//     data: { data: param },
// });
// if (currentParamFilter) {
//     const param = currentParamFilter;
//     param['Offset'] = (pageNumber - 1) * param.Limit;
// }
// }