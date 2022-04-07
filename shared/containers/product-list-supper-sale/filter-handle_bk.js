function handleFilter(e) {
    let param = {};
    const routerParam = { ...router.query };
    param.Type = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_SEARCH_TOP;
    param.Limit = constants.PAGINATION_PRODUCT_LIST.LIMIT;
    param.Offset = 0;
    routerParam.Page = 1;
    // if (sex) {
    //     param.Gender = sex;
    // } else {
    //     param.Gender = filterSex;
    // }
    if (e.orderByPrice) {
        routerParam.Sort = param["Sort"] = e.orderByPrice;
    }else {
        delete routerParam.Sort;
    }
    // if (e.filterSex) {
    //     routerParam.Gender = param["Gender"] = e.filterSex;
    // }
    if (e.filterCategory.length > 0) {
        routerParam.CategoryId = param["CategoryId"] = e.filterCategory.join(",");
    }else {
        delete routerParam.CategoryId;
    }
    if (e.filterSize.length > 0) {
        routerParam.SizeId = param["SizeId"] = e.filterSize.join(",");
    } else {
        delete routerParam.SizeId;
    }
    if (e.filterPromotion.length > 0) {
        routerParam.TypeOfPromotion = param[
            "TypeOfPromotion"
        ] = e.filterPromotion.join(",");
    } else {
        delete routerParam.TypeOfPromotion;
    }
    if (e.filterPrice && (e.filterPrice.startPrice || e.filterPrice.endPrice)) {
        routerParam.PriceFrom = param["PriceFrom"] = e.filterPrice.startPrice;
        routerParam.PriceTo = param["PriceTo"] = e.filterPrice.endPrice;
    } else {
        delete routerParam.PriceFrom;
        delete routerParam.PriceTo;
    }
    // dispatch({
    //     type: ProducListSupperSaleActions.LOAD_SUPPER_SALE_PRODUCT_LIST,
    //     data: { data: param },
    // });
    setCurrentFilter(param);

    delete router.query.paramName;
    router.replace(
        {
            pathname: router.pathname,
            query: {
                ...routerParam,
            },
        },
        undefined,
        { shallow: true }
    );
}