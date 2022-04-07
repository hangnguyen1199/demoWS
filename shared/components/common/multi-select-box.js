import React, { useEffect, useRef, useState } from 'react';
import Chip from './chip';
import IconCheckCircle from './icon-check-circle';
import { findDOMNode } from 'react-dom';

function MultiSelectBox(props) {
    const { field, setRef, errorMess } = props;
    // const ref = useRef(null);
    const [show, setShow] = useState(false);
    const onClick = (e) => {
        setShow(!show);
    };
    const selected = props.selected;
    const onSelect = (val) => {
        let index = selected.findIndex((x) => x == val);
        if (index == -1) {selected.push(val);}
        else {selected.splice(index, 1);}
        props.onChangeSelect([...selected]);
    };
    const data = props.data;
    const onClose = (item) => {
        let index = selected.findIndex((x) => x == item);
        if (index != -1) {selected.splice(index, 1);}
        props.onChangeSelect([...selected]);
    };
    useEffect(() => {
        if (setRef) {
            let eleError = findDOMNode(setRef.current);
            eleError.addEventListener('animationend', (e) => {
                eleError.classList.remove('apply-shake');
            });
        }
    }, []);
    return (
        <div className="multi-select-box">
            <div
                ref={setRef}
                className={`_input pointer d-flex justify-content-start flex-wrap align-items-center ${
                    props.className ?? ''
                }`}>
                <div className="overlay" onClick={onClick}></div>
                {selected.length > 0 ? (
                    selected.map((item, index) => {
                        return (
                            <div className="mr-1 py-1" key={index}>
                                <Chip
                                    onClose={() => onClose(item)}
                                    name={
                                        data[
                                            data.findIndex(
                                                (x) => x[field[1]] == item,
                                            )
                                        ]
                                            ? data[
                                                data.findIndex(
                                                    (x) =>
                                                        x[field[1]] == item,
                                                )
                                            ][field[0]]
                                            : ''
                                    }
                                />
                            </div>
                        );
                    })
                ) : (
                    <span className="placeholder">{props.placeholder}</span>
                )}
            </div>
            {errorMess && (
                <div className="_error_mess error-float">
                    <div className="wrap">{errorMess}</div>
                </div>
            )}
            {show && (
                <div className="overlay" onClick={() => setShow(false)}></div>
            )}
            {show && (
                <div className={'_dropdown show'}>
                    <div className="wrap_search">
                        <input type="text" className="search_input" />
                    </div>
                    <div className="wrap_select">
                        {data.map((item, index) => {
                            return (
                                <div
                                    onClick={() => onSelect(item[field[1]])}
                                    className={`select  ${
                                        selected.includes(item[field[1]])
                                            ? 'd-none'
                                            : 'd-flex'
                                    } `}
                                    key={index}>
                                    <div className="d-flex justify-content-between">
                                        {item[field[0]]}
                                        {selected.includes(item[field[1]]) && (
                                            <IconCheckCircle />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
MultiSelectBox.defaultProps = {
    field: ['label', 'value'],
};
export default MultiSelectBox;
