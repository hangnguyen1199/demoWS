import BreadCrumb from "@spo/components/common/breadcrumb";
import ComponentSideBarPolicy from "@spo/components/common/sidebar-policy";
import SearchContainer from "@spo/containers/faq/search";
import React, { useState ,useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { reduxForm } from "redux-form";
import { useRouter } from "next/router";
import CommonActions from '@spo/redux/common/action';


const url = process.env.API_URL;
function ShoppingGuideContainer(props) {
    const router = useRouter();
    const [active, setActive] = useState(1);
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('')
    const {data} = useSelector((state) => state.Common);
    const dispatch = useDispatch();
    const data_bread_crumb = [
        { name: "Trang chủ", path_name: "/" },
        { name: "Trung tâm trợ giúp", path_name: "/" },
    ];
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    const handleActive = (value) => {
        setActive(value);
    };
  
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

    useEffect(() => {
        dispatch({
            type: CommonActions.LOAD_SHOPPING_GUIDE,
        });
        console.log('sadfa',data.shoppingGuide)
    },[])

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
                                <div className="modal-history-search-header-left">Kết quả</div>
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
                        // <div className="shopping-guide">
                        //     {[0, 1, 2, 3, 4].map((item, index) => {
                        //         return <p key={index}></p>;
                        //     })}
                        // </div>
                        <div 
                            className="shopping-guide"
                            dangerouslySetInnerHTML={{
                                __html: data.shoppingGuide.ShoppingGuid,
                            }}
                        >
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

ShoppingGuideContainer = reduxForm({
    form: "ShoppingGuideContainer",
    onSubmitFail: (errors) => {},
})(ShoppingGuideContainer);
export default ShoppingGuideContainer;
