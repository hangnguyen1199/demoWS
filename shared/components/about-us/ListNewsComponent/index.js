import React, { useEffect } from 'react';
import Image from '@spo/components/common/image';
import Link from 'next/link'
import { upperCase } from 'lodash';
import UseWindowSize from './../../../library/use-window-size';
import MailBoxActions from './../../../../redux/mail-box/action';
import CustomPagination from './../../common/custom-pagination';
import { useDispatch } from 'react-redux';
import { scrollTop } from './../../../library/helper';
import EmptyDataComponent from './../../common/empty-data';
import { useRouter } from 'next/router';
import { DateTime } from 'luxon';
import PageList from '../../../config/PageList';
import CustomFrame from '../../common/custom-frame';
import Display from '../../common/display';

const ListNewsComponent = (props) => {
    const {Limit,Total,NewsList}=props.listNews||{};
    const { width } = UseWindowSize();
    const router=useRouter();
    const queryParam={...router.query};
    const dispatch=useDispatch();
    const handlePagination = (pageNo) => {
        router.replace(
            {
                query: {
                    page: pageNo,
                },
            },
            undefined,
            { shallow: true }
        );
    };
    const formatDate = (stringDate) => {
        return DateTime.fromISO(stringDate).toFormat(
            'dd/MM/yyyy - hh:mm',
        );
        
    };
    useEffect(() => {
        scrollTop();
        dispatch({
            type: MailBoxActions.FETCH_NEWS_LIST,
            data: {
                type: 1,
                Offset: (queryParam.page - 1) * 10 || 0,
            },
        });
    }, [queryParam.page])
    return (
        <div>
            <Display>
                <div
                    className="d-flex flex-column "
                    style={{ gap: '20px' }}>
                    {NewsList?.Total==null || NewsList?.length !== 0 ? (
                        NewsList.map((news,index) => (
                            <div
                                className="d-md-flex"
                                key={news.Id}
                                style={{ color: 'black'}}>                        
                                <div  style={{
                                    width: '100%',   
                                    // maxWidth: width > 799 ? "40%" : '100%',
                                    maxWidth: width >= 1920 ? "27%" : (width > 799) ? "34%" : "100%",

                                }}>
                                    <CustomFrame ratio={263/387}>
                                        <Image
                                            lazyLoad={false}
                                            src={news.Image}
                                            className='img-list-mail-box  w-100 h-100'
                                            style={{
                                            // flexBasis: '300px',
                                            // maxWidth: width > 799 ? "387px" : '100%',
                                            // height: '263px',
                                            // backgroundColor: 'red',
                                            }}
                                        />
                                    </CustomFrame>                            
                                </div>
                        
                                <div className="ml-md-3 flex-1 text-list-mail-box">
                                    <p className='text-list-mail-box-title'>{formatDate(news.CreatedAt)}</p>
                                    {/* <p style={{ textTransform: 'uppercase', textDecoration: 'underline', marginBottom: "20px" }}>Black friday</p> */}
                                    <h4 style={{ fontWeight: 'var(--fontMedium)' } }>{news.Title}</h4>
                                    <p style={{ fontWeight: news.IsRead ? '400' : '500' }} className='text-list-mail-box-detail text-truncate-2' >{news.Descriptions}</p>
                                    <Link href={`${PageList.NEWS.SERVER}/${news.Slug}`}>
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark btn-more-mobile btn-hover-black"
                                            style={{ padding: '9px 17px', textTransform: 'none', alignSelf: 'flex-start'}}>
                Đọc thêm
                                        </button>
                                    </Link>
                                </div>                        
                            </div>
                        )))
                        :(
                            <EmptyDataComponent  message='không có dữ liệu'  />
                        )}
                    <div style={{width:'100%',position:'relative'}}>
                        {Total!==0  && Total!==null && (
                            <CustomPagination
                                limit={Limit}
                                total={Total}
                                pageRangeDisplayed={4}
                                onChange={handlePagination}
                            />
                        )}
                    </div>

                </div>
            </Display>

            <Display mobile={true}>
                <div className='common-list' style={{padding: 0}}>
                    {/* <h3 className="title">Tất cả tin tức</h3> */}
                    {NewsList?.Total==null || NewsList?.length !== 0 ? (
                        <div className="news-list-inner">
                            {NewsList.map((news,index) => (
                                <Link
                                    prefetch={false}
                                    href={`${PageList.NEWS.SERVER}/${news.Slug}`}
                                    key={index}>
                                    <div className="d-flex news-item">
                                        <div className="news-item-img">
                                            <div className="container-ratio">
                                                <div className="ratio">
                                                    {/* <CustomFrame ratio={1/1}> */}
                                                    <Image
                                                        lazyLoad={false}
                                                        src={news?.Image}
                                                        className='img-list-mail-box  w-100 h-100'
                                                    />
                                                    {/* </CustomFrame> */}
                                                    {/* <img src={item?.Image} alt={item?.Title} /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="news-item-content">
                                            <p className="date">{formatDate(news.CreatedAt)}</p>
                                            <p className="title">{news.Title}</p>
                                            <p className="desc">{news.Descriptions}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )
                        :(
                            <EmptyDataComponent  message='không có dữ liệu'  />
                        )}
                    {/* <div style={{width:'100%',position:'relative'}}>
                        {Total!==0  && Total!==null && (
                            <CustomPagination
                                limit={Limit}
                                total={Total}
                                pageRangeDisplayed={4}
                                onChange={handlePagination}
                            />
                        )}
                    </div> */}
                </div>
            </Display>     
        </div>

    );
};

export default ListNewsComponent;
