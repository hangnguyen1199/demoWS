import React from 'react';
import dynamic from 'next/dynamic';

const ListNews = dynamic(() => import('@spo/components/item/list-news-promo'), {
    ssr: false,
});
const ListItems = dynamic(() => import('@spo/components/item/list-items'), {
    ssr: false,
});
const ListLive = dynamic(() => import('@spo/components/item/list-live'), {
    ssr: false,

});
import Display from '@spo/components/common/display';
import CustomSlideChild from './item-slide-child';
import HotCategories from './category-hot';
import ListItemCollection from './list-item-collection';
import UpdatedHotCategories from '../../containers/home/components/updated-hot-categories';
import PageList from '../../config/PageList';

const ListItemChildGender = (props) => {
    const {
        dataChild = [],
        dataTopSearch = [],
        dataHourGold = [],
        dataLive = [],
        dataSale = [],
        dataPromotion = [],
        dataProductNews = [],
        dataTrend = [],
        loading,
        wishlistProducts,
        categoryList = []
    } = props;
    return (
        <div className="col-12 col-lg-12 px-0 px-lg-0 order-2 overflow-hidden home-content">
            <div className="back_ground_img">
                <img src={props.backgroundTop} />
            </div>
            {dataChild.length > 0 && (
                <Display>
                    <div className="wrap_list_home list-item-child bg-buy-by-category">
                        <div className="header-list-child">
                            <p>MUA THEO THỂ LOẠI</p>
                        </div>
                        <CustomSlideChild items={dataChild} />
                    </div>
                </Display>
            )}
            {categoryList.length > 0 && <div className="wrap_list_home px-0 pt-4">
                {/* <HotCategories
          categoryList={categoryList}
          title={'MUA THEO THỂ LOẠI'}>
        </HotCategories> */}
                <UpdatedHotCategories
                    categoryList={categoryList}
                    title={'MUA THEO THỂ LOẠI'}>
                </UpdatedHotCategories>
            </div>}
            {dataTopSearch && (
                <div className="wrap_list_home mt-4">
                    <ListItems
                        lazy_offset={0}
                        sectionTitle={"TÌM KIẾM HÀNG ĐẦU"}
                        items={dataTopSearch}
                        loading={loading.listSearchTop}
                        isFullWidth={false}
                        wishlist={wishlistProducts}
                        isViewInSlider={true}
                        isBorderTop={false}
                        textColor="#000000"
                        seeAllPath={PageList.PRODUCT_LIST_TOP.SERVER}
                    />
                </div>
            )}
            {dataHourGold && (
                <div className="wrap_list_home">
                    <ListItems
                        lazy_offset={0}
                        sectionTitle={"Giờ Vàng"}
                        items={dataHourGold}
                        loading={loading.loadingGoldenHourProduct}
                        isFullWidth={false}
                        wishlist={wishlistProducts}
                        isViewInSlider={true}
                        isBorderTop={true}
                        isShowCountTime={true}
                        textColor="#000000"
                        seeAllPath="/product-list-golden-hour"
                    />
                </div>
            )}
            {dataLive && (
                <div className="wrap_list_home">
                    <ListLive
                        lazy_offset={0}
                        sectionTitle={"FM LIVE"}
                        items={dataLive}
                        isBorderTop={true}
                        loading={false}
                        textColor="#000000"
                    />
                </div>
            )}
            {dataSale && (
                <div className="wrap_list_home">
                    <ListItems
                        lazy_offset={0}
                        sectionTitle={"Siêu sale"}
                        items={dataSale}
                        loading={loading.loadingSupperSaleProduct}
                        isFullWidth={false}
                        isBorderTop={true}
                        wishlist={wishlistProducts}
                        isViewInSlider={true}
                        isShowCountTime={true}
                        textColor="#000000"
                        seeAllPath={PageList.SUPPER_SALE.SERVER}
                        className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xlg-2-5 px-3 _common_col"
                    />
                </div>
            )}
            {dataPromotion && (
                <div className="wrap_list_home promotion-home-block">
                    <ListNews
                        lazy_offset={0}
                        sectionTitle={"KHUYẾN MÃI"}
                        items={dataPromotion}
                        loading={loading.loadingPromotion}
                        isFullWidth={false}
                        isBorderTop={true}
                        textColor="#000000"
                        seeAllPath={PageList.PROMOTION.SERVER}
                        prefix="promotion"
                    />
                </div>
            )}
            {dataProductNews && (
                <div className="wrap_list_home">
                    <ListItems
                        lazy_offset={0}
                        sectionTitle={"Sản phẩm mới"}
                        items={dataProductNews}
                        loading={loading.loadingNewestProduct}
                        isFullWidth={false}
                        isBorderTop={true}
                        isViewInSlider={true}
                        wishlist={wishlistProducts}
                        textColor="#000000"
                        seeAllPath={PageList.PRODUCT_LIST_NEW.SERVER}
                    />
                </div>
            )}
            {dataTrend && (
                <div className="wrap_list_home">
                    <ListItems
                        lazy_offset={0}
                        sectionTitle={"Xu hướng"}
                        items={dataTrend}
                        loading={loading.loadingTrendingProduct}
                        isViewInSlider={true}
                        isFullWidth={false}
                        isBorderTop={true}
                        wishlist={wishlistProducts}
                        textColor="#000000"
                        seeAllPath={PageList.PRODUCT_LIST_TREND.SERVER}
                    />
                </div>
            )}
            {dataTrend && (
                <Display>
                    <div className="wrap_list_home list-item-child">
                        <div className="header-list-child">
                            <p>BỘ SƯU TẬP</p>
                        </div>
                        <ListItemCollection
                            lazy_offset={0}
                            sectionTitle={"Xu hướng"}
                            items={dataTrend}
                            loading={loading.loadingTrendingProduct}
                            isViewInSlider={true}
                            isFullWidth={false}
                            isBorderTop={true}
                            wishlist={wishlistProducts}
                            textColor="#000000"
                        />
                    </div>
                </Display>
            )}
        </div>
    );
}
export default ListItemChildGender;