import constants from '@spo/config/constants'
import AppActions from '@spo/redux/app/action'
import { Router } from '@spo/routes'
import { scroller } from 'react-scroll'
// import Cookies from 'cookies';
import axios from 'axios'
import * as FileSaver from 'file-saver'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import serverCookies from 'next-cookies'
import { useDispatch } from 'react-redux'
import { END, eventChannel } from 'redux-saga'
import factories from '../../redux/common/factory'
import { redirectToService } from './services/redirect-to-service'
// import { redirectToService } from '@spo/lib/services/redirect-to-service';
import confirmService from '@spo/lib/services/confirm'
import AppConfig from './../config/AppConfig'
import Utils from './../utils/utils'
import $ from 'jquery'
import PageList from '../config/PageList'

export const arrayToString = (arr) => {
    let result = ''
    arr.map((item, index) => {
        if (index + 1 != arr.length) {
            result += `${item},`
        } else {
            result += item
        }
        return item
    })
    return result
}
export const checkValidateArrayOfNumberString = (str) => {
    let array = str.split(',')
    let index = array.findIndex((x) => Number.parseInt(x, 10) >= 0)
    return index == -1
}
export const convertToNumber = (val = '', dot) => {
    if (typeof val == 'string') {
        let newVal = val.replace(/,/g, '')
        if (dot) {
            newVal = val.replace(/\./g, '')
        }
        newVal = Number.parseInt(newVal, 10)
        if (Number.isNaN(newVal)) {
            return 0
        }
        return newVal
    }

    return val
}
export const convertToCurrency = (num) => {
    return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}
export const convertToCurrencyDot = (num) => {
    return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
}
export const getValueCurrency = (ref) => {
    let newVal = ref.current.inputElement.value

    return convertToNumber(newVal)
}
export const setValueCurrency = (ref, val) => {
    ref.current.inputElement.value = val
}
export function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'a')
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'e')
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'i')
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'o')
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u')
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'y')
    str = str.replace(/Đ/g, 'd')
    str = str.toUpperCase()
    return str
}

export const convertStringToString = (str) => {
    let result = ''
    let arr = str.split(',')
    arr.map((item, index) => {
        if (index + 1 != arr.length) {
            result += `'${item}'` + ','
        } else {
            result += `'${item}'`
        }
        return item
    })
    return result
}

export const customRoute = (pathname = '/', params = {}) => {
    const dispatch = useDispatch()
    dispatch(AppActions.callLoading())
    Router.pushRoute(pathname, params).then(() => {
        dispatch(AppActions.closeLoading())
        window.scroll({
            top: 0,
            left: 0,
        })
    })
}

export const decodeJWT = (token) => {
    if (!token) {
        return null
    } else {
        let value = jwtDecode(token)
        return {
            isExpired: value.exp < new Date().getTime() / 1000,
        }
    }
}
export const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        ;(rv[x[key]] = rv[x[key]] || []).push(x)
        return rv
    }, {})
}
//----------------------------------------------
// ROUTE GUARD
//----------------------------------------------
export const routeGuard = async (ctx, type = '') => {
    try {
        const { token } = serverCookies(ctx)

        const jwtDecodeValue = decodeJWT(token)
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
        AppConfig.ACCESS_TOKEN = token
        switch (type) {
            case 'user':
                return await handleForUser(token, jwtDecodeValue, ctx)
            case 'guest':
                return await handleForGuest(token, jwtDecodeValue, ctx)
            case 'order':
                return await handleForOrder(token, jwtDecodeValue, ctx)
            case PageList.ORDER.SERVER:
                return await handleForOrder(token, jwtDecodeValue, ctx)
            case 'user-profile':
                return await handleForUserProfile(token, jwtDecodeValue, ctx)
            case PageList.TRACKING_ORDER.SERVER:
                return await handleForOrderTracking(token, jwtDecodeValue, ctx);
    
            default:
                return handleForDefault(token, jwtDecodeValue, ctx)
        }
    } catch (error) {
        if (error?.response?.status == 401) {
            return redirectToService(ctx, PageList.SIGNIN.SERVER)
        }

        return { props: {} }
    }
}
const handleForGuest = (token, jwtDecodeValue, ctx) => {
    if (token) {
        return redirectToService(ctx, '/')
    }
    return { props: {} }
}
const handleForOrder = async (token, jwtDecodeValue, ctx) => {
    if (!token || jwtDecodeValue.isExpired) {
        Cookies.remove('token')
        AppConfig.ACCESS_TOKEN = ''
        return redirectToService(ctx, PageList.SIGNIN.SERVER)
    }
    // console.log("typeof window",typeof window)
    // if(typeof window == 'undefined'){
    //     return redirectToService(ctx, PageList.CART.SERVER);
    // }
    return { props: {} }
}
const handleForOrderTracking = async (token, jwtDecodeValue, ctx) => {
    if (token || !jwtDecodeValue.isExpired) {
        return redirectToService(ctx, PageList.ORDER_MANAGEMENT.SERVER);
    }
    // console.log("typeof window",typeof window)
    // if(typeof window == 'undefined'){
    //     return redirectToService(ctx, PageList.CART.SERVER);
    // }
    return { props: {} };
};

const handleForUserProfile = async (token, jwtDecodeValue, ctx) => {
    // Nếu không tồn tại token hoặc token hết hạn thì redirect về page đăng nhập
    if (!token || jwtDecodeValue.isExpired) {
        Cookies.remove('token')
        AppConfig.ACCESS_TOKEN = ''
        return redirectToService(ctx, PageList.SIGNIN.SERVER)
    }
    let url = process.env.API_URL
    let res = await axios({
        method: 'GET',
        url: `${url}/auth/user`,
    })
    // // Nếu user chưa đăng nhâp
    // if (!res?.data?.CustomerId) {
    //     Cookies.remove('token');
    //     AppConfig.ACCESS_TOKEN = '';
    //     return redirectToService(ctx, PageList.SIGNIN.SERVER);
    // }
    return { props: {} }
}
const handleForUser = async (token, jwtDecodeValue, ctx) => {
    // Nếu không tồn tại token hoặc token hết hạn thì redirect về page đăng nhập
    if (!token || jwtDecodeValue.isExpired) {
        Cookies.remove('token')
        AppConfig.ACCESS_TOKEN = ''
        return redirectToService(ctx, PageList.SIGNIN.SERVER)
    }
    let url = process.env.API_URL
    let res = await axios({
        method: 'GET',
        url: `${url}/auth/user`,
    })
    return { props: {} }
}
const handleForDefault = async (token, jwtDecodeValue, ctx) => {
    // Nếu không tồn tại token hoặc token hết hạn thì redirect về page đăng nhập
    if (!token || jwtDecodeValue.isExpired) {
        Cookies.remove('token')
        AppConfig.ACCESS_TOKEN = ''
        return redirectToService(ctx, PageList.SIGNIN.SERVER)
    }
    return { props: {} }
}
//----------------------------------------------
//
//----------------------------------------------
export const downloadFile = (data, file_name = 'outfiz_order') => {
    const contentType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const fileExtension = '.xlsx'
    const blob = new Blob([data], { type: contentType })
    FileSaver.saveAs(blob, file_name + fileExtension)
}

export function createUploader(payload) {
    let emit
    const chan = eventChannel((emitter) => {
        emit = emitter
        return () => {}
    })
    const uploadPromise = factories.upload(payload, (event) => {
        if (event.loaded.total === 1) {
            emit(END)
        }
        emit(Math.round((event.loaded / event.total) * 100))
    })

    return [uploadPromise, chan]
}

export function openNewTab(url) {
    window.open(url, '_blank')
}
export function comet(cont, x, y) {
    let _colors = [
        'rgb(0,190,255)', // relaxing blue
        'rgb(255,255,255)', // white
        'rgb(0,160,255)', // another relaxing blue
        'orange', // favorite fruit ;P
        'rgb(240,245,250)', // bluish grey
        'rgb(230,60,0)', // sauce red
    ]
    // var _colors = [
    //     'rgb(0,190,255)',
    //     '#f29d21', // relaxing blue
    //     // 'rgb(240,245,250)', // bluish grey
    //     'rgb(230,60,0)', // sauce red
    //     'yellow'
    // ];
    // number of divs created at a time
    let rnd = random(1, 9, true)
    let wrap = document.createElement('div')
    wrap.className = 'wrap_particle'
    cont.appendChild(wrap)
    for (let i = 0; i < rnd; i++) {
        let pp = document.createElement('div')
        pp.className = 'particle'
        // size
        let d = random(10, 25) // 10-60 is d = diamiter?!?
        pp.style.width = `${d}px`
        pp.style.height = `${d}px`

        // setting coordinates of the div
        pp.style.left = `${x + random(-15, 15) - d / 2}px`
        pp.style.top = `${y + random(-15, 15) - d / 2}px`

        // colors-variations-randomness
        let which_color = random(0, _colors.length - 1, true)
        pp.style.backgroundColor = _colors[which_color]
        pp.style.borderRadius = `${random(10, 50)}%`

        // shift it away to make the animation live
        let shiftX = -i * 18
        let shiftY = i * 18

        // adding a little delay before each animation
        let delay = `${random(10, 40) / 1000}s` // diving by 1000 to convert ms to seconds

        // js variables --> [data injecting] --> css variables
        pp.style.setProperty('--i', delay) //delay
        pp.style.setProperty('--shiftX', `${shiftX}px`) //shift x coords
        pp.style.setProperty('--shiftY', `${shiftY}px`) //shift y coords
        // finally append the div
        wrap.appendChild(pp)
    }
}
export function random(min, max, round) {
    let p = min + Math.random() * (max - min)
    return round ? Math.round(p) : p
}

export function convertRickTextToText(html) {
    html = html.replace(/<style([\s\S]*?)<\/style>/gi, '')
    html = html.replace(/<script([\s\S]*?)<\/script>/gi, '')
    html = html.replace(/<\/div>/gi, '\n')
    html = html.replace(/<\/li>/gi, '\n')
    html = html.replace(/<li>/gi, '  *  ')
    html = html.replace(/<\/ul>/gi, '\n')
    html = html.replace(/<\/p>/gi, '\n')
    html = html.replace(/<br\s*[\/]?>/gi, '\n')
    html = html.replace(/<[^>]+>/gi, '')
    html = html.replace(/&nbsp;/gi, '')
    return html
}

export function getShortDescription(text) {
    let str = convertRickTextToText(text).slice(0, 200)
    let lastIndex = str.lastIndexOf(' ')
    return `${convertRickTextToText(text).slice(0, lastIndex)} ...`
}
export function handleScroll(condition, className) {
    if (condition) {
        if ($(document).height() > $(window).height()) {
            let _scrollTop = $('html').scrollTop()
                ? $('html').scrollTop()
                : $('body').scrollTop()
            $('html').addClass(className).css('top', -_scrollTop)
        }
    } else {
        let _scrollTop = parseInt($('html').css('top'))
        $('html').removeClass(className)
        $('html,body').scrollTop(-_scrollTop)
    }
}
export function scrollTop() {
    window.scroll({
        top: 0,
        left: 0,
    })
}
export function closeTopCart() {
    $('.header-cart').removeClass('_force_show_cart')
}

export function TimeClockFlip(endTime) {
    let dateNow = new Date()
    let secondNow = dateNow.getTime() / 1000
    let date = new Date(endTime)
    let second = date.getTime() / 1000
    if (second > secondNow) {
        return Number.parseInt(second - secondNow)
    }
    return 0
}
// scroll to error on submit
export const scrollToRef = (scrollOffset, ref) => {
    ref.current.scrollLeft += scrollOffset
    ref.current.style.scrollBehavior = 'smooth'
}

export function scrollToFirstError(errors) {
    const errorFields = getErrorFieldNames(errors)
    for (let i = 0; i < errorFields.length; i++) {
        const fieldName = `${errorFields[i]}`
        if (document.querySelectorAll(`[name="${fieldName}"]`).length) {
            if (fieldName == 'FileImage') {
                scroller.scrollTo('OtherPosition', {
                    offset: -300,
                    smooth: true,
                })
            } else {
                scroller.scrollTo(fieldName, { offset: -300, smooth: true })
            }
            break
        }
    }
}

//   get name object fieldNameError
function getErrorFieldNames(obj, name = '') {
    const errorArr = []
    errorArr.push(
        Object.keys(obj)
            .map((key) => {
                const next = obj[key]
                if (next) {
                    if (typeof next === 'string') {
                        return name + key
                    }
                    if (next.map) {
                        errorArr.push(
                            next
                                .map((item, index) =>
                                    getErrorFieldNames(
                                        item,
                                        `${name}${key}[${index}].`
                                    )
                                )
                                .filter((o) => o)
                        )
                    }
                }
                return null
            })
            .filter((o) => o)
    )
    return flatten(errorArr)
}

function flatten(arr) {
    return arr.reduce(
        (flat, toFlatten) =>
            flat.concat(
                Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
            ),
        []
    )
}

export const EffectCart = (_this) => {
    // const addToCartImg = document.querySelector('.slick-current .img-ref-cart');
    const addToCartImg = $(_this.target)
        .parents('.item-detail')
        .find('.slick-current .img-ref-cart')[0]
    const hdCart = document.getElementById('menu-cart-header-view')
    const hdCartIcon = hdCart && hdCart.querySelector('svg')

    if (!addToCartImg || !hdCart || !hdCartIcon) {
        return
    }

    const {
        top: cartIconTop,
        left: cartIconLeft,
        width: cartIconWidth,
    } = hdCartIcon.getBoundingClientRect()
    const pdImgClone = addToCartImg.cloneNode(true)
    pdImgClone.style.position = 'fixed'
    pdImgClone.style.zIndex = 99999999

    setTimeout(() => {
        document.body.appendChild(pdImgClone)
        pdImgClone.animate(
            [
                {
                    width: `100%`,
                    top: `0px`,
                    left: `0px`,
                    opacity: 0.35,
                },
                {
                    width: `${cartIconWidth}px`,
                    top: `${cartIconTop + hdCart.offsetHeight / 2}px`,
                    left: `${cartIconLeft - hdCart.offsetWidth / 2}px`,
                    opacity: 0.35,
                },
            ],
            {
                duration: 500,
                easing: 'ease-in-out',
            }
        ).onfinish = (e) => {
            e.target.effect.target.remove()

            hdCart.style.animation = 'shake 0.5s'
            setTimeout(() => {
                hdCart.style.animation = 'unset'
            }, 1000)
        }
    }, 100)
}
