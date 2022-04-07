import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CommonActions from "@spo/redux/common/action";
import BreadCrumb from "./../../components/common/breadcrumb";
import PageList from "./../../config/PageList";

IntroduceContainer.propTypes = {};

function IntroduceContainer(props) {
    const dispatch = useDispatch();
    const {content} = props;
    useEffect(() => {
        dispatch({
            type: CommonActions.LOAD_BRANCH_MASTER,
            data: {
                type: 0,
            },
        });
    }, []);
    const data_bread_crumb = [
        { name: "Trang chủ", path_name: "/" },
        { name: "Giới thiệu", path_name: PageList.INTRODUCE.SERVER },
    ];
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    return (
        <div className="bg-white">
            <BreadCrumb data={breadcrum} />
            <div className="introduce-content container">
                <div dangerouslySetInnerHTML={{__html: content}}></div>
            </div>
        </div>
    );
}

export default IntroduceContainer;
