import Vue from 'vue';
import router from '@/plugins/router';
import store from '@/plugins/store';
import Initiator from '@/utils/Initiator';

Vue.config.productionTip = false;

const create = (module: any) => {
  const app = new Vue({
    router,
    store,
    render: (h: any) => h(module),
    created() {
      Initiator.registerApp(this);
    }
  });
  app.$mount('#app');
  return app;
};
export default create;
