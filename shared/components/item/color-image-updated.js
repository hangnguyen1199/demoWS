import React from 'react';
import Image from '../common/image';

function ColorImageUpdated (props) {
    const { active, src, Code, ColorImage } = props;
    const onChangeColor = () => props.onChange();
    return (
        <div className="color-box-grid-item _custom updated">
            <div className='color-image d-flex justify-content-center'>
                <div
                    className={`d-center ${props.className} color-item pointer ${active ? 'active' : ''
                    }`}
                    style={{
                        fontSize  : 16,
                        color     : '#333333',
                        fontWeight: 400,
                    }}
                    onClick={onChangeColor}>
                    {
                        ColorImage ? <div className="_color_item 1" style={{ backgroundImage: `url(${ColorImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        </div> : <div className="_color_item" style={{ backgroundColor: Code ?? 'whitesmoke' }}>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
export default ColorImageUpdated;
