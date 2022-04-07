import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FaqActions from '../../../../redux/faq/action';

function TabFaq(props) {
    const dispatch = useDispatch();
    const { Keyword } = props;
    const { SearchResult } = useSelector((state) => state.Faq);
    useEffect(() => {
        dispatch({
            type: FaqActions.SEARCH_FAQ,
            data: {
                Search: Keyword,
            },
        });
    }, []);

    return (
        <div className="tab-faq">
            <div className="news-list-inner">
                {SearchResult?.length > 0 ? (
                    SearchResult?.map((item, index) => (
                        <div className="faq-item" key={index}>
                            <div className="faq-question">{item?.Question}</div>
                            <div
                                className="faq-answer"
                                dangerouslySetInnerHTML={{
                                    __html: item?.Answer,
                                }}></div>
                        </div>
                    ))
                ) : (
                    <div>Chưa có bài viết nào</div>
                )}
            </div>
        </div>
    );
}
export default TabFaq;
