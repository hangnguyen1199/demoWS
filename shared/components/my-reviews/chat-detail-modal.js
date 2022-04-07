import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyReviewsActions from '@spo/redux/my-reviews/action';

import ButtonDark from '@spo/components/common/button-dark';
import IconEmojiFrowning from '@spo/components/common/icon-emoji-frowning';
import IconEmojiNeutral from '@spo/components/common/icon-emoji-neutral';
import IconEmojiSmiling from '@spo/components/common/icon-emoji-smiling';
import IconChevronDown from '@spo/components/common/icon-chevron-down';
import IconChevronUp from '@spo/components/common/icon-chevron-up';
import IconChevronRight from '@spo/components/common/icon-chevron-right';
import IconSearch from '@spo/components/common/icon-search';

const ChatDetailModal = (props) => {
    const { convention, onHide } = props;
    const [messages, setMessages] = useState([]);
    const [search, setSearch] = useState('');
    const [countFille, setCountFile] = useState(0);
    const [isShowImages, setIsShowImages] = useState(false);
    const [isShowSearch, setIsShowSearch] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isShowLagerImage, setIsShowLagerImage] = useState(false);
    const [image, setImage] = useState('');

    useEffect(() => {
        getConvention(convention, search);
        countFile();
    }, [convention, search, isShowSearch]);

    const getConvention = (convention, search) => {
        if (convention == null) {
            setMessages([]);
            return;
        }
        if (search != null && search != '' && isShowSearch) {
            setMessages(convention.Messages.filter(mes => mes.Content.toLowerCase().includes(search.toLowerCase())).slice(0).reverse());
            return;
        }
        setMessages(convention.Messages.slice(0).reverse());
    };
    const countFile = () => {
        let count = 0;
        if (convention != null && convention.Messages.length > 0) {
            let length = convention.Messages.length;
            for (let i = 0; i < length; i++) {
                count += convention.Messages[i].Files.length;
            }
        }
        setCountFile(count);
        console.log(count);
        return count;
    };
    const toDateString = (str) => {
        return `${str.substring(8,10)}.${str.substring(5,7)}.${str.substring(0,4)} - ${str.substring(11,16)}`;
    };
    const toSortDateString = (str) => {
        return `${str.substring(8,10)}.${str.substring(5,7)}.${str.substring(0,4)}`;
    };
    const toTimeString = (str) => {
        return `${str.substring(11,16)}`;
    };
    const isDifferentDate = (date1, date2) => {
        return date1.substring(0,10) != date2.substring(0,10);
    };
    const isSameTime = (date1, date2) => {
        return date1.substring(0,16) == date2.substring(0,16);
    };
    const showHideSearch = () => {
        let isShow = isShowSearch;
        setIsShowSearch(!isShowSearch);
        if (isShow) {
            setSearch('');
        }
        else {
            setIsShowMenu(false);
        }
    };
    const setSearchValue = (e) => {
        const val = e.target.value;
        setSearch(val);
    };
    const showLargeImage = (img) => {
        setImage(img);
        if (img && img != '') {
            setIsShowLagerImage(true);
        }
    };

    return (
        <>
            <div className="chat-detail-modal-bg"></div>
            <div className={`chat-detail-modal mobile ${isShowMenu ? 'show-menu' : ''}`}>
                <button className='close' onClick={()=>{onHide()}}>x</button>
                <button className='show-menu' onClick={()=>{setIsShowMenu(true)}}><IconChevronRight fontSize={16}/></button>
                <div className='col-left'>
                    <h3>Chi tiết {convention?.TypeName.toLowerCase()} <span className='close-menu' onClick={()=>{setIsShowMenu(false)}}>x</span></h3>
                    <ul className='left-menu'>
                        <li>
                            <a onClick={() => {showHideSearch()}}>Tìm kiếm tin nhắn</a>
                        </li>
                        <li>
                            <a className='inline-icon' onClick={() => {setIsShowImages(!isShowImages)}}>
                                <span>Hình ảnh đã gửi</span> 
                                {isShowImages ? <IconChevronUp fontSize={16}/> : <IconChevronDown fontSize={16}/>}
                            </a>
                            {isShowImages && <div className='list-images'>
                                {countFille == 0 ?
                                    <div className='text'>Không có hình ảnh</div> :
                                    convention.Messages.map((mes, idx) => (
                                        mes.Files.map((file, i) => (
                                            <div className='img-item' key={file.Id} onClick={()=>{showLargeImage(file.LinkFile)}}>
                                                <img src={file.LinkFile} alt={'img'} />
                                            </div>
                                        ))
                                    ))
                                }
                            </div>}
                        </li>
                    </ul>
                </div>
                <div className='col-right'>
                    <div className='convention'>
                        <div className='left-info'>
                            <p>Số {convention?.TypeName.toLowerCase()}: {convention?.Name}</p>
                            <p>Trạng thái: <span className='status-name'>Đã xong</span></p>
                        </div>
                        <div className='right-info'>
                            <p>{toDateString(convention?.CreatedAt)}</p>
                            {convention?.Review && 
                            <p>Đánh giá: 
                                {convention?.Review.Rate == 3 && <IconEmojiSmiling fill="#0DBC00" width="20" height="20"/>}
                                {convention?.Review.Rate == 2 && <IconEmojiNeutral fill="#FFD500" width="20" height="20"/>}
                                {convention?.Review.Rate == 1 && <IconEmojiFrowning fill="#FF2C00" width="20" height="20"/>}
                            </p>}
                        </div>
                    </div>
                    {isShowSearch && <div className='bg'>
                        <div className='div-search'>
                            <IconSearch fontSize={16}/>
                            <input type='text' className='form-control input-search' placeholder='Nhập nội dung vào đây' value={search} onChange={(e) => {setSearchValue(e)}}/>
                            <div className='div-button'>
                                <ButtonDark
                                    className="btn-order py-3"
                                    title={'Huỷ'}
                                    onClick={()=>{showHideSearch()}}
                                    fontSize={14}
                                />
                            </div>
                        </div>
                    </div>}
                    <div className={`chat ${isShowSearch ? 'have-search' : ''}`}>
                        <div className='messages'>
                            {messages.map((mes, idx) => {
                                let sameTime = idx > 0 && isSameTime(messages[idx - 1].SentAt, mes.SentAt) && messages[idx - 1].IsFM == mes.IsFM;
                                return (!sameTime ? <>
                                    {(idx == 0 || isDifferentDate(messages[idx - 1].SentAt, mes.SentAt)) &&
                                    <div className='split-date' key={`date_${mes.Id}`}>{toSortDateString(mes.SentAt)}</div>}
                                    <div className={`mes ${mes.IsFM ? 'fm-mes' : ''}`} key={mes.Id}>
                                        <div className={`avatar ${!mes.IsFM ? 'hide' : 'show'}`}>
                                            <img src={mes.Avatar} alt={mes.Username}/>
                                        </div>
                                        <div className='chat-bubbles'>
                                            <div className='bubble'>
                                                <div className={`time ${mes.IsFM ? 'hide' : 'show'}`}>{toTimeString(mes.SentAt)}</div>
                                                <div className='content'>
                                                    <p className='text-content'>{mes.Content}</p>
                                                    {mes.Files.length > 0 && 
                                                    mes.Files.map((file, i) => (
                                                        <div className='img-item' key={file.Id} onClick={()=>{showLargeImage(file.LinkFile)}}>
                                                            <img src={file.LinkFile} alt={'img'} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className={`time ${mes.IsFM ? 'show' : 'hide'}`}>{toTimeString(mes.SentAt)}</div>
                                            </div>
                                            {messages.map((childMes, i) => {
                                                let chilSameTime = i > idx && isSameTime(mes.SentAt, childMes.SentAt) && childMes.IsFM == mes.IsFM;
                                                return (chilSameTime ?
                                                    <div className='bubble' key={childMes.Id}>
                                                        <div className={`time ${childMes.IsFM ? 'hide' : 'show'}`}>{toTimeString(childMes.SentAt)}</div>
                                                        <div className='content'>
                                                            <p className='text-content'>{childMes.Content}</p>
                                                            {childMes.Files.length > 0 && 
                                                        childMes.Files.map((file, i2) => (
                                                            <div className='img-item' key={file.Id} onClick={()=>{showLargeImage(file.LinkFile)}}>
                                                                <img src={file.LinkFile} alt={'img'} />
                                                            </div>
                                                        ))}
                                                        </div>
                                                        <div className={`time ${childMes.IsFM ? 'show' : 'hide'}`}>{toTimeString(childMes.SentAt)}</div>
                                                    </div> : null)
                                            })}
                                        </div>
                                    </div>
                                </> : null)
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {isShowLagerImage && 
                <>
                    <div className='chat-img-modal-bg'></div>
                    <div className='img-in-modal'>
                        <a className='close-img' onClick={()=>{setIsShowLagerImage(false)}}>x</a>
                        <img src={image} alt={'img'} />
                    </div>
                </>}
        </>
    );
};

export default ChatDetailModal;
