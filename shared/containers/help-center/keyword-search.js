import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../../../redux/help-center/action';

const KeywordSearchContainer = () => {
    const dispatch = useDispatch();
    const { faqs } = useSelector((state) => state.HelpCenter);
    const [keyword, setKeyword] = useState('');
    const [typingTimeOut, setTypingTimeOut] = useState(0);
    const handleSearch = async (value) => {
        dispatch({
            type: Actions.GET_FAQ,
            keyword: value,
        });
    };
    const onChange = (e) => {
        if (typingTimeOut) {
            clearTimeout(typingTimeOut);
        }
        let text = e.target.value;
        setKeyword(text);
        setTypingTimeOut(
            setTimeout(function () {
                handleSearch(text);
            }, 500),
        );
    };
    const onClear = () => {
        setKeyword('');
        handleSearch('');
    };
    return (
        <div className="faqs-page">
            <div className="d-block d-md-none">
                <div className="faqs--search-form">
                    <div className="container">
                        <div className="faqs--input">
                            <button style={{ width: '36px' }} className="icon">
                                <img src="../images/icon/Search_Gray.svg" />
                            </button>
                            <input
                                onChange={(e) => onChange(e)}
                                value={keyword}
                                type="search"
                            />
                            {keyword && (
                                <button
                                    onClick={() => {
                                        onClear();
                                    }}
                                    style={{ width: '26px' }}
                                    className="icon">
                                    <img src="../images/icon/close.svg" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="faqs--list">
                    {faqs?.map((item) => (
                        <div className="faq">
                            <div className="container">
                                <p
                                    className="faq--question"
                                    dangerouslySetInnerHTML={{
                                        __html: item?.Question,
                                    }}></p>
                                <p
                                    className="faq--answer"
                                    dangerouslySetInnerHTML={{
                                        __html: item?.Answer,
                                    }}></p>
                            </div>
                        </div>
                    ))}
                    {!faqs.length && <div>Không tìm thấy kết quả phù hợp</div>}
                </div>
            </div>
        </div>
    );
};
export default KeywordSearchContainer;
