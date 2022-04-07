import React, { createRef, useRef, useState , useEffect } from 'react';

function OtpCode(props) {
    const { length } = props;
    let initData = new Array(length);
    let initDataBg = new Array(length);
    initData.fill('');
    initDataBg.fill('#EFEFEF');
    const elRefs = useRef([]);
    const [data, setData] = useState(initData);
    const [dataBg, setDataBg] = useState(initDataBg);

    if (elRefs.current.length !== length) {
        elRefs.current = Array(length)
            .fill()
            .map((_, i) => elRefs.current[i] || createRef());
    }
    const onKeyDown = ({ nativeEvent: { key: keyValue } }, index) => {
        if (keyValue === 'Backspace') {
            let newData = [...data];
            newData[index] = '';
            if (index > 0) {
                elRefs.current[index - 1].current.focus();
            }
            setData(newData);
        }
    };
    const onChangeText = (e, index) => {
        if (
            !['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(
                e.target.value,
            )
        ) {
            return false;
        }
        if (e.target.value != '') {
            if (index < length - 1) {
                elRefs.current[index + 1].current.focus();
            } else {
                elRefs.current[index].current.blur();
            }
            let newDataBg = [...dataBg];
            newDataBg[index] = '#fff';
            setDataBg(newDataBg);
        } else {
            if (index > 0) {
                elRefs.current[index - 1].current.focus();
            }
            let newDataBg = [...dataBg];
            newDataBg[index] = '#EFEFEF';
            setDataBg(newDataBg);
        }
        let newData = [...data];
        newData[index] = e.target.value;
        setData(newData);
    };
    useEffect(() => {
        elRefs.current[0].current.focus();
    }, []);
    useEffect(() => {
        if (typeof props.onChange === 'function') {
            props.onChange(data.join(''));
        }
    }, [data]);
    return (
        <div className="_otpCode">
            {data.map((item, index) => (
                <input
                    ref={elRefs.current[index]}
                    key={index}
                    style={{
                        height: 49,
                        width: 49,
                        borderColor:
                            dataBg[index] == '#fff' ? '#707070' : dataBg[index],
                        borderWidth: 1,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: 16,
                        padding: 0,
                        backgroundColor: dataBg[index],
                    }}
                    maxLength={1}
                    // type="number"
                    value={item}
                    onKeyDown={(e) => onKeyDown(e, index)}
                    onChange={(e) => onChangeText(e, index)}
                />
            ))}
        </div>
    );
}
OtpCode.defaultProps = {
    length: 6,
};
export default OtpCode;
