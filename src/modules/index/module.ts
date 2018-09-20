import BaseModule from '@/lib/BaseModule';
import HomeLayout from '../../components/home';
import co from 'co';

class Module extends BaseModule {
  constructor() {
    super();
    const Api = this.Api;
    this.setModuleName('module-index');
    this.setProps([]);
    this.setComponent({HomeLayout});
    this.setMethod({
      ...Module.mapActions([]),
      request() {
        co(function* () {
          const res = yield Api.test();
        });
      }
    });
    this.setCompute({
      ...Module.mapGetters({})
    });
    this.setWatch({});
  }

  getData() {
    return {};
  }

  onCreate() {
    super.onCreate(this);
    this.App.request();
  }
}

export default new Module();
