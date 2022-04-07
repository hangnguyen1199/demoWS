import React, { useEffect, useState } from "react";
import BreadCrumb from "@spo/components/common/breadcrumb";
import Display from "../../components/common/display";
import CommonVerticalTab from "./components/vertical-tab";
import CommonVerticalTabIpad from "./components/vertical-tab-ipad";
import IconClock from "../../components/common/icon-lock";
import IconRun from "../../components/common/icon-run";
import IconQuestionAsk from "../../components/common/icon-frequently";
import ChallengeQuestion from "./components/challenge-item/challenge-question";
import ChallengeHistory from "./components/challenge-item/challenge-history";
import ChallengeHappening from "./components/challenge-item/challenge-happening";
import CommonVerticalTabMobile from "./components/vertical-tab-mobile";

const ChallengeContainer = (props) => {
    const [active, setActive] = React.useState(0);
    const data_bread_crumb = [
        { name: "Trang chủ", path_name: "/" },
        { name: "Thử thách", path_name: "/challenge" },
    ];
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    const data = [
        {
            Icon: <IconQuestionAsk fontSize={20} className="icon-vertical-tab" />,
            Name: "Câu hỏi thường gặp",
            Value: 0,
            number: 100
        },
        {
            Icon: <IconRun className="icon-vertical-tab" />,
            Name: "Đang diễn ra",
            Value: 1,
            number: 20
        },
        {
            Icon: <IconClock className="icon-vertical-tab" />,
            Name: "Lịch sử",
            Value: 2,
            number: 10
        },
    ];
    const onPress = (value) => {
        setActive(value);
    };
    const renderTab = (active) => {
        switch (active) {
            case 0:
                return <ChallengeQuestion />;
            case 1:
                return <ChallengeHappening />;
            case 2:
                return <ChallengeHistory />;
            default:
                return <ChallengeQuestion />;
        }
    };
    return (
        <div className="challenge-container-master">
            <BreadCrumb data={breadcrum} />
            <div
                style={{ paddingTop: "20px" }}
                className="bg-white account-info border-top"
            >
                <div className="px-0">
                    <Display mobile={true}>
                        <div className="vertical-ipad">
                            <CommonVerticalTabIpad
                                active={active}
                                onPress={onPress}
                                fieldValue="Value"
                                data={data} />
                        </div>
                        <div className="vertical-mobile">
                            <CommonVerticalTabMobile
                                active={active}
                                onPress={onPress}
                                fieldValue="Value"
                                data={data} />
                        </div>
                    </Display>
                    <div className="page-body">
                        <Display>
                            <div className="col-12 col-lg-3 px-0">
                                <CommonVerticalTab
                                    active={active}
                                    onPress={onPress}
                                    fieldValue="Value"
                                    data={data}
                                />
                            </div>
                        </Display>
                        <div className="col-lg-9 col-12 col px-0 side-right">{renderTab(active)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeContainer;