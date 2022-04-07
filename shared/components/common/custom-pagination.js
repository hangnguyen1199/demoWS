import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import constants from '@spo/config/constants'
import IconChevronLeft from './icon-chevron-left'
import IconChevronRight from './icon-chevron-right'
import Pagination from 'react-bootstrap/Pagination'
import { useRouter } from 'next/router'
import Display from '@spo/components/common/display';

function CustomPagination(props) {
    const router = useRouter()
    const [activePage, setActivePage] = useState(
        Number(router.query[constants.ROUTER_NAME.PAGE]) || 1
    )
    const [firstPage, setFirstPage] = useState(0)
    const [lastPage, setLastPage] = useState(5)
    const numberPage = 5

    let totalPage = Math.ceil(props.total / props.limit)
    useEffect(() => {
        setActivePage(router.query[constants.ROUTER_NAME.PAGE] || 1)
    }, [router.query[constants.ROUTER_NAME.PAGE]])
    const onChangePageRouter = (val) => {
        let params = { ...router.query }
        params[constants.ROUTER_NAME.PAGE] = val
        router.replace({
            query: params,
        })
    }
    const onChange = (e) => {
        let page = 1
        if (e != '' && e != undefined && !isNaN(e)) {
            page = parseInt(e)
            if (page <= totalPage) {
                onChangePageRouter(page)
            } else {
                onChangePageRouter(totalPage)
            }
        }
        setActivePage(page)
        if (page == totalPage - (numberPage - 1) && page > numberPage) {
            setFirstPage(totalPage - numberPage)
            setLastPage(totalPage + (numberPage - 4))
            setActivePage(page)
        } else if (page < numberPage - 1) {
            setFirstPage(0)
            setLastPage(numberPage)
        } else if (page + (numberPage - 3) <= totalPage) {
            if (page >= numberPage - 1 && page <= totalPage) {
                setFirstPage(page - (numberPage - 2))
                setLastPage(page + (numberPage - 3))
            }
        } else {
            setFirstPage(totalPage - numberPage)
            setLastPage(totalPage + (numberPage - 4))
            setActivePage(totalPage)
        }
    }
    const showPagination = (total) => {
        let arr = []
        for (let i = 1; i <= total; i++) {
            arr.push(i)
        }
        return arr.slice(firstPage, lastPage).map((v) => {
            return (
                <div
                    key={v}
                    onClick={() => {
                        setActivePage(v)
                        onChange(v)
                        if (v >= numberPage - 1 && v <= total - 2) {
                            setFirstPage(v - (numberPage - 2))
                            setLastPage(v + (numberPage - 3))
                        } else if (v < numberPage) {
                            setFirstPage(0)
                            setLastPage(numberPage)
                        }
                    }}
                    className={`pagination-new ${activePage == v ? 'active' : ''} `}
                >
                    {v}
                </div>
            )
        })
    }
    const handleNextpage = () => {
        if (activePage < totalPage) {
            let x = Number(activePage) + 1
            onChange(x)
            setActivePage(activePage + 1)
            if (x >= 4 && x <= totalPage - 2) {
                setFirstPage(x - (numberPage - 2))
                setLastPage(x + (numberPage - 3))
            } else if (x < numberPage - 1) {
                setFirstPage(0)
                setLastPage(numberPage)
            }
        }
    }
    const handlePrevpage = () => {
        if (activePage > 1) {
            let x = activePage - 1
            onChange(x)
            setActivePage(activePage - 1)
            if (x >= 4 && x <= totalPage - 2) {
                setFirstPage(x - (numberPage - 2))
                setLastPage(x + (numberPage - 3))
            } else if (x < numberPage - 1) {
                setFirstPage(0)
                setLastPage(numberPage)
            }
        }
    }
    const showLeft = () => {
        if (totalPage > numberPage) {
            if (activePage >= numberPage - 1) {
                return (
                    <>
                        <Pagination.Ellipsis />
                    </>
                )
            }
        }
    }
    const showRight = () => {
        if (totalPage > numberPage) {
            return (
                <>
                    <Pagination.Ellipsis />
                </>
            )
        }
    }
    return (
        totalPage > 1 ? (
            <div className="w-100 flex-bottom-pagination">
                <div></div>
                <div className='d-flex flex-row align-items-center justify-content-center'>
                    <Display>
                        <p className='d-flex flex-row pagination-title'>Tổng số {totalPage} trang</p>
                    </Display>
                    <Pagination>
                        {
                            activePage > 1 && <>
                                <Pagination.First
                                    children={
                                        <IconChevronLeft
                                            fontSize={16}
                                            onClick={handlePrevpage}
                                        />
                                    }
                                />
                            </>
                        }
                        {showLeft()}
                        {showPagination(totalPage)}
                        {activePage < totalPage - 2 && showRight()}
                        {
                            activePage < totalPage  && <>
                                <Pagination.Last
                                    children={
                                        <IconChevronRight
                                            fontSize={16}
                                            onClick={handleNextpage}
                                        />
                                    }
                                /></>
                        }
                    </Pagination>
                </div>
            </div>
        ) : <></>
    )
}
CustomPagination.propTypes = {
    active: PropTypes.number,
    total: PropTypes.number,
    limit: PropTypes.number,
}
CustomPagination.defaultProps = {
    active: 1,
    total: 0,
    limit: constants.PAGINATION_PRODUCT_LIST.LIMIT,
}
export default CustomPagination;