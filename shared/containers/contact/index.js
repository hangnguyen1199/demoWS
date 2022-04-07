import React, { useEffect , useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "@spo/components/spo-layout/header";
import BreadCrumb from "@spo/components/common/breadcrumb";
import ComponentSideBarPolicy from "@spo/components/common/sidebar-policy";
import { reduxForm } from "redux-form";
import SearchContainer from "@spo/containers/faq/search";
import MailIconUrl from "@spo/public/images/icon/ic_mail.svg";
import ChatIconUrl from "@spo/public/images/icon/chat.svg";
import CallIconUrl from "@spo/public/images/icon/ic_call.svg";
import { useRouter } from "next/router";
import PageList from "../../config/PageList";

const url = process.env.API_URL;
const ChatOnlineIcon = () => {
    return <img src={ChatIconUrl} width={32} />;
};
const MailIcon = () => {
    return <img src={MailIconUrl} width={32} />;
};
const CallIcon = () => {
    return <img src={CallIconUrl} width={32} />;
};
function ContactContainer(props) {
    const router = useRouter();
    const [active, setActive] = useState(0);
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
    const data_bread_crumb = [
        { name: "Trang chủ", path_name: "/" },
        { name: "Liên hệ", path_name: PageList.CONTACT.SERVER },
    ];
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    const handleActive = (value) => {
        setActive(value);
    };
    return (
        <>
            {/* <Header /> */}
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
                        <div className="contact-container-main">
                            <div className="contact-main-item">
                                <div className="contact-main-item-icon">
                                    <CallIcon />
                                </div>
                                <div className="contact-main-item-title">Gọi điện</div>
                                <div className="contact-main-item-text">
                  090.1800.888 (Bấm số 8)
                                </div>
                            </div>
                            <div className="contact-main-item">
                                <div className="contact-main-item-icon">
                                    <MailIcon />
                                </div>
                                <div className="contact-main-item-title">Email</div>
                                <div className="contact-main-item-text">
                  cskh@fmstyle.com.vn
                                </div>
                            </div>
                            {/* <div className="contact-main-item">
                <div className="contact-main-item-icon">
                  <ChatOnlineIcon />
                </div>
                <div className="contact-main-item-title">Chat trực tuyến</div>
                <div className="contact-main-item-text">
                  <button>Bắt đầu chat</button>
                </div>
              </div> */}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

ContactContainer = reduxForm({
    form: "ContactContainer",
    onSubmitFail: (errors) => {},
})(ContactContainer);
export default ContactContainer;
