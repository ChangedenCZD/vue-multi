import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/plugins/store/actions';
import getters from '@/plugins/store/getters';
import KeySets from '@/plugins/store/keySets';

Vue.use(Vuex);
const state = {
  windowSize: {}
};
const mutations = {
  [KeySets.SET_WINDOW_SIZE](state: any, windowSize: any) {
    state.windowSize = windowSize;
  }
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
