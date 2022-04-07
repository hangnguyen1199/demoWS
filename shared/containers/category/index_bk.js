import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

const Header = dynamic(() => import('@spo/components/spo-layout/header'), {
    ssr: false,
});
/**
 * ****************************************************************************
 * HAIDT Index CODE
 * index.js
 *
 * description		:
 * created at		:	2020-11-16
 * created by		:	HAIDT
 * package			:	spo\shared\containers\category\index.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const CategoryContainer = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const common = useSelector((state) => state.Common);
    let categories = common.data.listCategory.filter(c => c.GenderId == props.type);
    console.log(categories);
    return (
        <>
            <div className="category-with-type">
                {/* <Header /> */}
                <div className="" style={{paddingBottom: 10}}>
                    <div className="row px-0 mx-0 d-flex">
                        <div className={`col-12 px-0`} style={{height: 722, backgroundImage: `url(${categories[0]?.ImageUrl})`, backgroundSize: 'cover'}}>
                            <div className="d-center" style={{width: '100%', position: 'absolute', bottom: 60}}>
                                <Link href={`/product-list/${categories[0]?.GenderId}`}>
                                    <div className='pointer' style={{fontWeight: 500, padding: "8px 42px", background: "#ffffff", fontSize: 16, color: '#000000'}}>
                      Xem thêm
                                    </div>
                                </Link>
                            </div>
                        </div>
                        { categories[0]?.ListCategory?.map((cate, index) => (
                            <div key={index} className={`col-lg-6 col-12 px-0 mx-0`} style={{height: 722, backgroundImage: `url(${cate?.ImageUrl})`, backgroundSize: 'cover'}}>
                                <div className="d-start" style={{width: '100%', position: 'absolute', bottom: 58}}>
                                    <Link href={`/product-list/${categories[0]?.GenderId}-${cate.Id}`}>
                                        <div className='pointer' style={{position: 'relative', left: 60, fontWeight: 400, color: 'white', fontSize: 20}}>
                        Xem thêm &nbsp; <img height="12" src="/images/icon/icon-left-arrow-white.svg"/>
                                        </div>
                                    </Link>
                                </div>
                            </div>                            
                        )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryContainer;
