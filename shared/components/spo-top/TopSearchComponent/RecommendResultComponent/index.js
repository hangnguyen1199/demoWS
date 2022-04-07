import ButtonRipple from '@spo/components/common/button-ripple';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import CustomFrame from './../../../common/custom-frame';
import Image from './../../../common/image';
import { useCustomRoute } from './../../../../library/use-custom-route';
import { useDispatch } from 'react-redux';
import IconCloses from './../../../common/icon-closes';
import AppConfig from './../../../../config/AppConfig';
import IconSearch from './../../../common/icon-search';
import constants from '@spo/config/constants';
import Display from '@spo/components/common/display';
import PageList from '../../../../config/PageList';
import ButtonMain from '../../../common/button-main';
// import useCustomRoute  from '../../../../library/use-custom-route'

const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat('en-US');
    return formatter.format(price);
};

const ProductItem = styled.li`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
const SearchInput = styled.input`
    background: transparent;
    border: none;
    margin-left: 20px;
`;
const gotoDetail = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    useCustomRoute(dispatch,`${PageList.ITEM.INDEX}${id}`);
};
const RecommendResult = (props) => {
    const { data, closeSearchModal, _width, loading, searchValue, OpenHeaderInput, SearchInput } = props;
    const dispatch = useDispatch();
    const handleClickSuggest = (val) => {
        props.onChangeSuggest(val);
    };
    const handleLoadMoreOther = () => {
        props.handleLoadMoreOther();
    };
    const handleLoadMoreProduct = () => {
        props.handleLoadMoreProduct();
    };
    useMemo(() => {
        if (data?.Promotion?.List) {
            data.Promotion.List = data?.Promotion?.List.slice(0, 2);
        }
        if (data?.News?.List) {
            data.News.List = data?.News?.List.slice(0, 2);
        }
        if (data?.FAQ?.List) {
            data.FAQ.List = data?.FAQ?.List.slice(0, 1);
        }
        if (data?.Product?.List) {
            data.Product.List = data?.Product?.List.slice(0, 6);
        }
    }, [data]);
    const handleRedirect = (path) => {
        useCustomRoute(dispatch, path);
        closeSearchModal();
    };

    const removeDataInput=()=>{
        props.onDeleteInput();
    }

    const FillTextColor = (text = "", keyword = "") => {
        let text_copy = text;
        let indexStart = text.toLowerCase().indexOf(keyword.toLowerCase());
        let keywordLength = keyword.length;
        let indexEnd = (indexStart + keywordLength);
        let arr = text_copy.split("");
        arr.splice(indexEnd, 0, `</span>`);
        arr.splice(indexStart, 0, `<span style="color:black">`);
        return arr.join("");
    }
    return (
        <div style={{ top: props.offsetTop }} className={`recommend-result line-top-search wrapper  ${props.className} `} >
            <div className='overflow-hidden-modal-search'>
                {OpenHeaderInput && <div className='w-100 header-input-search-modal'>
                    <div onClick={closeSearchModal} >
                        <img
                            title="Logo FM"
                            seo="logo-fm"
                            style={{ height: 'unset' }}
                            className="logo-fm-new object_fit_contain object-position-left"
                            src={AppConfig.APP_LOGO}
                        />
                    </div>
                    <div className='align-items-center ustify-content-center d-flex  flex-row top-search-new-modal' style={{ width: 600 }}>
                        <IconSearch color='#707070' width={18} height={17} fontSize={18} />
                        <input
                            className="flex-1 _search_input input-search-center-modal"
                            ref={props.searchInputRef}
                            type="text"
                            onChange={(event) => props.handleSearchInput(event)}
                            placeholder="Nhập tên tìm kiếm vào đây"
                            value={searchValue}
                        />
                        <span onClick={removeDataInput} className='cursor-pointer' aria-hidden="true"><IconCloses  width={24} /></span>
                    </div>
                    <div
                        className=""
                        onClick={props.closeSearch}>
                        <button
                            type="button"
                            className="close"
                            aria-label="Close">
                            <span aria-hidden="true"><IconCloses /></span>
                        </button>
                    </div>
                </div>}
                <div className="row" style={{ width: _width }}>
                    <div className="recommend-section _section col-12 col-md d-none d-sm-block">
                        <div className="_wrap_title">
                            <span className="title">Gợi ý</span>
                        </div>
                        {/* size desktop */}
                        <div className="_wrap_section d-none d-sm-block">
                            <ul className="">
                                {data?.Suggests?.map((suggest, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleClickSuggest(suggest?.Name)}
                                        className="pointer margin-bottom-20"
                                        style={{
                                            textTransform: 'lowercase',
                                        }}>
                                        {suggest.Name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* size mobile */}
                        <div className="_wrap_section d-block d-sm-none">
                            <ul className="">
                                {data?.Suggests?.slice(0, 4).map((suggest, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleClickSuggest(suggest?.Name)}
                                        className="pointer margin-bottom-20"
                                        style={{
                                            textTransform: 'lowercase',
                                        }}>
                                        {suggest.Name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="result-section _section col-12 col-md">
                        <div className="_wrap_title">
                            <span className="title">Kết quả</span>
                            <span className="_count">({data?.Product?.Total})</span>
                        </div>
                        {data?.Product?.List.length > 0 && !loading && (
                            <>
                                <div className="_wrap_section">
                                    <ul>
                                        {data?.Product?.List.map((product, index) => (
                                            <Link key={index} 
                                                href={`${PageList.ITEM.INDEX}${product.Slug}`} >
                                                <ProductItem
                                                    className="mb-2"
                                                    onClick={() => handleRedirect(`${PageList.ITEM.INDEX}${product.Slug}`)}>
                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            style={{
                                                                width: '64px',
                                                                overflow: 'hidden',
                                                            }}>
                                                            <CustomFrame ratio={1}>
                                                                <Image
                                                                    lazyLoad={false}
                                                                    className="w-100 h-100"
                                                                    src={product.Thumb}
                                                                />
                                                            </CustomFrame>
                                                        </div>

                                                        <div className="pl-2 flex-1">
                                                            <span className="d-block none-text-transform text-color-707070">
                                                                <span dangerouslySetInnerHTML={{ __html: FillTextColor(product.Name, searchValue) }} />
                                                            </span>
                                                            <span className="text-danger">
                                                                {formatPrice(product.MinPrice)}{' '}
                                                                <small style={{ textTransform: 'uppercase' }}>
                                  vnd
                                                                </small>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </ProductItem>
                                            </Link>
                                        ))}
                                    </ul>
                                    <div>
                                        <ButtonMain
                                            className="btn-detail-search"
                                            title="Xem thêm"
                                            onClick={handleLoadMoreProduct}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="other-section _section col-12 col-md">
                        <div className="_wrap_title">
                            <span className="title">Khác</span>{' '}
                            <span className="_count">
                (
                                {(data?.Promotion?.Total || 0) + ( data?.News?.Total || 0)}
                )
                            </span>
                        </div>
                        <div className="_wrap_section">
                            {data?.Promotion?.List.length > 0 && !loading && (
                                <>
                                    <span className="sub_title">Khuyến mãi</span>
                                    <ul>
                                        {data?.Promotion?.List.map((item, index) => (
                                            <Link key={index} href={`${PageList.PROMOTION.SERVER}/${item.Slug}`}>
                                                <ProductItem
                                                    className="mb-2"
                                                    onClick={() =>
                                                        handleRedirect(`${PageList.PROMOTION.SERVER}/${item.Slug}`)
                                                    }>
                                                    <div className="d-start-start">
                                                        <div
                                                            style={{
                                                                width: '64px',
                                                                overflow: 'hidden',
                                                            }}>
                                                            <CustomFrame ratio={1}>
                                                                <Image
                                                                    lazyLoad={false}
                                                                    className="w-100 h-100"
                                                                    src={item.Image}
                                                                />
                                                            </CustomFrame>
                                                        </div>

                                                        <div className="pl-2 flex-1">
                                                            <span className="text_time">{item.CreatedAt}</span>
                                                            <span className="text_title text-truncate-2">
                                                                {item.Title}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </ProductItem>
                                            </Link>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {data?.News?.List.length > 0 && !loading && (
                                <>
                                    <span className="sub_title">Tin tức</span>
                                    <ul>
                                        {data?.News?.List?.map((item, index) => (
                                            <Link key={index} href={`${PageList.NEWS.SERVER}/${item.Slug}`}>
                                                <ProductItem
                                                    className="mb-2"
                                                    onClick={() => handleRedirect(`${PageList.NEWS.SERVER}/${item.Slug}`)}>
                                                    <div className="d-start-start">
                                                        <div
                                                            style={{
                                                                width: '64px',
                                                                overflow: 'hidden',
                                                            }}>
                                                            <CustomFrame ratio={1}>
                                                                <Image
                                                                    lazyLoad={false}
                                                                    className="w-100 h-100"
                                                                    src={item.Image}
                                                                />
                                                            </CustomFrame>
                                                        </div>

                                                        <div className="pl-2 flex-1">
                                                            <span className="text_time">{item.CreatedAt}</span>
                                                            <span className="text_title text-truncate-2">
                                                                {item.Title}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </ProductItem>
                                            </Link>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {/* {data?.FAQ?.List.length > 0 && !loading && (
                <>
                  <span className="sub_title">Câu hỏi thường gặp</span>
                  <ul className="wrap_faq">
                    {data?.FAQ?.List?.map((item, index) => (
                      <div className="item_faq" key={index}>
                        <div className="question">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item?.Question,
                            }}></div>
                        </div>
                        <div className="answer">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item?.Answer,
                            }}></div>
                        </div>
                      </div>
                    ))}
                  </ul>
                </>
              )} */}
                            {(data?.News?.List.length > 0 ||
                data?.Promotions?.List.length > 0 ||
                data?.FAQ?.List.length > 0) && (
                                <div>
                                    <ButtonMain
                                        className="btn-detail-search"
                                        title="Xem thêm"
                                        onClick={handleLoadMoreOther}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        {loading && <div className="_wrap_loading">Đang xử lý...</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendResult;
