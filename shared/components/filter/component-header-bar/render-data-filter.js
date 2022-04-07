import React, { useState, useEffect } from 'react'
import { checkExitsArray, getCategoryName, getSizeName, getCategoryNameMaster } from './help';
import Currency from 'react-currency-formatter';
import constants from '@spo/config/constants';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function RenderDataFilter(props) {
    const common = useSelector(state => state.Common);
    const [dataPromotion, setDataPromotion] = useState([]);
    const [dataBySort, setDataBySort] = useState('');
    const [dataCategory, setDataCategory] = useState([]);
    const [dataPrice, setDataPrice] = useState({});
    const [dataSize, setDataSize] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.SORT_BY_PRICE]) {
            setDataBySort(router.query[constants.ROUTER_NAME.SORT_BY_PRICE])
        } else {
            setDataBySort('')
        }
    }, [router.query[constants.ROUTER_NAME.SORT_BY_PRICE]])
    useEffect(() => {

        if (router.query[constants.ROUTER_NAME.CATEGORY]) {
            // let cate = common.data.listCategoryMasterAll.find(v => v.Id == router.query[constants.ROUTER_NAME.CATEGORY].split(',')[0]);
            // if (cate?.ParentId) {
            //     setDataCategory(router.query[constants.ROUTER_NAME.CATEGORY].split(','))
            // }
            let data=[];
            router.query[constants.ROUTER_NAME.CATEGORY]?.split(',')?.map(x=>{
                let cate=common.data.listCategoryMasterAll.find(v=>v.Id == x);
                if(cate?.ParentId){
                    data.push(x);
                }
                return x;
            })
            // setDataCategory(router.query[constants.ROUTER_NAME.CATEGORY].split(','))
            setDataCategory(data)
        } else {
            setDataCategory([])
        }
    }, [router.query[constants.ROUTER_NAME.CATEGORY],common.data.listCategoryMasterAll])
    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.PROMOTION]) {
            setDataPromotion(router.query[constants.ROUTER_NAME.PROMOTION].split(','))
        } else {
            setDataPromotion([])
        }
    }, [router.query[constants.ROUTER_NAME.PROMOTION]])
    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.SIZE]) {
            setDataSize(router.query[constants.ROUTER_NAME.SIZE].split(','))
        } else {
            setDataSize([])
        }
    }, [router.query[constants.ROUTER_NAME.SIZE]])
    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.PRICE_FROM] || router.query[constants.ROUTER_NAME.PRICE_TO]) {
            setDataPrice({
                startPrice: router.query[constants.ROUTER_NAME.PRICE_FROM],
                endPrice: router.query[constants.ROUTER_NAME.PRICE_TO]
            })
        } else {
            setDataPrice({})
        }
    }, [router.query[constants.ROUTER_NAME.PRICE_FROM], router.query[constants.ROUTER_NAME.PRICE_TO]])


    const handleDeleteFilterCategory = (e) => {
        let params = { ...router.query };
        let dataCategoryParams = params[constants.ROUTER_NAME.CATEGORY].split(",");

        let itemChild=common.data.listCategoryMasterAll.find(v=>v.Id == e);
        if(itemChild && itemChild.ParentId){
            let index=dataCategoryParams.findIndex(x=>x == itemChild.ParentId);
            if(index != -1){
                dataCategoryParams.splice(index,1);
            }
        }
        let keyChild=dataCategoryParams.findIndex(v=>v == e);
        if(keyChild != -1){
            dataCategoryParams.splice(keyChild,1);
        }
        if(dataCategoryParams.length > 0){
            params[constants.ROUTER_NAME.CATEGORY] = dataCategoryParams.join(',');
        }else{
            delete params[constants.ROUTER_NAME.CATEGORY];
        }
        router.replace({
            query: params
        })
    }

    const handleDeleteFilterSize = (e) => {
        let params = { ...router.query };
        let dataSizeParams = params[constants.ROUTER_NAME.SIZE].split(",");

        let index = checkExitsArray(dataSizeParams, e);
        if (index > -1) {
            dataSizeParams.splice(index, 1);
        }
        if (dataSizeParams.length == 0) {
            delete params[constants.ROUTER_NAME.SIZE];
        } else {
            params[constants.ROUTER_NAME.SIZE] = dataSizeParams.join(',');
        }

        router.replace({
            query: params
        })
    }
    const handleDeletePromotion = (e) => {
        let params = { ...router.query };
        let dataPromotionParams = params[constants.ROUTER_NAME.PROMOTION].split(",");

        let index = checkExitsArray(dataPromotionParams, e);
        if (index > -1) {
            dataPromotionParams.splice(index, 1);
        }
        if (dataPromotionParams.length == 0) {
            delete params[constants.ROUTER_NAME.PROMOTION];
        } else {
            params[constants.ROUTER_NAME.PROMOTION] = dataPromotionParams.join(',');
        }

        router.replace({
            query: params
        })
    }

    const handleRemoveFilterPrice = () => {
        let params = { ...router.query };
        delete params[constants.ROUTER_NAME.PRICE_FROM]
        delete params[constants.ROUTER_NAME.PRICE_TO]
        router.replace({
            query: params
        })
    }
    const handleDeleteOrderByPrice = () => {
        let params = { ...router.query };
        delete params[constants.ROUTER_NAME.SORT_BY_PRICE];
        router.replace({
            query: params
        })
    }
    return (
        <>
            {
                dataCategory.length > 0 &&
                dataCategory.map((item, index) => {
                    return  <span key={index}>
                        <p onClick={() =>
                            handleDeleteFilterCategory(item)} >{getCategoryNameMaster(item, common)} &times;
                        </p>
                    </span>
                })
            }
            {
                dataSize && dataSize.map((item, index) => {
                    return <p onClick={() => handleDeleteFilterSize(item)} key={index}>{getSizeName(item, common)} &times;</p>
                })
            }
            {
                (dataPrice.startPrice || dataPrice.endPrice) ?
                    <p onClick={() => handleRemoveFilterPrice()}>
                        <Currency
                            quantity={Number(dataPrice.startPrice)}
                            currency="VND"
                            pattern="##,### !"
                            symbol=""
                        />-&nbsp;
                        <Currency
                            quantity={Number(dataPrice.endPrice)}
                            currency="VND"
                            pattern="##,### !"
                            symbol=""
                        /> &times;</p> : <></>
            }
            {/* {
                dataBySort &&
        <p onClick={() => handleDeleteOrderByPrice()}>
            {dataBySort === 'price_desc ' ? 'Giá từ thấp đến cao' : 'Giá từ cao đến thấp'}  &times;</p>
            } */}
            {
                dataPromotion &&
        dataPromotion.map((item, index) => {
            return <p key={index} onClick={() => handleDeletePromotion(item)}>
                {item == constants.TYPE_SEARCH
                    .PROMOTION
                    .PROMOTION_SUPPER_SALE ? "Siêu sale" : "Giờ vàng"}  &times;</p>
        })
            }
        </>
    )
}

RenderDataFilter.propsType = {
}
export default RenderDataFilter;