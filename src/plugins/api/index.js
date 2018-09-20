import Api from '@/plugins/api/options';
import Url from '@/plugins/api/url';
import Method from '@/plugins/api/method';
export default {
    test() {
        return new Api().setUrl(Url.TEST).setParams({
            'family': 'Lato:400,700,400italic'
        }).setMethod(Method.GET).request();
    }
};
//# sourceMappingURL=index.js.map