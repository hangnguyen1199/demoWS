const ItemImages = dynamic(() => import('./components/item-images'), {
    ssr: false,
});
const Information = dynamic(() => import('./components/information'), {
    ssr: false,
});
const Bottom = dynamic(() => import('./components/bottom'), {
    ssr: false,
});
const Description = dynamic(() => import('./components/description'), {
    ssr: false,
});
const CartAdding = dynamic(() => import('./components/cart-adding'), {
    ssr: false,
});
const Header = dynamic(() => import('@spo/components/spo-layout/header'), {
    ssr: false,
});
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '../../components/common/breadcrumb';
import ItemDetailActions from '@spo/redux/item-detail/action';
import Display from '../../components/common/display';
import HomeActions from '@spo/redux/home/action';
import constants from '@spo/config/constants';
import Utils from '../../utils/utils';
import { PropTypes } from 'prop-types';
/**
 * ****************************************************************************
 * HAIDT Index CODE
 * index.js
 *
 * description		:
 * created at		:	2020-11-16
 * created by		:	HAIDT
 * package			:	spo\shared\containers\item-detail\index.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const ItemDetailContainer = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const id = router?.query?.slug;
    const [slideIndex, setSlideIndex] = useState(-1);
    const {
        loading: { loadingProductDetail },
        data: { productDetail, relativeProducts, tabActive },
    } = useSelector((state) => state.ItemDetail);

    const { onClickChat } = props;

    useEffect(() => {
        let paramRelative = {};
        paramRelative['Limit'] = 12;
        paramRelative['Type'] = 8;
        dispatch({ type: ItemDetailActions.LOAD_RELATIVE_PRODUCT , data: paramRelative});

        dispatch({
            type: HomeActions.LOAD_MAY_BE_YOU_CARE_PRODUCT,
            data: {
                Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_CARE,
            },
        });
    }, []);
    const onChangeSlide = (val) => {
        setSlideIndex(val);
    };
    const resetSlideIndex = () => {
        setSlideIndex(-1);
    };
    const data_bread_crumb = [{ name: 'Trang chủ', path_name: '/' }];
    let gender = Utils.getGender(productDetail?.Gender);
    if (productDetail?.Gender) {
        data_bread_crumb.push({
            name: gender?.GenderName,
            path_name: `/category/${constants.GENDER_ID[productDetail?.Gender]}`,
        });
    }
    productDetail?.Breadcrumbs?.forEach((element, index) => {
        data_bread_crumb.push({
            name: element?.Name,
            path_name: `/product-list/?gt=${constants.GENDER_ID[productDetail?.Gender]}&sp=${element?.Slug}`,
        });
    });
    data_bread_crumb.push({ name: productDetail?.Name, path_name: '/' });
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    useEffect(() => {
        setBreadcrum(data_bread_crumb);
    }, [productDetail]);
    useEffect(() => {
        setSlideIndex(productDetail?.info?.Thumb);
    }, [productDetail.Images]);
    return (
        <>
            <div className="item-detail">
                {/* <Header /> */}
                <BreadCrumb data={breadcrum} />
                <div className="d-flex">
                    <div className="col-12 col-lg-7 px-0">
                        {productDetail && (
                            <div className="template-product product-detail">
                                <div className="pd-lr-10-percen">
                                    <div
                                        id="ProductSection-product-template"
                                        className="product-template__container prstyle1">
                                        <div className="product-single d-flex flex-wrap justify-content-center">
                                            <ItemImages
                                                isLoading={loadingProductDetail}
                                                images={productDetail.Images}
                                                item_id={productDetail.Id}
                                                item_name={productDetail.Name}
                                                slideIndex={slideIndex}
                                                resetSlideIndex={
                                                    resetSlideIndex
                                                }
                                                isNew={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Display mobile={true}>
                                    <div className="col-12 col-lg-5 px-0">
                                        <div className="right-side">
                                            <Information
                                                data={{
                                                    loadingProductDetail,
                                                    productDetail,
                                                }}
                                            />
                                            <CartAdding
                                                onChangeSlide={onChangeSlide}
                                                loadingProductDetail={
                                                    loadingProductDetail
                                                }
                                                productDetail={productDetail}
                                            />
                                        </div>
                                    </div>
                                </Display>
                                <div>
                                    <Description
                                        data={{ productDetail, tabActive }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <Display>
                        <div className="col-12 col-lg-5 px-0">
                            <div className="right-side">
                                <Information
                                    data={{
                                        loadingProductDetail,
                                        productDetail,
                                    }}
                                />
                                <CartAdding
                                    onChangeSlide={onChangeSlide}
                                    loadingProductDetail={loadingProductDetail}
                                    productDetail={productDetail}
                                    onClickChat={onClickChat}
                                />
                            </div>
                        </div>
                    </Display>
                </div>
                <div className="">
                    <Bottom relativeProducts={relativeProducts} />
                </div>
            </div>
        </>
    );
};
ItemDetailContainer.propTypes = {
    onClickChat: PropTypes.func,
};
ItemDetailContainer.defaultProps = {
    onClickChat: null,
};
export default ItemDetailContainer;
