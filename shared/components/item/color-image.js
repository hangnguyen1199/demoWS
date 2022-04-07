import React from 'react';
import Image from './../common/image';

function ColorImage (props) {
    const { active, src } = props;
    const onChangeColor = () => props.onChange();
    return (
        <div className="color-box-grid-item _custom">
            <div className='color-image'>
                <div
                    className={`d-center color-item pointer ${active ? 'active' : ''
                    }`}
                    style={{
                        fontSize: 16,
                        color: '#333333',
                        fontWeight: 400,
                    }}
                    onClick={onChangeColor}>
                    <div className="container-raito square">
                        <div className="raito">
                            <Image src={src} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ColorImage;
