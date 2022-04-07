import BreadCrumb from '@spo/components/common/breadcrumb';
import CustomPagination from '@spo/components/common/custom-pagination';
import IconX from '@spo/components/common/icon-x';
import RightIconUrl from '@spo/public/images/icon/icon-right-arrow.svg';
import FilterIconUrl from '@spo/public/images/icon/ic_filter.svg';
import LocationActions from '@spo/redux/location/action';
import Actions from '@spo/redux/recruitment/action';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import CustomModalFilter from '../../components/common/custom-modal-filter';
import EmptyDataComponent from '../../components/common/empty-data';
import PageList from '../../config/PageList';
import navigate, { getUrlDynamic } from '../../library/navigate';
import Utils from '../../utils/utils';
import Filter from './filter';
import ButtonMain from '../../components/common/button-main';
import constants from '../../config/constants';

const RightIcon = () => (
    <Image src={RightIconUrl} width={8} height={8} color="#000" />
);
const FilterIcon = () => (
    <Image src={FilterIconUrl} width={12} height={12} color="#000" />
);
const url = process.env.API_URL;
const RecruitmentContainer = () => {
    const router = useRouter();

    const dispatch = useDispatch();
    const [showFilter, setShowFilter] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [filter, setFilter] = useState({});
    const [filterArr, setFilterArr] = useState([]);
    const [filterObj, setFilterObj] = useState(() => {
        let urlParams = {};
        for (const property in router.query) {
            if (router.query[property].length != 0) { urlParams[property] = router.query[property].split(","); }
        }
        return urlParams;
    });
    const [showLocationFilter, setShowLocationFilter] = useState(false);
    const [showPositionFilter, setShowPositionFilter] = useState(false);

    const { list, listMobile, positions ,loading } = useSelector(
        (state) => state.Recruitment
        
    );
    const { recruitmentCities } = useSelector(state => state.Location);
    const [branches, setBranches] = useState(recruitmentCities);
    const [positionList, setPositionList] = useState(positions)
    const isLoadMore =
		listMobile?.Recruitments.length < listMobile.Total || false;

    const initFilterList = [
        {
            Id: 1,
            Name: "Theo địa điểm",
            Callback: () => setShowLocationFilter(true),
        },
        {
            Id: 1,
            Name: "Theo chức danh",
            Callback: () => setShowPositionFilter(true),
        },
    ];
    const data_bread_crumb = [
        { name: "Trang chủ", path_name: "/" },
        { name: "Tuyển dụng", path_name: PageList.RECRUITMENT.SERVER },
    ];
    useEffect(() => {
        setHasMore(listMobile?.Recruitments.length < listMobile.Total);
        dispatch({
            type: Actions.LOAD_POSITION_TYPE,
        });
        dispatch({
            type: LocationActions.GET_CITY_RECRUITMENT,
            data: {
                type: 1,
            },
        });
    }, []);

    const loadData = async (pageNo) => {
        let loadMore = listMobile?.Recruitments.length < list.Total;

        setHasMore(loadMore);
        let params={}
        params[constants.ROUTER_NAME.PAGE]=pageNo
        if (loadMore) {
            dispatch({
                type:Actions.LOAD_RECRUITMENT_LIST_MOBILE,
                data:params
            })
        }
    };
    const onChangeFilter = (data) => {
        delete router.query.paramName;
        let params={}
        params[constants.ROUTER_NAME.PAGE]=1;
        params={
            ...data
        }
        router.replace(
            {
                pathname: PageList.RECRUITMENT_SLUG.INDEX,
                query: params,
            },
            undefined,
            { shallow: true }
        );
    };
    const onSelectPositionDesktop = async (item) => {
        let newFilterObj = { ...filterObj };
        if (!newFilterObj.Position) {
            newFilterObj.Position = []
        }
        let indexPosition = newFilterObj.Position.findIndex(items => items == item.Id)
        if (indexPosition == -1) {
            newFilterObj.Position.push(item.Id)
        } else {
            newFilterObj.Position.splice(indexPosition, 1)
        }
        setFilterObj(newFilterObj)
        let listURL = {}
        for (const property in newFilterObj) {
            if (newFilterObj[property].length != 0) { listURL[property] = newFilterObj[property].toString() }
        }
        onChangeFilter(listURL);
    };
    const onSelectLocationDesktop = async (item) => {
        let newFilterObj = { ...filterObj };
        if (!newFilterObj.ProviceId) {
            newFilterObj.ProviceId = []
        }
        let indexLocation = newFilterObj.ProviceId?.findIndex(items => items == item.Id)
        if (indexLocation == -1) {
            newFilterObj.ProviceId.push(item.Id)
        } else {
            newFilterObj.ProviceId.splice(indexLocation, 1)
        }
        setFilterObj(newFilterObj)
        let listURL = {}
        for (const property in newFilterObj) {
            if (newFilterObj[property].length != 0) { listURL[property] = newFilterObj[property].toString() }
        }
        onChangeFilter(listURL);
    };
    const onSelectPosition = async (item) => {
        let newFilter = { ...filter };
        if (item?.Id) {
            newFilter["Position"] = item?.Id;
        }
        setFilter(newFilter);
        onChangeFilter(newFilter);
        let newFilterArr = [...filterArr];
        let newFilterItem = {
            Type: "Position",
            Id: item?.Id,
            Name: item?.Name,
        };
        let index = newFilterArr.findIndex((x) => x.Type == "Position");
        if (index != -1) {
            newFilterArr[index] = newFilterItem;
        } else {
            newFilterArr.push(newFilterItem);
        }
        setFilterArr(newFilterArr);
    };
    const onSelectLocation = async (item) => {
        let newFilter = { ...filter };
        if (item.Id) {
            newFilter['ProviceId'] = item.Id;
        }
        setFilter(newFilter);
        onChangeFilter(newFilter);

        let newFilterArr = [...filterArr];
        let newFilterItem = {
            Type: 'ProviceId',
            Id: item.Id,
            Name: item.Name,
        };

        let index = newFilterArr.findIndex((x) => x.Type == "ProviceId");
        if (index != -1) {
            newFilterArr[index] = newFilterItem;
        } else {
            newFilterArr.push(newFilterItem);
        }
        setFilterArr(newFilterArr);
    };
    const onClearFilter = (item) => {
        let newFilter = { ...filter };
        switch (item.Type) {
            case "Position":
                delete newFilter.Position;
                break;
            case "ProviceId":
                delete newFilter.ProviceId;
                break;
            default:
                break;
        }
        onChangeFilter(newFilter);
        setFilter(newFilter);
        let newFilterArr = [...filterArr];
        let index = newFilterArr.findIndex(
            (x) => x.Type == item.Type && x.Id == item?.Id
        );
        if (index != -1) {
            newFilterArr.splice(index, 1);
        }
        setFilterArr(newFilterArr);
    };
    const onSelectFilter = (item) => {
        setTimeout(() => {
            item.Callback();
        }, 500);
    };
    const handleShowFilter = () => {
        setShowFilter(!showFilter);
    };
    const handleRoute = (slug) => {
        navigate({ ...getUrlDynamic(PageList.RECRUITMENT_SLUG.NAME, slug) });
    };
    const handleSearchAdress = (value) => {
        let data = recruitmentCities.filter(function (item) {
            const nonAddress = Utils.specialTrim(item.Name);
            const nonSearchText = Utils.specialTrim(value);
            return nonAddress.includes(nonSearchText);
        });
        setBranches(data);
    }
    const handleSearchPosition = (value) => {
        const data = positions.filter((item) => {
            const positionString = Utils.specialTrim(item.Name)
            const inputSearch = Utils.specialTrim(value)
            return positionString.includes(inputSearch)
        })
        setPositionList(data)
    }
    const handleCheckAll = (list, type) => {
        let newFilterObj = {};
        if (type == "ProviceId") {
            newFilterObj = {
                ...filterObj,
                ProviceId: list
            }
        }
        else {
            newFilterObj = {
                ...filterObj,
                Position: list
            }
        }
        setFilterObj(newFilterObj)
        let listURL = {}
        for (const property in newFilterObj) {
            if (newFilterObj[property]?.length != 0) { listURL[property] = newFilterObj[property]?.toString() }
        }
        onChangeFilter(listURL);
    }
    const handleClearAll = (type) => {
        let newFilterObj = {};
        if (type == "ProviceId") {
            newFilterObj = {
                ...filterObj,
                ProviceId: []
            }
        }
        else {
            newFilterObj = {
                ...filterObj,
                Position: []
            }
        }
        setFilterObj(newFilterObj)
        let listURL = {}
        for (const property in newFilterObj) {
            if (newFilterObj[property]?.length != 0) { listURL[property] = newFilterObj[property]?.toString() }
        }
        onChangeFilter(listURL);
    }
    return (
        <div className="recruitment-page">
            {/* <Header /> */}
            {/* DESKTOP */}
            <div className="d-none d-md-block recruitment-box-list">
                <BreadCrumb data={data_bread_crumb} />
                <div style={{ padding: '0 var(--paddingScreen)' }}>
                    <div className="row">
                        {list?.Recruitments?.length > 0 ? (
                            <React.Fragment>
                                <div className="col-md-7 col-lg-10 col-xl-10 recruitment-content-left">
                                    <div className="row w-100 recruitment-list">
                                        {list?.Recruitments?.map((item) => (
                                            <div
                                                key={item?.Id}
                                                className="col-12 col-lg-6 col-xl-4 recruitment-item"
                                            >
                                                <div className="recruitment-item--inner">
                                                    <div
                                                        onClick={() =>
                                                            handleRoute(
                                                                item?.Id
                                                            )
                                                        }
                                                        className="recruitment-item--img"
                                                    >
                                                        <div className="container-ratio">
                                                            <div className="ratio">
                                                                <img
                                                                    src={
                                                                        item?.Image
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="recruitment-item--content">
                                                        <p className="title text-eclipse text-eclipse-center">
                                                            {item?.Title}
                                                        </p>
                                                        <div className="recruitment-item--info">
                                                            <div className="w-100 recruitment-item--info--wrap">
                                                                <p className="row mx-0">
                                                                    <span
                                                                        className='text-eclipse-width'
                                                                        style={{
                                                                            flex: 0.7,
                                                                        }}
                                                                    >
                                                                        Địa điểm
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            flex: 1.5,
                                                                        }}
                                                                        className="text-eclipse"
                                                                    >
                                                                        :{' '}
                                                                        {
                                                                            item
                                                                                ?.Branches[0]
                                                                                ?.Name
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p className="row mx-0">
                                                                    <span 
                                                                        className='text-eclipse-width'
                                                                        style={{
                                                                            flex: 0.7,
                                                                        }}
                                                                    >
                                                                        Giờ làm
                                                                        việc
                                                                    </span>
                                                                    <span
                                                                        className='text-eclipse'
                                                                        style={{
                                                                            flex: 1.5,
                                                                        }}
                                                                    >
                                                                        :{' '}
                                                                        {
                                                                            item?.WorkTime
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p className="row mx-0">
                                                                    <span
                                                                        className='text-eclipse-width'
                                                                        style={{
                                                                            flex: 0.7,
                                                                        }}
                                                                    >
                                                                        Lương
                                                                    </span>
                                                                    <span
                                                                        className='text-eclipse'
                                                                        style={{
                                                                            flex: 1.5,
                                                                        }}
                                                                    >
                                                                        :{' '}
                                                                        {
                                                                            item?.Salary
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <ButtonMain
                                                            onClick={() =>
                                                                handleRoute(
                                                                    item?.Id
                                                                )
                                                            }
                                                            title="Xem chi tiết"
                                                            className="btn-detail-recruitment"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </React.Fragment>
                        ) : (
                            <></>
                        )}
                        {
                            list?.Total == 0 && !loading &&
                            <div className="col-12 row recruitment-empty-component">
                                <EmptyDataComponent message="Không có tin tuyển dụng" />
                            </div>
                        }
                        {list?.Recruitments?.length > 0 ? (
                            <div className="col-md-5 col-lg-2 col-xl-2 recruitment-content-right">
                                <div className="recruitment-filter-box">
                                    <div className="recruitment-filter-inner">
                                        <div className="location">
                                            <Filter
                                                title="Theo địa điểm"
                                                placeholder="Tìm kiếm theo địa điểm..."
                                                onSearchChange={
                                                    handleSearchAdress
                                                }
                                                filterList={
                                                    branches.length != 0
                                                        ? branches
                                                        : recruitmentCities
                                                }
                                                onSelect={
                                                    onSelectLocationDesktop
                                                }
                                                listActive={
                                                    filterObj?.ProviceId
                                                }
                                                onCheckAll={handleCheckAll}
                                                onClearAll={handleClearAll}
                                            />
                                        </div>
                                        <div className="position">
                                            <Filter
                                                title="Theo chức danh"
                                                placeholder="Tìm kiếm theo chức danh..."
                                                onSearchChange={
                                                    handleSearchPosition
                                                }
                                                filterList={
                                                    positionList.length != 0
                                                        ? positionList
                                                        : positions
                                                }
                                                onSelect={
                                                    onSelectPositionDesktop
                                                }
                                                listActive={filterObj?.Position}
                                                onCheckAll={handleCheckAll}
                                                onClearAll={handleClearAll}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="col-12">
                            {list?.Total > 0 && (
                                <div className="recruitment-pagination position-relative">
                                    <CustomPagination
                                        limit={constants.PAGINATION_PRODUCT_LIST.LIMIT}
                                        total={list.Total}
                                        pageRangeDisplayed={4}
                                        active={router.query?.Page || 1}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* DESKTOP */}

            {/* MOBILE */}
            <div className="d-block d-md-none">
                {list?.Recruitments?.length > 0 ? (
                    <React.Fragment>
                        {showFilter && (
                            <CustomModalFilter
                                handleShowFilter={handleShowFilter}
                                onSelect={onSelectFilter}
                                title="Bộ lọc"
                                showArrow={true}
                                showSearch={false}
                                masterData={initFilterList}
                            />
                        )}
                        {showLocationFilter && (
                            <CustomModalFilter
                                handleShowFilter={setShowLocationFilter}
                                onSelect={onSelectLocation}
                                title="Chọn địa điểm tuyển dụng"
                                showSearch={true}
                                masterData={recruitmentCities}
                            />
                        )}
                        {showPositionFilter && (
                            <CustomModalFilter
                                handleShowFilter={setShowPositionFilter}
                                onSelect={onSelectPosition}
                                title="Chọn chức danh tuyển dụng"
                                showSearch={true}
                                masterData={positions}
                            />
                        )}
                        <div className="recruitment-list__img">
                            <div className="container-ratio">
                                <div className="ratio">
                                    {list?.Recruitments?.length > 0 && (
                                        <img
                                            src={list?.Recruitments[0]?.Image}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <></>
                )}
                {
                    listMobile?.Recruitments?.length == 0 && !loading &&
                    <EmptyDataComponent message="Không có tin tuyển dụng" />
                }
                <div className="common-list">
                    <h5>Vị trí tuyển dụng</h5>
                    <div className="list__filter__container">
                        <button onClick={handleShowFilter} type="button">
                            Bộ lọc <FilterIcon />
                        </button>
                        {filterArr &&
                            filterArr?.map((item, index) => (
                                <span key={index} className="filter-item">
                                    {item?.Name}
                                    <button onClick={() => onClearFilter(item)}>
                                        <IconX color="#fff" fontSize={12} />
                                    </button>
                                </span>
                            ))}
                    </div>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={loadData}
                        hasMore={isLoadMore}
                        loader={<h4>Loading...</h4>}
                    >
                        {listMobile?.Recruitments?.map((item, index) => (
                            <div key={index} className="recruitment-item">
                                <div className="recruitment-item--inner">
                                    <div className="recruitment-item--content">
                                        <p className="title">
                                            {item?.PositionName}
                                        </p>
                                        <div className="recruitment-item--info">
                                            <div className="w-100 recruitment-item--info--wrap">
                                                <p className="row mx-0">
                                                    <span style={{ flex: 1 }}>
                                                        Địa điểm làm việc
                                                    </span>
                                                    <span style={{ flex: 1.5 }}>
                                                        :{' '}
                                                        {
                                                            item?.Branches[0]
                                                                ?.Name
                                                        }
                                                    </span>
                                                </p>
                                                <p className="row mx-0">
                                                    <span style={{ flex: 1 }}>
                                                        Giờ làm việc
                                                    </span>
                                                    <span style={{ flex: 1.5 }}>
                                                    : {item?.WorkTime}
                                                    </span>
                                                </p>
                                                <p className="row mx-0">
                                                    <span style={{ flex: 1 }}>
                                                        Lương
                                                    </span>
                                                    <span style={{ flex: 1.5 }}>
                                                        : {item?.Salary}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href={{
                                                pathname:
                                                    PageList.RECRUITMENT_SLUG
                                                        .CLIENT,
                                                query: {
                                                    slug: item?.Id,
                                                },
                                            }}
                                        >
                                            <div className="btn-detail">
                                                Xem chi tiết <RightIcon />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
            {/* MOBILE */}
        </div>
    );
};

export default RecruitmentContainer;
