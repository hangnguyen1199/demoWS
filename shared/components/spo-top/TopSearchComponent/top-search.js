const Image = dynamic(() => import('@spo/components/common/image'), {
    ssr: false,
})
import { debounce } from 'lodash'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import MenuActions from '../../../../redux/top-search-menu/action'
import RecommendResult from './RecommendResultComponent'
import $ from 'jquery'
import { useCustomRoute } from './../../../library/use-custom-route'
import constants from '@spo/config/constants'
import { useRouter } from 'next/router'
// import IconSearch from './../../common/icon-search';
import AppConfig from '../../../config/AppConfig'
import IconCloses from './../../common/icon-closes'
import IconSearch from './../../common/icons/icon-search'
import Display from '../../common/display'
import PageList from './../../../config/PageList'

const SearchInput = styled.input`
    background: transparent;
    border: none;
    margin-left: 20px;
`

const TopSearch = (props) => {
    const { offsetHeight = 0 } = props
    const searchInputStatus = useSelector(
        (state) => state.MenuSearch.searchInputStatus
    )
    const { data } = useSelector((state) => state.MenuSearch)
    const refParent = useRef(false)
    const [widthPar, setWidthPar] = useState(0)
    const router = useRouter()
    const [searchValue, setSearchValue] = useState(null)

    const searchInputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const debounceInput = useCallback(
        debounce((value) => {
            setLoading(true)
            dispatch({
                type: MenuActions.FETCH_KEYWORD_SEARCH,
                data: { Keyword: value },
                callback: () => {
                    setLoading(false)
                },
            })
        }, 500),
        []
    )

    const openSearchInput = () => {
        dispatch({
            type: MenuActions.OPEN_SEARCH_INPUT,
        })
        setTimeout(() => {
            searchInputRef.current?.focus()
        }, 100)
        setSearchValue('')
    }

    const closeSearchInput = () => {
        dispatch({
            type: MenuActions.CLOSE_SEARCH_INPUT,
        })
        setSearchValue('')
        debounceInput('')
    }

    const handleSearchInput = (e) => {
        debounceInput(e.target.value)
        setSearchValue(e.target.value)
    }

    const handleKeyUpSearch = (e) => {
        if (e.key === 'Escape') {
            closeSearchInput()
        }
    }
    useEffect(() => {
        
        excuteSearch(null)
    }, [])

    useEffect(() => {
        setWidthPar(refParent.current.offsetWidth)
        if (searchInputStatus) {
            $('html').addClass('popup-open')
        } else {
            $('html').removeClass('popup-open')
            // fix show total search result - TrinhDTK
            // if(searchValue === null || searchValue.trim() !== ''){
            //     excuteSearch(null);
            // }
        }
    }, [searchInputStatus])
    const onChangeSuggest = (val) => {
        excuteSearch(val)
    }
    const excuteSearch = (val) => {
        if (searchInputRef?.current) {
            searchInputRef.current.value = val ?? ''
        }

        debounceInput(val)
        setSearchValue(val)
    }
    const handleLoadMoreOther = () => {
        let newParams = {}
        newParams['tab'] = constants.SEARCH_NEWS_TAB
        if (searchInputRef.current.value) {
            newParams[constants.ROUTER_NAME.KEYWORD] =
                searchInputRef.current.value
        }
        // useCustomRoute(dispatch, 'tim-kiem', newParams);
        router.push({
            pathname: PageList.SEARCH.SERVER,
            query: newParams,
        })
        closeSearchInput()
    }
    const handleLoadMoreProduct = () => {
        let newParams = {}
        newParams['tab'] = constants.SEARCH_PRODUCT_TAB
        if (searchInputRef.current.value) {
            newParams[constants.ROUTER_NAME.KEYWORD] =
                searchInputRef.current.value
        }
        // useCustomRoute(dispatch,'/tim-kiem', newParams);
        router.push({
            pathname: PageList.SEARCH.SERVER,
            query: newParams,
        })
        closeSearchInput()
    }

    const onDeleteInput = () => {
        setSearchValue('')
        debounceInput('')
    }
    return (
        <div
            ref={refParent}
            className={`top-search d-flex align-items-center  ${
                !searchInputStatus ? 'flex-1' : 'flex-1'
            }`}
        >
            {!searchInputStatus && (
                <Display mobile={true}>
                    {/* <span
                        className={`hover-color-svg ${
                            !searchInputStatus ? 'ml-auto' : ''
                        }`}
                        style={{ marginRight: !searchInputStatus ? '0.5rem' : '0rem'}}
                        onClick={openSearchInput}>
                        <IconSearch width={24} height={24}  fontSize={25} />
                    </span> */}
                    <div
                        onClick={openSearchInput}
                        className="d-flex flex-row align-items-center top-search-new _wrap_input_search"
                        style={{
                            width: '100%',
                            borderRadius: '2px',
                            maxWidth: 'unset',
                        }}
                    >
                        <IconSearch
                            color="#707070"
                            width={18}
                            height={17}
                            fontSize={18}
                        />
                        <span style={{ marginLeft: 5 }}>
                            <p
                                style={{
                                    fontSize: '16px',
                                    color: '#707070',
                                    fontWeight: 400,
                                }}
                            >
                                Tìm kiếm...
                            </p>
                        </span>
                    </div>
                </Display>
            )}

            <Display>
                <div
                    onClick={openSearchInput}
                    className="align-items-center ustify-content-center d-flex  flex-row top-search-new"
                >
                    <IconSearch
                        color="#707070"
                        width={18}
                        height={17}
                        fontSize={18}
                    />
                    <span style={{ marginLeft: 5 }}>
                        <p
                            style={{
                                fontSize: '16px',
                                color: '#707070',
                                fontWeight: 400,
                            }}
                        >
                            Tìm kiếm...
                        </p>
                    </span>
                </div>
            </Display>

            {searchInputStatus && (
                <Display mobile={true}>
                    <div className="_wrap_input_search_all">
                        <div className="_wrap_input_search">
                            <SearchInput
                                style={{
                                    // color: AppConfig.APP_HEADER_TEXT_COLOR,
                                    fontSize: '16px',
                                }}
                                className="flex-1 _search_input"
                                ref={searchInputRef}
                                type="text"
                                onChange={(event) => handleSearchInput(event)}
                                onKeyUp={handleKeyUpSearch}
                                placeholder="Nhập tên tìm kiếm vào đây"
                            />
                            <span
                                className="hover-color-svg close ml-auto"
                                onClick={closeSearchInput}
                            >
                                <button
                                    type="button"
                                    className="close"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">
                                        <IconCloses />
                                    </span>
                                </button>
                            </span>
                        </div>
                        <RecommendResult
                            handleLoadMoreOther={handleLoadMoreOther}
                            handleLoadMoreProduct={handleLoadMoreProduct}
                            onChangeSuggest={onChangeSuggest}
                            _width={widthPar}
                            data={data}
                            loading={loading}
                            closeSearchModal={closeSearchInput}
                            searchValue={searchValue ?? ''}
                            offsetTop={50}
                        />
                    </div>
                </Display>
            )}
            <Display>
                <div
                    className={`_wrap_input_search_all  w-100 ${
                        searchInputStatus && 'animation-search-show'
                    } animation-search`}
                >
                    <RecommendResult
                        closeSearch={closeSearchInput}
                        className={`${
                            searchInputStatus && 'animation-search-show'
                        } animation-search _wrap_input_search_all_modal`}
                        handleLoadMoreOther={handleLoadMoreOther}
                        handleLoadMoreProduct={handleLoadMoreProduct}
                        onChangeSuggest={onChangeSuggest}
                        _width={'100%'}
                        data={data}
                        loading={loading}
                        closeSearchModal={closeSearchInput}
                        searchValue={searchValue ?? ''}
                        OpenHeaderInput={true}
                        searchInputRef={searchInputRef}
                        handleSearchInput={handleSearchInput}
                        SearchInput={SearchInput}
                        offsetTop={offsetHeight}
                        onDeleteInput={onDeleteInput}
                    />
                    <div
                        onClick={closeSearchInput}
                        className="over_lay_wrap_input_search_all_modal"
                    ></div>
                </div>
            </Display>
        </div>
    )
}

export default TopSearch
