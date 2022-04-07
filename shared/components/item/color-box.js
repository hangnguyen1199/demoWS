import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import constants from './../../config/constants';
import ColorItem from './color-item';

/**
 * ****************************************************************************
 * HaiDT ColorBox CODE
 * color-box.js
 *
 * description		:
 * created at		:	2021-11-30
 * created by		:	HaiDT
 * package			:	spo\shared\components\item\color-box.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */

function ColorBox(props) {
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
    return (
        <>
            <div className="wrap">
                <span className="" style={{paddingBottom: 20, fontWeight: 500, fontSize: 16}}>Màu sắc </span>
                <div className="color-box-grid">
                    {colors?.map((element, index) => {
                        return (
                            <ColorItem
                                key={index}
                                onChange={() => onChangeColor(element)}
                                active={element.ColorId == active}
                                ColorId={`${element.ColorId}`}
                                disabled={checkDisabled(element)}
                                name={element.Name}
                            />
                        );
                    })}
                </div>
                
            </div>
        </>
    );
}
ColorBox.propTypes = {
    colors: PropTypes.array,
    active: PropTypes.number,
    onChangeColor: PropTypes.func,
};
ColorBox.defaultProps = {
    colors: [],
    active: null,
    currentColors: [],
};

export default ColorBox;
