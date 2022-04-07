import BreadCrumb from "@spo/components/common/breadcrumb";
import ComponentSideBarPolicy from "@spo/components/common/sidebar-policy";
import SearchContainer from "@spo/containers/faq/search";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import FaqActions from "../../../redux/faq/action";
import FaqSection from "../../components/faq/faq-section";
import constants from "../../config/constants";

const url = process.env.API_URL;
function FaqContainer(props) {
    const Faq = useSelector((x) => x.Faq);
    const router = useRouter();
    const [active, setActive] = useState(4);
    const [activeFaq, setActiveFaq] = useState(4);
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const { handleSubmit } = props;
    const data_bread_crumb = [
        { name: "Trang chủ", path_name: "/" },
        { name: "Câu hỏi thường gặp", path_name: "faq" },
    ];
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    const handleActive = (value) => {
        setActive(value);
    };

    const faqs = [];
    useEffect(() => {
        dispatch({
            type: FaqActions.SEARCH_FAQ_BY_TYPE,
            data: { Type: constants.FAQ.MEMBER_POLICY.ID, TypeName: "MemberPolicy" },
        });
        dispatch({
            type: FaqActions.SEARCH_FAQ_BY_TYPE,
            data: { Type: constants.FAQ.ORDER_ONLINE.ID, TypeName: "OrderOnline" },
        });
        dispatch({
            type: FaqActions.SEARCH_FAQ_BY_TYPE,
            data: { Type: constants.FAQ.PAYMENT.ID, TypeName: "Payment" },
        });
        dispatch({
            type: FaqActions.SEARCH_FAQ_BY_TYPE,
            data: { Type: constants.FAQ.RETURN_POLICY.ID, TypeName: "ReturnPolicy" },
        });
        dispatch({
            type: FaqActions.SEARCH_FAQ_BY_TYPE,
            data: { Type: constants.FAQ.ACCOUNT.ID, TypeName: "Account" },
        });
    }, []);
    const [data, setData] = useState(faqs);

    const clickName = (index) => {
        let newData = [...data];
        // const active = !newData[index].Active;
        // for (let i = 0; i < newData.length; i++) {
        //   newData[i].Active = false;
        // }
        // newData[index].Active = active;
        // setData(newData);
        if(activeFaq  ==  index){
            setActiveFaq(null)
        }else{
            setActiveFaq(index)
        }
    };

    useEffect(() => {
        let urlParams = {};
        for (const property in router.query) {
            if (router.query[property].length != 0)
            {urlParams[property] = router.query[property].split(",");}
        }
        if (urlParams.search) {
            searchSubmit(urlParams?.search[0]);
            setSearchValue(urlParams?.search[0]);
        }
    }, [router]);
    const searchSubmit = async (data) => {
        const result = await axios({
            method: "GET",
            url: `${url}/master/faq`,
            params: { search: data },
        });
        setSearchResult(result.data);
    };
    const handleChangeSearch = (value) => {
        setSearchValue(value);
    };
    return (
        <>
            <BreadCrumb data={breadcrum} />
            <SearchContainer
                searchValue={searchValue}
                handleChangeSearchValue={handleChangeSearch}
            />
            <div className="container__policy pd-lr-common">
                <div className="container__policy__left">
                    <ComponentSideBarPolicy active={active} onPress={handleActive} />
                </div>
                <div className="container__policy__right">
                    <div className="faq">
                        {searchResult.length != 0 ? (
                            <div className="faq-search-result">
                                <div className="modal-history-search-header">
                                    <div className="modal-history-search-header-left">
                    Kết quả
                                    </div>
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
                                <FaqSection
                                    item={{
                                        Name: constants.FAQ.MEMBER_POLICY.NAME,
                                        Data: Faq.DataFAQ.MemberPolicy,
                                    }}
                                    index={0}
                                    clickName={clickName}
                                    Active={activeFaq == 0}
                                />
                                <FaqSection
                                    item={{
                                        Name: constants.FAQ.ORDER_ONLINE.NAME,
                                        Data: Faq.DataFAQ.OrderOnline,
                                    }}
                                    index={1}
                                    clickName={clickName}
                                    Active={activeFaq == 1}
                                />
                                <FaqSection
                                    item={{
                                        Name: constants.FAQ.PAYMENT.NAME,
                                        Data: Faq.DataFAQ.Payment,
                                    }}
                                    index={2}
                                    clickName={clickName}
                                    Active={activeFaq == 2}
                                />
                                <FaqSection
                                    item={{
                                        Name: constants.FAQ.RETURN_POLICY.NAME,
                                        Data: Faq.DataFAQ.ReturnPolicy,
                                    }}
                                    index={3}
                                    clickName={clickName}
                                    Active={activeFaq == 3}
                                />
                                <FaqSection
                                    item={{
                                        Name: constants.FAQ.ACCOUNT.NAME,
                                        Data: Faq.DataFAQ.Account,
                                    }}
                                    index={4}
                                    clickName={clickName}
                                    Active={activeFaq == 4}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

FaqContainer = reduxForm({
    form: "FaqContainer",
    onSubmitFail: (errors) => {},
})(FaqContainer);
export default FaqContainer;
