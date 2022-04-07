export default class GTAG {
    static pageview(url) {
        window.gtag('config', process.env.GA_ID, {
            page_path: url,
        });
    }
    static event({ action, params }) {
        window.gtag('event', action, params);
    }
}
