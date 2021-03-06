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
          Xin ch??o,{" "}
                    <span style={{ fontWeight: 500 }}>{userProfile?.DisplayName}</span>
                </p>
                <p className="header-search-policy-title">
                    <span>FM</span> c?? th??? gi??p g?? ???????c cho b???n ?
                </p>
                <Field
                    onSubmit={handleSubmit(submit)}
                    name="search"
                    type="text"
                    component={RenderInputSearchPolicy}
                    placeholder="?????t c??u h???i ho???c nh???p t??? kh??a"
                    onKeyDown={handleSubmit(submit)}
                    onChange={handleChange}
                    searchList={questionList}
                    searchValue={searchValue}
                    onSelectItem = {handleSelectItem}
                />
                <i>
          Th???i gian l??m vi???c: {setting?.WorkingFrom} - {setting?.WorkingTo} c??c ng??y trong tu???n(K??? c??? ng??y l???).
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
