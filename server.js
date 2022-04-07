const { basename } = require('path');
const { parse } = require('url');
const glob = require('glob');
const express = require('express');
const sitemap = require('nextjs-sitemap-generator'); // Import the package

const areIntlLocalesSupported = require('intl-locales-supported').default;
const LANGUAGES = [
    {
        key: 'vi',
        value: 'vi-vn',
    },
    {
        key: 'jp',
        value: 'ja-jp',
    },
    {
        key: 'en',
        value: 'en-us',
    },
]; // or whatever

// Get the supported languages by looking for translations in the `lang/` dir.
const supportedLanguages = glob
    .sync('./shared/config/translation/lang/*.json')
    .map((f) => basename(f, '.json'));

// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(supportedLanguages)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and patch the constructors we need with the polyfills.
        const IntlPolyfill = require('intl');
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
        Intl.__disableRegExpRestore = IntlPolyfill.__disableRegExpRestore;
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}

if (Intl.__disableRegExpRestore) {
    Intl.__disableRegExpRestore();
}


const { readFileSync } = require('fs');
const { createServer } = require('http');
const accepts = require('accepts');
const next = require('next');
const routes = require('./routes');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const localeDataCache = new Map();
const getLocaleDataScript = (locale) => {
    const lang = locale.split('-')[0];
    if (!localeDataCache.has(lang)) {
        const localeDataFile = require.resolve(
            `@formatjs/intl-relativetimeformat/dist/locale-data/${lang}`,
        );
        const localeDataScript = readFileSync(localeDataFile, 'utf8');
        localeDataCache.set(lang, localeDataScript);
    }
    return localeDataCache.get(lang);
};


const getMessages = (locale) => {
    return require(`./shared/config/translation/lang/${locale}.json`);
};

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        var { pathname, query } = parsedUrl;
        var lang = 'vi-vn';
        var isChangePath = false;
        LANGUAGES.forEach((language) => {
            if (
                pathname.startsWith(`/${language.key}/`) ||
                pathname === `/${language.key}`
            ) {
                lang = language.value;
                isChangePath = true;
                if (pathname === `/${language.key}`) {
                    pathname = '/';
                } else {
                    pathname = pathname.replace(`/${language.key}/`, '/');
                }
            }
        });
        query = {
            ...query,
            language: lang,
        };
       
        req.locale = lang; //localeStr;

        if (isChangePath) {
            app.render(req, res, pathname, query);
        } else {
            handler(req, res);
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
