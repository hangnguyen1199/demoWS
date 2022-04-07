const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');
const withOptimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
// const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
// const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const PageList = require('./shared/config/PageList');

const pathx = (d) => path.join(__dirname, d);
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

// next.js custom configuration goes here
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        REDIRECT_TO_APP: process.env.REDIRECT_TO_APP,
        APP_ANDROID: process.env.APP_ANDROID,
        APP_IOS: process.env.APP_IOS,
        API_KEY: process.env.API_KEY,
        GA_ID: process.env.GA_ID,
    },
    webpack: (config, options) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@spo/redux': pathx('./redux'),
            '@spo/config': pathx('./shared/config'),
            '@spo/components': pathx('./shared/components'),
            '@spo/containers': pathx('./shared/containers'),
            '@spo/routes': pathx('./routes'),
            '@spo/lib': pathx('./shared/library'),
            '@spo/public': pathx('./public'),
            '@spo/icons': pathx('./shared/components/common/icons'),
        };

        return config;
    },
    exportPathMap: (defaultPathMap) => {
        const pathMap = {};

        Object.entries(defaultPathMap).forEach(([key, value]) => {
            pathMap[key] = value;
            LANGUAGES.forEach((language) => {
                pathMap[`/${language.key}${key}`] = {
                    ...value,
                    query: { language: language.value },
                };
            });
        });

        return pathMap;
    },
    cssLoaderOptions: {
        url: true,
    },
    distDir: 'build',
    trailingSlash: false,
    generateBuildId: async () => {
        if (process.env.BUILD_ID) {
            return process.env.BUILD_ID;
        } else {
            return `${new Date().getTime()}`;
        }
    },
    images: {
        domains: ['http://localhost'],
    },
};

module.exports = withPlugins(
    [
        [
            withTM,
            {
                transpileModules: [
                    '@spo/components',
                    '@spo/config',
                    '@spo/lib',
                    '@spo/redux',
                    '@spo/containers',
                    '@spo/public',
                    '@formatjs/intl-relativetimeformat',
                    '@formatjs/intl-utils',
                    'react-intl',
                    'intl-format-cache',
                    'intl-messageformat-parser',
                    'intl-messageformat',
                ],
            },
        ],
        withOptimizedImages,
        [
            withBundleAnalyzer,
            {
                analyzeServer: ['server', 'both'].includes(
                    process.env.BUNDLE_ANALYZE
                ),
                analyzeBrowser: ['browser', 'both'].includes(
                    process.env.BUNDLE_ANALYZE
                ),
                bundleAnalyzerConfig: {
                    server: {
                        analyzerMode: 'static',
                        reportFilename: '../bundles/server.html',
                    },
                    browser: {
                        analyzerMode: 'static',
                        reportFilename: '../bundles/client.html',
                    },
                },
            },
        ],
        // withCSS,
        withFonts,
        [
            {
                async rewrites() {
                    let arr = [];
                    // eslint-disable-next-line no-restricted-syntax
                    for (const [key, value] of Object.entries(PageList)) {
                        console.log(`${key}: ${value}`);
                        arr.push({
                            source: value.SERVER,
                            destination: value.DESTINATION,
                        });
                    }
                    return arr;
                },
            },
        ],
    ],
    nextConfig
);
