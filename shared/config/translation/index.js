import React from 'react';
import enMessage from './lang/en-us.json';
import viMessage from './lang/vi-vn.json';

const AppLocale = {
    en: {
        locale: 'en-us',
        lang: 'en',
        messages: enMessage
    },
    vi: {
        locale: 'vi-vn',
        lang: 'vi',
        messages: viMessage
    }
};

if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/dist/locale-data/vi');
    require('@formatjs/intl-pluralrules/dist/locale-data/en');
    require('@formatjs/intl-pluralrules/dist/locale-data/ja');
}
if (!Intl.RelativeTimeFormat) {
    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/dist/locale-data/vi');
    require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
    require('@formatjs/intl-relativetimeformat/dist/locale-data/ja');
}

export default AppLocale;