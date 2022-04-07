import React, { useState, useEffect } from 'react';
import IconArrowLeftShort from '../common/icon-arrow-left-short';
import IconCheckSquareFill from '../common/icon-check-square-fill';
import IconCheckCircle from '../common/icon-check-circle';
import IconSquare from '../common/icon-square';
import RowItemCheckbox from './row-item-checkbox';
import InputSearch from './../common/input-search';
import BrandList from './brand-list';
// import $ from 'jquery'
function xoa_dau (str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'a');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'e');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'i');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'o');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'y');
    str = str.replace(/Đ/g, 'd');
    str = str.toUpperCase();
    return str;
}
/**
 * ****************************************************************************
 * DUNGNT BrandFilterScreen
 *  CODE
 * hashtag-filter-screen.js
 *
 * description		:
 * created at		:	2020-08-24
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\hashtag-filter-screen.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */


function BrandFilterScreen
(props) {
    const { data, show } = props;
    const [listChecked, setListChecked] = useState(props.listChecked);
    // const [listBrand, setListBrand] = useState([])
    //----------------------------------------------
    // Effect 
    //----------------------------------------------
    // useEffect(() => {
    //     setListBrand(data)
    // }, [data])
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onDone = () => {
        props.onChange(listChecked);
        props.onCloseScreen();
    };
    const onCheck = (item) => {
        let newChecked = [...listChecked];
        const index = newChecked.findIndex((x) => x == item.brand_id);
        if (index != -1) {
            newChecked.splice(index, 1);
        } else {
            newChecked.push(item.brand_id);
        }
        setListChecked(newChecked);
    };
    const onChangeSearch = (keyword) => {
        let result = data.findIndex(x => xoa_dau(x.brand_name).includes(xoa_dau(keyword)))
        document.querySelector(".brand-filter-screen .brand-wrap-content").scroll({
            top: result * 40,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (
        <div className={`brand-filter-screen ${show ? 'active' : ''}`}>
            <div className="col-12 px-0">
                <div className="wrap-top w-100 col-12 px-2 d-flex flex-wrap">
                    <div className="col-12 px-0 top">
                        <div className="d-start col-3 px-0">
                            <div
                                className="close"
                                onClick={() => props.onCloseScreen()}>
                                <IconArrowLeftShort fontSize={30} />
                            </div>
                        </div>
                        <div className="col-6 text-center title_screen">Nhãn hiệu 2</div>
                        <div className="col-3 px-2">
                            <div className=" d-end" onClick={onDone}>
                                Xong
                            </div>
                        </div>
                    </div>
                    <div className=" col-12 px-0 pb-2">
                        <InputSearch onChange={onChangeSearch} />
                    </div>
                </div>
                <div className="px-3 py-2 brand-wrap-content wrap-content ">
                    <BrandList listBrand={data} listChecked={listChecked} onCheck={onCheck} />
                </div>
            </div>
        </div>
    );
}
BrandFilterScreen
    .propTypes = {};
BrandFilterScreen
    .defaultProps = {
        listChecked: [],
    };
export default BrandFilterScreen
;
