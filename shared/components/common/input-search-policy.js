import React from "react";
import IconSearch from "@spo/components/common/icon-search";
import IconX from "./icon-x";
import IconTrashAlt from "./icon-trash-alt";
import IconCloses from "./icon-closes";

const RenderModal = (props) => {
    const {
        renderModal,
        faqHistory,
        handleRemoveAllHistory,
        searchList,
        handleRemoveHistoryItem,
        handleItemClick
    } = props;
    const reverseList = [...faqHistory].reverse();

    return (
        <div className="modal-history-search">
            {!renderModal ? (
                <div className="modal-history-search-inner">
                    <div className="modal-history-search-header">
                        <div className="modal-history-search-header-left">
              Tìm kiếm gần đây
                        </div>
                        <div
                            className="modal-history-search-header-right"
                            onClick={handleRemoveAllHistory}
                        >
                            <IconTrashAlt />
                        </div>
                    </div>
                    {reverseList?.map((item, index) => (
                        <div key={index}>
                            <div className="faq-histtory-search-row">
                                <div onClick={()=>handleItemClick(item)} className="text-history">{item}</div>
                                <div
                                    className="text-close"
                                    onClick={() => handleRemoveHistoryItem(index)}
                                >
                                    <IconX />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="modal-history-search-header">
                        <div className="modal-history-search-header-left">Kết quả</div>
                        <div className="modal-history-search-header-right">
                            {searchList.length}
                        </div>
                    </div>
                    <div className="modal-history-search-item">
                        {searchList?.map((item, index) => {
                            return (
                                <div key={index} onClick={()=>handleItemClick(item.Question)} className="modal-history-search-row">
                                    <p className="text-search">{item.Question}</p>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};
const RenderInputSearchPolicy = (props) => {
    const {
        input: { name, onChange, onBlur },
        onSubmit,
        searchList,
        searchValue,
        onSelectItem
    } = props;
    const [faqHistory, setFaqHistory] = React.useState(
        JSON.parse(localStorage.getItem("faqSearch")) ??
      localStorage.setItem("faqSearch", JSON.stringify([]))
    );
    const inputRef = React.useRef();
    const [openModal, setOpenModal] = React.useState(false);
    const [renderModal, setRenderModal] = React.useState(false);
    const onKeyDown = (event) => {
        if (event.key === "Enter" && event.target.value) {
            event.preventDefault();
            props.onKeyDown(event.target.value);
            onSelectItem(event.target.value);
            setOpenModal(false);
            let check = true
            for (let i = 0; i < faqHistory.length; i++)
            {if (faqHistory[i] == event.target.value) {
                check=false
                break;
            }}
            if(check){
                faqHistory.push(event.target.value);
                setFaqHistory(faqHistory);
                localStorage.setItem("faqSearch", JSON.stringify(faqHistory));
            }
        }
    };
    const onRemoveAllHistory = () => {
        localStorage.setItem("faqSearch", JSON.stringify([]));
        setFaqHistory([]);
    };
    React.useEffect(() => {}, [inputRef]);
    const onFocus = () => {
        setOpenModal(true);
    };
    const onChangeInput = (value) => {
        onChange(value);
        !openModal && setOpenModal(true);
        if (value) {
            setRenderModal(true);
        } else {
            setRenderModal(false);
        }
    };
    const handleRemoveHistoryItem = (data) => {
        faqHistory.splice(faqHistory.length - 1 - data, 1);
        const newList = [...faqHistory];
        localStorage.setItem("faqSearch", JSON.stringify(faqHistory));
        setFaqHistory(newList);
    };
    const handleItemClick = (data)=>{
        onSelectItem(data)
        setOpenModal(false);
    }
    const closeSearchInput = ()=>{
        onChangeInput('');
    }
    return (
        <div className="input-search-container-policy">
            <div className="icon-div" onClick={onSubmit}>
                <IconSearch />
            </div>
            <input
                name={name}
                onChange={(e)=>onChangeInput(e.target.value)}
                placeholder="Đặt câu hỏi hoặc nhập từ khóa"
                className="input-search-policy"
                onKeyDown={onKeyDown}
                autoComplete="off"
                ref={inputRef}
                // onFocus={onFocus}
                value={searchValue}
            />
            <span onClick={closeSearchInput} className='cursor-pointer btn-close-search' aria-hidden="true"><IconCloses  width={24} /></span>
            {openModal ? (
                <React.Fragment>
                    <div className="overlay" onClick={() => setOpenModal(false)}></div>
                    <RenderModal
                        renderModal={renderModal}
                        faqHistory={faqHistory}
                        handleRemoveAllHistory={onRemoveAllHistory}
                        searchList={searchList}
                        handleRemoveHistoryItem={handleRemoveHistoryItem}
                        handleItemClick={handleItemClick}
                    />
                </React.Fragment>
            ) : null}
        </div>
    );
};

export default RenderInputSearchPolicy;
