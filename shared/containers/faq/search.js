import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Utils from "../../utils/utils";
import RenderInputSearchPolicy from "./../../components/common/input-search-policy";

const url = process.env.API_URL;
function SearchContainer(props) {
    const router = useRouter();
    const { handleSubmit, searchValue, handleChangeSearchValue } = props;
    const nameHistory = Cookies.get("displayName");
    const typingTimeoutRef = useRef(null);
    const [questionList, setQuestionList] = useState([]);
    const userProfile = useSelector((state) => state.Auth.data.User);
    const setting = useSelector((state) => state.Common.data?.settingMaster?.Setting);
    const submit = async (data) => {
        const result = await axios
            .get(`${url}/master/faq`)
            .then((res) => res.data)
            .catch((err) => {
                console.log("Error faq search:", err);
                return {};
            });
    };
    const searchSubmit = async (data) => {
        const result = await axios({
            method: 'GET',
            url: `${url}/master/faq`,
            params: {search:data},
        });
        setQuestionList(result.data)
    };
    const handleChange = (value) => {
        handleChangeSearchValue(value)
        if (typingTimeoutRef.current) {clearTimeout(typingTimeoutRef.current);}
        typingTimeoutRef.current = setTimeout(() => {
            searchSubmit(value)
        }, 300);
    };
  
    const handleSelectItem = (data) =>{
        delete router.query.paramName;
        router.replace(
            {
                pathname: router.pathname,
                query: {
                    ...{search:data},
                },
            },
            undefined,
            { shallow: true }
        );
        handleChangeSearchValue(data)
        searchSubmit(data)
    }
  
    return (
        <div className="header-search-policy pd-lr-common _border_1">
            <div className="header-search-policy-main">
                <p className="header-search-policy-title">
          Xin chào,{" "}
                    <span style={{ fontWeight: 500 }}>{userProfile?.DisplayName}</span>
                </p>
                <p className="header-search-policy-title">
                    <span>FM</span> có thể giúp gì được cho bạn ?
                </p>
                <Field
                    onSubmit={handleSubmit(submit)}
                    name="search"
                    type="text"
                    component={RenderInputSearchPolicy}
                    placeholder="Đặt câu hỏi hoặc nhập từ khóa"
                    onKeyDown={handleSubmit(submit)}
                    onChange={handleChange}
                    searchList={questionList}
                    searchValue={searchValue}
                    onSelectItem = {handleSelectItem}
                />
                <i>
          Thời gian làm việc: {setting?.WorkingFrom} - {setting?.WorkingTo} các ngày trong tuần(Kể cả ngày lễ).
                </i>
            </div>
        </div>
    );
}

SearchContainer = reduxForm({
    form: "SearchContainer",
    onSubmitFail: (errors) => {},
})(SearchContainer);
export default SearchContainer;
