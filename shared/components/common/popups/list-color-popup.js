import React, { useState ,useEffect} from 'react';
import ColorImageUpdated from '../../item/color-image-updated';
import IconCloses from './../icon-closes';
import useWindowSize from '@spo/lib/use-window-size';

export default function ListColorPopup(props) {
    const [active, setActive] = useState('');
    const { payload, showVisible } = props;
    const onChangeColor = (e) => {
        setActive(e?.ColorId);
        payload?.onChangeColor(e);
    };
    useEffect(() => {
        setActive(payload?.data?.active);
    }, [payload?.data?.active])

    return (
        <div className="d-flex flex-column py-1 mx-1">
            <div className="d-flex justify-content-between align-items-center">
                <span className="close close-3"></span>
                <p className="mb-1 title_section_list_color">Chọn màu sắc</p>
                <span
                    className="close close-3"
                    onClick={() => showVisible(false)}
                >
                    <IconCloses />
                </span>
            </div>
            <div className='scroll-popup-color'>
                <div style={{maxWidth:useWindowSize().width - 60}} className={`d-flex justify-content-between align-items-center flex-row  scroll-popup-color-children `}>
                    {payload?.data?.data &&
                        payload?.data?.data?.map((element, index) => {
                            return (
                                <div
                                    key={index}
                                    className="mx-1 d-flex flex-column item-color-list"
                                >
                                    <ColorImageUpdated
                                        className="active-popup-list-color"
                                        key={index}
                                        onChange={() => onChangeColor(element)}
                                        active={element.ColorId == active}
                                        ColorId={`${element.ColorId}`}
                                        disabled={() =>
                                            payload?.checkDisabled(element)
                                        }
                                        name={element.Name}
                                        src={element.Thumb}
                                        Code={element.Code}
                                        ColorImage={element.ColorImage}
                                    />
                                    <span
                                        className="text-name-color-popup"
                                    >
                                        {element.Name}
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
