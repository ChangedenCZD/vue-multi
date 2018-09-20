import BrowserUtils from '@/utils/BrowserUtils';
import WindowContext from '@/lib/WindowContext';
import Api from '@/plugins/api';
export default class Context extends WindowContext {
    constructor() {
        super();
        this.context = {
            Api
        };
    }
    get Api() {
        return this.context.Api;
    }
}
Context.browser = BrowserUtils;
//# sourceMappingURL=Context.js.map