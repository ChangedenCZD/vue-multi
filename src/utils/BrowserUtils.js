import WindowContext from '../lib/WindowContext';
export default class BrowserUtils extends WindowContext {
    static setAppOS(app) {
        this.$w.os = this.os;
        this.$w.UA = this.UA;
        Object.keys(this.os).forEach((key) => {
            app[key] = this.os[key];
        });
    }
    static reload() {
        window.location.reload();
    }
    static back() {
        if (window.document.referrer) {
            window.history.go(-1);
        }
        else {
            window.opener = null;
            window.open('', '_self');
            window.close();
        }
    }
    static canBack() {
        const referrer = window.document.referrer;
        return referrer && referrer.length > 0;
    }
    static setTitle(title) {
        window.document.title = title;
    }
    static to(url) {
        window.location.href = url;
    }
    static open(url) {
        window.open(url);
    }
}
BrowserUtils.UA = BrowserUtils.$w.navigator.userAgent;
BrowserUtils.os = (() => {
    const ua = BrowserUtils.UA;
    const isWechat = /MicroMessenger/.test(ua);
    const isQQ = /QQ/.test(ua);
    const isTim = /TIM/.test(ua);
    const isUCWeb = /UCBrowser/.test(ua);
    const isAlipay = /AlipayClient/.test(ua);
    const isAndroid = /Android/.test(ua);
    const isFireFox = /(?:Firefox)/.test(ua);
    const isChrome = /(?:Chrome|CriOS)/.test(ua);
    const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
    const isIOS = /(?:iOS)/.test(ua) || /(?:iPhone OS)/.test(ua);
    const isPc = !isPhone && !isAndroid;
    return {
        isTablet,
        isAndroid,
        isIOS,
        isM: isPhone || isAndroid || isTablet || isIOS,
        isPc,
        isChrome,
        isFireFox,
        isWechat,
        isQQ,
        isTim,
        isUCWeb,
        isAlipay
    };
})();
//# sourceMappingURL=BrowserUtils.js.map