import React from 'react';
import IconChevronRight from '../common/icon-chevron-right';
import IconArrowLeftShort from './../common/icon-arrow-left-short';
import { PropTypes } from 'prop-types';

/**
 * ****************************************************************************
 * DUNGNT GenderScreen CODE
 * gender-screen.js
 *
 * description		:
 * created at		:	2020-09-07
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\gender-screen.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function GenderScreen(props) {
    const { data, show } = props;
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onChange = (cat) => {
        props.onChange(cat);
        props.onCloseScreen();
    };
    const onClose = () => {
        setShowGenderScreen(false);
        props.onCloseScreen();
    };
    useEffect(() => {
        console.log("GenderScreen");
    }, [])
    return (
        <Screen open={show} className={`gender-filter-screen `}>
            <div className="col-12 px-0">
                <div className="top w-100 col-12 px-2">
                    <div className="d-start col-3 px-0">
                        <div
                            className="close"
                            onClick={() => props.onCloseScreen()}>
                            <IconArrowLeftShort fontSize={30} />
                        </div>
                    </div>
                    <div className="col-6 text-center">Giới tính</div>
                    <div className="col-3"></div>
                </div>
                <div className="px-3 py-2">
                    {data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`gender-wrap wrap-item `}
                                onClick={() => onChange(item)}>
                                <span>{item.value}</span>
                                <span className={`d-center icon `}>
                                    <IconChevronRight />
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Screen>
    );
}
GenderScreen.propTypes = {
    data: PropTypes.array,
};
GenderScreen.defaultProps = {
    data: [],
};
export default GenderScreen;
