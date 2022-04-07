import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import LanguageSwitcherActions from '@spo/redux/language-switcher/action';


const ConnectedIntlProvider = props => {
    const { locale, lang, messages } = useSelector(
        state => state.LanguageSwitcher.lang
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.locale !== locale) {
            dispatch(LanguageSwitcherActions.switchLanguage(props.locale));
        }
    }, []);

    return (
        <IntlProvider
            locale={lang}
            key={lang}
            messages={messages}
        >
            {props.children}
        </IntlProvider>
    );
};

ConnectedIntlProvider.propTypes = {
    locale: PropTypes.string
}

ConnectedIntlProvider.defaultProps = {
    locale: 'vi-vn'
}

export default ConnectedIntlProvider;