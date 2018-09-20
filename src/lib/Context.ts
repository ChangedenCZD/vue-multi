import BrowserUtils from '@/utils/BrowserUtils';
import WindowContext from '@/lib/WindowContext';
import Api from '@/plugins/api';

export default class Context extends WindowContext {

  static browser: any = BrowserUtils;
  context: any = {
    Api
  };

  constructor() {
    super();
  }

  get Api() {
    return this.context.Api;
  }

}
