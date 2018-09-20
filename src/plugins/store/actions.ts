import KeySets from './keySets';

export default {
  setWindowSize({commit}: any, windowSize: any) {
    commit(KeySets.SET_WINDOW_SIZE, windowSize);
  }
};
