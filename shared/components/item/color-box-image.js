import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import constants from './../../config/constants';
import ColorImage from './color-image';

/**
 * ****************************************************************************
 * DUNGNT ColorBoxImage CODE
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

function ColorBoxImage(props) {
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
                <div>
                    <span className="title">Màu sắc: </span>
                    <span>{nameColor}</span>
                </div>
                <div className="color-box-grid _custom">
                    {colors?.map((element, index) => {
                        return (
                            <ColorImage
                                key={index}
                                onChange={() => onChangeColor(element)}
                                active={element.ColorId == active}
                                ColorId={`${element.ColorId}`}
                                disabled={checkDisabled(element)}
                                name={element.Name}
                                src={element.Thumb}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
ColorBoxImage.propTypes = {
    colors: PropTypes.array,
    active: PropTypes.number,
    onChangeColor: PropTypes.func,
};
ColorBoxImage.defaultProps = {
    colors: [],
    active: null,
    currentColors: [],
};

export default ColorBoxImage;
