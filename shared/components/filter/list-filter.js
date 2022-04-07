import constants from '@spo/config/constants';
import { Router } from '@spo/routes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { convertToCurrency } from '../../library/helper';
import ChipFilter from './chip-filter';

function ListFilter(props) {
    const {
        data: {
            brandMaster,
            categoryMaster,
            colorMaster,
            sizeMaster,
            collectionMaster,
        },
    } = props;
    const router = useRouter();

    const [listBrand, setListBrand] = useState([]);
    const [listCat, setListCat] = useState([]);
    const [listCollection, setListCollection] = useState([]);
    const [listColor, setListColor] = useState([]);
    const [listSize, setListSize] = useState([]);
    const [price, setPrice] = useState([]);
    const [trend, setTrend] = useState([]);
    useEffect(() => {
        let newList = [];
        if (router.query[constants.PARAM_URL.CATEGORY_SLUG]) {
            if (categoryMaster) {
                let childIndex = -1;
                let selected = null;
                let index = categoryMaster.findIndex((parent) => {
                    if (
                        parent.slug ==
                        router.query[constants.PARAM_URL.CATEGORY_SLUG]
                    ) {
                        selected = parent;
                    } else {
                        childIndex = parent.child_categories.findIndex(
                            (child) =>
                                child.slug ==
                                router.query[constants.PARAM_URL.CATEGORY_SLUG],
                        );
                        if (childIndex != -1) {
                            selected = parent.child_categories[childIndex];
                        }
                    }
                    return childIndex != -1;
                });
                if (selected) {
                    newList.push(selected);
                }
            }
        }

        setListCat(newList);
    }, [router.query[constants.PARAM_URL.CATEGORY_SLUG], categoryMaster]);
    useEffect(() => {
        let newList = [];
        if (router.query[constants.PARAM_URL.BRAND]) {
            let selected = router.query[constants.PARAM_URL.BRAND].split(',');
            if (brandMaster) {
                newList = brandMaster.filter((x) =>
                    selected.includes(x.brand_id.toString()),
                );
            }
        }

        setListBrand(newList);
    }, [router.query[constants.PARAM_URL.BRAND], brandMaster]);

    useEffect(() => {
        let newList = [];
        if (router.query[constants.PARAM_URL.COLOR]) {
            let selected = router.query[constants.PARAM_URL.COLOR].split(',');
            if (colorMaster) {
                newList = colorMaster.filter((x) =>
                    selected.includes(x.color_id.toString()),
                );
            }
        }
        setListColor(newList);
    }, [router.query[constants.PARAM_URL.COLOR], colorMaster]);
    useEffect(() => {
        let newList = [];
        if (router.query[constants.PARAM_URL.SIZE]) {
            let selected = router.query[constants.PARAM_URL.SIZE].split(',');
            if (sizeMaster) {
                newList = sizeMaster.filter((x) =>
                    selected.includes(x.size_name.toString()),
                );
            }
        }

        setListSize(newList);
    }, [router.query[constants.PARAM_URL.SIZE], sizeMaster]);

    useEffect(() => {
        let newList = [];
        if (
            router.query[constants.PARAM_URL.PRICE_FROM] &&
            router.query[constants.PARAM_URL.PRICE_TO]
        ) {
            newList = [
                {
                    price: `${convertToCurrency(
                        router.query[constants.PARAM_URL.PRICE_FROM],
                    )} - ${convertToCurrency(
                        router.query[constants.PARAM_URL.PRICE_TO],
                    )}đ`,
                },
            ];
        }
        setPrice(newList);
    }, [
        router.query[constants.PARAM_URL.PRICE_FROM],
        router.query[constants.PARAM_URL.PRICE_TO],
    ]);

    useEffect(() => {
        let newList = [];
        if (router.query[constants.PARAM_URL.HOTTREND]) {
            newList = router.query[constants.PARAM_URL.HOTTREND]?.split(',');
        }
        setTrend(newList);
    }, [router.query[constants.PARAM_URL.HOTTREND]]);

    useEffect(() => {
        let newList = [];
        if (router.query[constants.PARAM_URL.COLLECTION]) {
            if (collectionMaster) {
                newList = collectionMaster.filter(
                    (x) =>
                        x.slug == router.query[constants.PARAM_URL.COLLECTION],
                );
            }
        }

        setListCollection(newList);
    }, [router.query[constants.PARAM_URL.COLLECTION], collectionMaster]);
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onRemoveBrand = (item) => {
        if (!router.query[constants.PARAM_URL.BRAND]) {return false;}
        let newParam = { ...router.query };
        let selected = router.query[constants.PARAM_URL.BRAND].split(',');
        let index = selected.findIndex((x) => x == item.brand_id);
        if (index != -1) {
            selected.splice(index, 1);
        }
        if (selected.length > 0) {
            newParam[constants.PARAM_URL.BRAND] = selected.toString();
        } else {
            delete newParam[constants.PARAM_URL.BRAND];
        }
        Router.pushRoute(router.pathname.replace('/', ''), newParam);
    };
    const onRemoveColor = (item) => {
        if (!router.query[constants.PARAM_URL.COLOR]) {return false;}
        let newParam = { ...router.query };
        let selected = router.query[constants.PARAM_URL.COLOR].split(',');
        let index = selected.findIndex((x) => x == item.color_id);
        if (index != -1) {
            selected.splice(index, 1);
        }
        if (selected.length > 0) {
            newParam[constants.PARAM_URL.COLOR] = selected.toString();
        } else {
            delete newParam[constants.PARAM_URL.COLOR];
        }

        Router.pushRoute(router.pathname.replace('/', ''), newParam);
    };
    const onRemoveSize = (item) => {
        if (!router.query[constants.PARAM_URL.SIZE]) {return false;}
        let newParam = { ...router.query };
        let selected = router.query[constants.PARAM_URL.SIZE].split(',');
        let index = selected.findIndex((x) => x == item.size_name);
        if (index != -1) {
            selected.splice(index, 1);
        }

        if (selected.length > 0) {
            newParam[constants.PARAM_URL.SIZE] = selected.toString();
        } else {
            delete newParam[constants.PARAM_URL.SIZE];
        }

        Router.pushRoute(router.pathname.replace('/', ''), newParam);
    };
    const onRemoveCat = (item) => {
        if (!router.query[constants.PARAM_URL.CATEGORY_SLUG]) {return false;}
        let newParam = { ...router.query };
        delete newParam[constants.PARAM_URL.CATEGORY_SLUG];
        Router.pushRoute(router.pathname.replace('/', ''), newParam);
    };
    const onRemoveCollection = (item) => {
        if (!router.query[constants.PARAM_URL.COLLECTION]) {return false;}
        let newParam = { ...router.query };
        delete newParam[constants.PARAM_URL.COLLECTION];
        Router.pushRoute(router.pathname.replace('/', ''), newParam);
    };
    const onRemovePrice = (item) => {
        if (
            !router.query[constants.PARAM_URL.PRICE_FROM] ||
            !router.query[constants.PARAM_URL.PRICE_TO]
        )
        {return false;}
        let newParam = { ...router.query };
        delete newParam[constants.PARAM_URL.PRICE_FROM];
        delete newParam[constants.PARAM_URL.PRICE_TO];
        Router.pushRoute(router.pathname.replace('/', ''), newParam);
    };
    const onRemoveTrend = (item) => {
        if (!router.query[constants.PARAM_URL.HOTTREND]) {return false;}
        let newParam = { ...router.query };
        let selected = router.query[constants.PARAM_URL.HOTTREND].split(',');
        let index = selected.findIndex((x) => x == item);
        if (index != -1) {
            selected.splice(index, 1);
        }
        if (selected.length > 0) {
            newParam[constants.PARAM_URL.HOTTREND] = selected.toString();
        } else {
            delete newParam[constants.PARAM_URL.HOTTREND];
        }

        Router.pushRoute(router.pathname.replace('/', ''), newParam);
    };
    const onRemoveAll = () => {
        let newParam = {};
        if (router.pathname == '/brand') {
            newParam[constants.PARAM_URL.BRAND] =
                router.query[constants.PARAM_URL.BRAND];
        }
        if (router.pathname == '/shop') {
            newParam[constants.PARAM_URL.SHOP] =
                router.query[constants.PARAM_URL.SHOP];
        }
        if (router.pathname == '/category') {
            newParam[constants.PARAM_URL.CATEGORY_SLUG] =
                router.query[constants.PARAM_URL.CATEGORY_SLUG];
        }
        // if (router.pathname == '/category') {
        //     newParam[constants.PARAM_URL.CATEGORY_SLUG] =
        //         router.query[constants.PARAM_URL.CATEGORY_SLUG];
        // }
        Router.pushRoute(router.pathname.replace('/', ''), newParam);
    };
    const onRemoveKeyWord = () => {
        if (!router.query[constants.PARAM_URL.SEARCH]) {return false;}
        let newParam = { ...router.query };
        delete newParam[constants.PARAM_URL.SEARCH];
        Router.pushRoute(router.pathname.replace('/', ''), newParam);
    };
    const getTitle = () => {
        let temp = '';
        switch (router.query[constants.PARAM_URL.TYPE]) {
            case constants.FILTER_TYPE.HOT_SALE:
                temp = 'Sản phẩm bán chạy';
                break;
            case constants.FILTER_TYPE.NEW:
                temp = 'Sản phẩm mới';
                break;
            case constants.FILTER_TYPE.RECENT:
                temp = 'Sản phẩm gần đây';
                break;
            case constants.FILTER_TYPE.HOT:
                temp = 'Gợi ý cho bạn';
                break;
            case constants.FILTER_TYPE.SALE_OFF:
                temp = 'Khuyến mãi';
                break;
            default:
                break;
        }
        return temp;
    };
    const onRemoveView = () => {
        if (!router.query[constants.PARAM_URL.TYPE]) {return false;}
        let newParam = { ...router.query };
        delete newParam[constants.PARAM_URL.TYPE];
        Router.pushRoute(router.pathname.replace('/', ''), newParam);
    };
    return (
        (listBrand.length > 0 ||
            listCat.length > 0 ||
            listCollection.length > 0 ||
            listColor.length > 0 ||
            listSize.length > 0 ||
            price.length > 0 ||
            trend.length > 0 ||
            router.query[constants.PARAM_URL.TYPE] != undefined ||
            router.query[constants.PARAM_URL.SEARCH] != undefined) && (
            <div className="list-filter ">
                {router.query[constants.PARAM_URL.TYPE] && (
                    <ChipFilter
                        disabled={router.pathname == '/view'}
                        title={`Xóa ${getTitle()}`}
                        name={`"${getTitle()}"`}
                        onRemove={() => onRemoveView()}
                    />
                )}
                {router.query[constants.PARAM_URL.SEARCH] && (
                    <ChipFilter
                        // disabled={router.pathname == '/search'}
                        title={router.query[constants.PARAM_URL.SEARCH]}
                        name={`"${router.query[constants.PARAM_URL.SEARCH]}"`}
                        onRemove={() => onRemoveKeyWord()}
                    />
                )}
                {listBrand.map((item, index) => {
                    return (
                        <ChipFilter
                            key={index}
                            disabled={router.pathname == '/brand'}
                            title={`Xóa "${item.brand_name}"`}
                            name={item.brand_name}
                            onRemove={() => onRemoveBrand(item)}
                        />
                    );
                })}
                {listCat.map((item, index) => {
                    return (
                        <ChipFilter
                            disabled={router.pathname == '/category'}
                            key={index}
                            title={`Xóa "${item.category_name}"`}
                            name={item?.category_name}
                            onRemove={() => onRemoveCat(item)}
                        />
                    );
                })}
                {listCollection.map((item, index) => {
                    return (
                        <ChipFilter
                            disabled={false}
                            key={index}
                            title={`Xóa "${item.category_name}"`}
                            name={item?.category_name}
                            onRemove={() => onRemoveCollection(item)}
                        />
                    );
                })}
                {listColor.map((item, index) => {
                    return (
                        <ChipFilter
                            key={index}
                            title={`Xóa "${item.color_name}"`}
                            name={item?.color_name}
                            onRemove={() => onRemoveColor(item)}
                        />
                    );
                })}
                {listSize.map((item, index) => {
                    return (
                        <ChipFilter
                            key={index}
                            title={`Xóa "${item.size_name}"`}
                            name={item?.size_name}
                            onRemove={() => onRemoveSize(item)}
                        />
                    );
                })}
                {price.map((item, index) => {
                    return (
                        <ChipFilter
                            key={index}
                            title={`Xóa "${item.price}"`}
                            name={item?.price}
                            onRemove={() => onRemovePrice(item)}
                        />
                    );
                })}
                {trend.map((item, index) => {
                    return (
                        <ChipFilter
                            key={index}
                            disabled={router.pathname == '/hot-trend'}
                            title={`Xóa "${item}"`}
                            name={`#${item}`}
                            onRemove={() => onRemoveTrend(item)}
                        />
                    );
                })}
                {(listBrand.length > 0 ||
                    listCat.length > 0 ||
                    listColor.length > 0 ||
                    listSize.length > 0 ||
                    price.length > 0 ||
                    trend.length > 0 ||
                    router.query[constants.PARAM_URL.TYPE] ||
                    router.query[constants.PARAM_URL.SEARCH]) && (
                    <ChipFilter
                        className="remove_all ml-auto"
                        title={`Xóa lọc`}
                        name={`Xóa lọc`}
                        onRemove={() => onRemoveAll()}
                    />
                )}
            </div>
        )
    );
}
ListFilter.defaultProps = {};
export default ListFilter;
