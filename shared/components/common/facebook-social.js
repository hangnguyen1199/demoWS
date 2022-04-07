
import { PropTypes } from 'prop-types'
import React, { useEffect, useState } from 'react'
import MessengerCustomerChat from 'react-messenger-customer-chat'
import AppConfig from '../../config/AppConfig';
import constants from '../../config/constants';

function FacebookSocial(props) {

    const { appId, pageId, htmlRef } = props
    const [loadScript, setLoadScript] = useState(false)
    const whitelistMessengerPage =
        constants?.SOCIAL_MEDIA?.FB?.WHITELIST_MESSENGER_PAGE || []
    const currentURL = window.location.pathname
    useEffect(() => {
        setTimeout(() => {
            // const matchRoute = whitelistMessengerPage.filter((e) =>
            //     currentURL.startsWith(e)
            // )
            if (AppConfig.PAGE_ID_FB && AppConfig.AUTH_FACEBOOK_APP_ID) {
                setLoadScript(true)
            }
        }, constants.DELAY_LOAD_SCRIPT_TIME)
    }, [])
    return (
        <div className="facebook-social">
            {loadScript && (
                <MessengerCustomerChat
                    pageId={AppConfig.PAGE_ID_FB}
                    appId={AppConfig.AUTH_FACEBOOK_APP_ID}
                    htmlRef={htmlRef}
                />
            )}
            {/* {loadScript && (
                <LiveChatLoaderProvider
                    provider="messenger"
                    providerKey={appId}>
                    <Messenger
                        color="rgb(255, 195, 0)"
                        loggedInGreeting="What's up?"
                        loggedOutGreeting="What's up?"
                    />
                </LiveChatLoaderProvider>
            )} */}
        </div>
    )
}
FacebookSocial.propTypes = {
    pageId: PropTypes.string.isRequired,
    appId: PropTypes.string.isRequired,

    shouldShowDialog: PropTypes.bool,
    htmlRef: PropTypes.string,
    minimized: PropTypes.bool,
    themeColor: PropTypes.string,
    loggedInGreeting: PropTypes.string,
    loggedOutGreeting: PropTypes.string,
    greetingDialogDisplay: PropTypes.oneOf(['show', 'hide', 'fade']),
    greetingDialogDelay: PropTypes.number,
    autoLogAppEvents: PropTypes.bool,
    xfbml: PropTypes.bool,
    version: PropTypes.string,
    language: PropTypes.string,
    debug: PropTypes.bool,
    onCustomerChatDialogShow: PropTypes.func,
    onCustomerChatDialogHide: PropTypes.func,
}

FacebookSocial.defaultProps = {
    shouldShowDialog: false,
    htmlRef: undefined,
    minimized: undefined,
    themeColor: undefined,
    loggedInGreeting: undefined,
    loggedOutGreeting: undefined,
    greetingDialogDisplay: undefined,
    greetingDialogDelay: undefined,
    autoLogAppEvents: true,
    xfbml: true,
    version: '2.11',
    language: 'en_US',
    debug: false,
    onCustomerChatDialogShow: undefined,
    onCustomerChatDialogHide: undefined,
    appId: '1129453624092561',
    pageId: '103756528218080',
    // htmlRef: '1129453624092561',
}
export default FacebookSocial
