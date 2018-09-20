import RouterUtils from './RouterUtils';
import VuexUtils from './VuexUtils';
import BrowserUtils from './BrowserUtils';
import WindowContext from '../lib/WindowContext';

export default class Initiator extends WindowContext {
  static $app: any;

  static registerApp(app: any) {
    this.$app = app;
    this.$w.globalApp = app;
    RouterUtils.parseRoute(app);
    BrowserUtils.setAppOS(app);
    this.setWindowSize();
  }

  static setWindowSize() {
    VuexUtils.emmit(this.$app, 'setWindowSize', {
      width: this.$w.innerWidth,
      height: this.$w.innerHeight
    }).then().catch();
  }
}
