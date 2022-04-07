import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import constants from '../../config/constants';
import ColorImage from './color-image';
import ColorImageUpdated from './color-image-updated';
import Display from '@spo/components/common/display';
import EventRegister, { EVENT_SHOW_POPUP, SHOW_LIST_COLOR } from './../../utils/EventRegister';

/**
 * ****************************************************************************
 * DUNGNT ColorBoxImageUpdated CODE
 * color-box-image.js
 *
 * description		:
 * created at		:	2021-12-22
 * created by		:	DungNT
 * package			:	shared\components\item\color-box-image.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function ColorBoxImageUpdated (props) {
    const { colors, active, currentColors } = props;
    const [nameColor, setNameColor] = useState('');
    const onChangeColor = (ColorId) => {
        props.onChangeColor(ColorId);
    };
    const checkDisabled = (element) => {
        let index = currentColors.findIndex(
            (x) => x.ColorId == element.ColorId,
        );
        return index == -1;
    };
    useEffect(() => {
        let index = colors.findIndex((x) => x.ColorId == active);
        setNameColor(index != -1 ? colors[index].Name : '');
    }, [active, colors]);
    const showPopupColorPicker=()=>{
        let reloadEvent = EventRegister.emit(EVENT_SHOW_POPUP, {
            type: SHOW_LIST_COLOR,
            open: true,
            payload: {
                title: 'Chọn màu sắc',
                callback: (res) => {
                },
                data: {
                    data:colors,
                    active:active
                },
                onChangeColor:(e)=>{
                    onChangeColor(e)
                },
                checkDisabled:(e)=>{
                    checkDisabled(e)
                }
            },
        })
        EventRegister.off(reloadEvent)
    }

    let checkActive=colors?.slice(0,props?.number_color).findIndex(v=>v.ColorId == active) == -1;
    return (
        <>
            <div className="color-box-image-updated wrap" style={{display:'flex', flexDirection:'column'}}> 
                <div>
                    <span className='title_section'>Màu sắc: </span>
                    <span className='name_color'>{nameColor}</span>
                </div>
                <Display mobile >
                    <div className="color-box-grid _custom">
                        {colors?.slice(0,props?.number_color).map((element, index) => {
                            return (
                                <ColorImageUpdated
                                    key={index}
                                    onChange={() => onChangeColor(element)}
                                    active={element.ColorId == active}
                                    ColorId={`${element.ColorId}`}
                                    disabled={checkDisabled(element)}
                                    name={element.Name}
                                    src={element.Thumb}
                                    Code={element.Code}
                                    ColorImage={element.ColorImage}
                                />
                            );
                        })}
                        {colors?.length > props.MAXIMUM && (
                            <div className={`color-box-grid-item color-box-grid-item_btn _custom updated`}>
                                <div className={`${checkActive ? 'active-color-dis': ''}`}>
                                    <div onClick={showPopupColorPicker} className={`btn-color-number color-image`}>+{colors?.length-props.number_color}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </Display>
                <Display >
                    <div className="color-box-grid _custom">
                        {colors?.map((element, index) => {
                            return (
                                <ColorImageUpdated
                                    key={index}
                                    onChange={() => onChangeColor(element)}
                                    active={element.ColorId == active}
                                    ColorId={`${element.ColorId}`}
                                    disabled={checkDisabled(element)}
                                    name={element.Name}
                                    src={element.Thumb}
                                    Code={element.Code}
                                    ColorImage={element.ColorImage}
                                />
                            );
                        })}
                    </div>
                </Display>
            </div>
        </>
    );
}
ColorBoxImageUpdated.propTypes = {
    colors: PropTypes.array,
    active: PropTypes.number,
    onChangeColor: PropTypes.func,
};
ColorBoxImageUpdated.defaultProps = {
    colors: [],
    active: null,
    currentColors: [],
};

export default ColorBoxImageUpdated;
