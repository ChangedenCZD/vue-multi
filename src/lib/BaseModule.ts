import Context from '@/lib/Context';
import {mapActions as actions, mapGetters as getter} from 'vuex';
import RouterUtils from '@/utils/RouterUtils';
import BrowserUtils from '@/utils/BrowserUtils';

export default class BaseModule extends Context {
  static mapActions = actions;
  static mapGetters = getter;
  App: any = undefined;
  name: string = 'ModuleLayout';
  props: Array<string> = [];
  watch: any = {};
  methods: any = {};
  components: any = {};
  computed: any = {};
  data: Function;
  created: Function;
  mounted: Function = this.onMount;
  updated: Function = this.onUpdate;

  get app() {
    return this.App;
  }

  constructor() {
    super();
    const self: BaseModule = this;
    const getData: Function = self.getData;
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

  setProps(props: Array<string>) {
    this.props = props;
  }

  getData() {
    return {};
  }

  onCreate(app: any) {
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

  setWatch(options: any) {
    this.watch = options || {};
  }

  setMethod(options: any) {
    this.methods = options || {};
  }

  setComponent(options: any) {
    this.components = options || {};
  }

  setCompute(options: any) {
    this.computed = options || {};
  }

  setModuleName(name: string) {
    this.name = name;
  }
}
