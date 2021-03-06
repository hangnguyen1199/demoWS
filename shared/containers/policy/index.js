import BreadCrumb from "@spo/components/common/breadcrumb";
import ComponentSideBarPolicy from "@spo/components/common/sidebar-policy";
import { useState, useEffect } from "react";
import IconArrowLeft from "../../components/common/icon-arrow-left";
import { reduxForm } from "redux-form";
import axios from "axios";
import { useRouter } from "next/router";
import SearchContainer from "@spo/containers/faq/search";

const url = process.env.API_URL;

const Accordion = (props) => {
    const { panel, onClick, expanded, namePanel, details } = props;
    return (
        <>
            <div className="accordion">
                <div
                    onClick={() => onClick(panel)}
                    className="item__accordion__summary"
                >
                    <p className={`${panel === expanded ? null : "title_hover"}`}>
                        {namePanel}
                    </p>
                    <div
                        className={`icon__arrow__top ${
                            panel === expanded ? null : "icon__arrow__top__hover"
                        }  ${panel === expanded ? "active" : ""}`}
                        onClick={() => onClick(panel)}
                    >
                        <IconArrowLeft />
                    </div>
                </div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: details,
                    }}
                    className={` item__accordion__details ${
                        panel === expanded ? "active" : ""
                    }`}
                ></div>
            </div>
        </>
    );
};

function PolicyContainer(props) {
    const [active, setActive] = useState(3);
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('')
    const {
        dataMemberPolicy,
        dataTermsOfUse,
        dataReturnPolicy,
        dataWarrantyPolicy,
        dataPrivacyPolicy,
        dataShippingPolicy,
    } = props;
    const data_bread_crumb = [
        { name: "Trang ch???", path_name: "/" },
        { name: "??i???u kho???n v?? ch??nh s??ch", path_name: "policy" },
    ];
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => {
        setExpanded((state) => (state === panel ? "null" : panel));
    };
    const handleActive = (value) => {
        setActive(value);
    };

    const router = useRouter();
    useEffect(() => {
        const param = router?.query?.p;
        handleChange(param);
    }, [router]);
    useEffect(() => {
        let urlParams = {};
        for (const property in router.query) {
            if (router.query[property].length != 0)
            {urlParams[property] = router.query[property].split(",");}
        }
        if(urlParams.search){
            searchSubmit(urlParams?.search[0]);
            setSearchValue(urlParams?.search[0])
        }
    },[router])
    const searchSubmit = async (data) => {
        const result = await axios({
            method: 'GET',
            url: `${url}/master/faq`,
            params: {search:data},
        });
        setSearchResult(result.data)
    };
    const handleChangeSearch = (value) =>{
        setSearchValue(value)
    }
    return (
        <>
            <BreadCrumb data={breadcrum} />
            <SearchContainer searchValue={searchValue} handleChangeSearchValue={handleChangeSearch} />
            <div className="container__policy pd-lr-common">
                <div className="container__policy__left">
                    <ComponentSideBarPolicy active={active} onPress={handleActive} />
                </div>
                <div className="container__policy__right">
                    {searchResult.length != 0 ? (
                        <div className="faq-search-result">
                            <div className="modal-history-search-header">
                                <div className="modal-history-search-header-left">K???t qu???</div>
                            </div>
                            {searchResult.map((item, index) => {
                                return (
                                    <div className="search-result-item" key={index}>
                                        <div className="title">{item.Question}</div>
                                        <span
                                            className="search-result-item-answer"
                                            dangerouslySetInnerHTML={{ __html: item.Answer }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <>
                            <Accordion
                                namePanel="Ch??nh S??ch Kh??ch H??ng Th??nh Vi??n"
                                panel="chinh-sach-khach-hang-thanh-vien"
                                onClick={handleChange}
                                expanded={expanded}
                                details={dataMemberPolicy}
                            />
                            <Accordion
                                namePanel="Ch??nh s??ch b???o h??nh & ?????i tr???"
                                panel="quy-dinh-doi-tra"
                                onClick={handleChange}
                                expanded={expanded}
                                details={dataReturnPolicy}
                            />
                            {/* <Accordion
                namePanel="Ch??nh S??ch B???o H??nh"
                panel="chinh-sach-bao-hanh"
                onClick={handleChange}
                expanded={expanded}
                details={dataWarrantyPolicy}
                id="warranty-section"
              /> */}
                            <Accordion
                                namePanel="??i???u Kho???n S??? D???ng"
                                panel="dieu-khoan-su-dung"
                                onClick={handleChange}
                                expanded={expanded}
                                details={dataTermsOfUse}
                            />
                            <Accordion
                                namePanel="Ch??nh s??ch v???n chuy???n"
                                panel="chinh-sach-van-chuyen"
                                onClick={handleChange}
                                expanded={expanded}
                                details={dataShippingPolicy}
                            />
                            <Accordion
                                namePanel="Ch??nh S??ch B???o M???t & Chia S??? Th??ng Tin"
                                panel="chinh-sach-bao-mat-&-chia-se-thong-tin"
                                onClick={handleChange}
                                expanded={expanded}
                                details={dataPrivacyPolicy}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

PolicyContainer = reduxForm({
    form: "PolicyContainer",
    onSubmitFail: (errors) => {},
})(PolicyContainer);
export default PolicyContainer;
