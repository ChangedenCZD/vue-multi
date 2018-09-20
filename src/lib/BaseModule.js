import Context from '@/lib/Context';
import { mapActions as actions, mapGetters as getter } from 'vuex';
import RouterUtils from '@/utils/RouterUtils';
import BrowserUtils from '@/utils/BrowserUtils';
export default class BaseModule extends Context {
    constructor() {
        super();
        this.App = undefined;
        this.name = 'ModuleLayout';
        this.props = [];
        this.watch = {};
        this.methods = {};
        this.components = {};
        this.computed = {};
        this.mounted = this.onMount;
        this.updated = this.onUpdate;
        const self = this;
        const getData = self.getData;
        this.data = function () {
            self.App = this;
            return getData();
        };
        this.created = function () {
            self.App = this;
            self.onCreate(undefined);
        };
        this.mounted = function () {
            self.onMount();
        };
        this.updated = function () {
            self.onUpdate();
        };
    }
    get app() {
        return this.App;
    }
    setProps(props) {
        this.props = props;
    }
    getData() {
        return {};
    }
    onCreate(app) {
        app = app || this;
        if (app instanceof BaseModule) {
            app = app.App;
        }
        RouterUtils.parseRoute(app);
        BrowserUtils.setAppOS(app);
    }
    onMount() {
    }
    onUpdate() {
    }
    setWatch(options) {
        this.watch = options || {};
    }
    setMethod(options) {
        this.methods = options || {};
    }
    setComponent(options) {
        this.components = options || {};
    }
    setCompute(options) {
        this.computed = options || {};
    }
    setModuleName(name) {
        this.name = name;
    }
}
BaseModule.mapActions = actions;
BaseModule.mapGetters = getter;
//# sourceMappingURL=BaseModule.js.map