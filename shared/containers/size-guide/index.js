import BreadCrumb from "@spo/components/common/breadcrumb";
import ComponentSideBarPolicy from "@spo/components/common/sidebar-policy";
import SearchContainer from "@spo/containers/faq/search";
import React, { useEffect, useState } from "react";
import { reduxForm } from "redux-form";
import axios from "axios";
import { useRouter } from "next/router";

const url = process.env.API_URL;
function SizeGuideContainer(props) {
    const size = [
        {
            Name: "Bảng size Nữ",
            Image: "",
            Data: [
                {
                    Title: "Bảng thông số chung",
                },
                {
                    Title: "Quần Tây",
                },
                {
                    Title: "Quần Jean & Kaki",
                },
            ],
            Active: false,
        },
        {
            Name: "Bảng size Nam",
            Image: "",
            Data: [
                {
                    Title: "Bảng thông số chung",
                },
                {
                    Title: "Quần Tây",
                },
                {
                    Title: "Quần Jean & Kaki",
                },
            ],
            Active: false,
        },
        {
            Name: "Bảng size Trẻ em",
            Image: "",
            Data: [
                {
                    Title: "Bảng thông số chung",
                },
                {
                    Title: "Quần Tây",
                },
                {
                    Title: "Quần Jean & Kaki",
                },
            ],
            Active: false,
        },
    ];
    const router = useRouter();
    const [data, setData] = useState(size);
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('')
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
    const clickName = (index) => {
        let newData = [...data];
        const active = !newData[index].Active;
        for (let i = 0; i < newData.length; i++) {
            newData[i].Active = false;
        }
        newData[index].Active = active;
        setData(newData);
    };
    const [active, setActive] = useState(2);
    const { handleSubmit } = props;
    const data_bread_crumb = [
        { name: "Trang chủ", path_name: "/" },
        { name: "Hướng dẫn chọn size", path_name: "size-guide" },
    ];
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    const handleActive = (value) => {
        setActive(value);
    };
    return (
        <>
            <BreadCrumb data={breadcrum} />
            <SearchContainer searchValue={searchValue} handleChangeSearchValue={handleChangeSearch}/>
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
                        <div className="size-guide">
                            {data.map((item, index) => {
                                return (
                                    <div className="accordion-item" key={index}>
                                        <div
                                            className={`name size-guide-item-append ${
                                                item.Active ? "" : "size-guide-item-append-hover"
                                            } `}
                                            onClick={() => clickName(index)}
                                        >
                                            {item.Name}
                                            {item.Active ? (
                                                <i className="fa fa-angle-up" aria-hidden="true"></i>
                                            ) : (
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            )}
                                        </div>
                                        <div className={`row ${item.Active ? "" : "hidden"}`}>
                                            <div className="body-left col-md-3">
                                                <img src={"/images/size-guide/size_chart.png"} />
                                            </div>
                                            <div className="body-right col-md-9">
                                                {item.Data.map((child, line) => {
                                                    return (
                                                        <div key={line}>
                                                            <div className="title">{child.Title}</div>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Size</th>
                                                                        <th>S</th>
                                                                        <th>M</th>
                                                                        <th>L</th>
                                                                        <th>XL</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Chiều cao (cm)</td>
                                                                        <td>165-167</td>
                                                                        <td>168-170</td>
                                                                        <td>170-173</td>
                                                                        <td>173-176</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Cân nặng (kg)</td>
                                                                        <td>55-60</td>
                                                                        <td>60-65</td>
                                                                        <td>65-70</td>
                                                                        <td>70-75</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Vòng ngực (cm)</td>
                                                                        <td>86-90</td>
                                                                        <td>90-94</td>
                                                                        <td>94-98</td>
                                                                        <td>98-102</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Vòng eo (cm)</td>
                                                                        <td>68-72</td>
                                                                        <td>72-76</td>
                                                                        <td>76-80</td>
                                                                        <td>80-84</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Vòng mông (cm)</td>
                                                                        <td>88-92</td>
                                                                        <td>92-96</td>
                                                                        <td>96-100</td>
                                                                        <td>100-104</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

SizeGuideContainer = reduxForm({
    form: "SizeGuideContainer",
    onSubmitFail: (errors) => {},
})(SizeGuideContainer);
export default SizeGuideContainer;
