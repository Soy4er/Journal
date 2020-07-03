import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logs: [],
  },
  mutations: {
    UPDATE_LOGS(state, logs) {
      state.logs = logs;
      this.commit('UPDATE_LOCALSTORAGE');
    },
    CLEAR_LOGS(state) {
      state.logs = [];
      this.commit('UPDATE_LOCALSTORAGE');
    },
    CREATE_LOG(state, log) {
      state.logs = [...state.logs, log];
      this.commit('UPDATE_LOCALSTORAGE');
    },
    UPDATE_LOCALSTORAGE(state) {
      localStorage.setItem('logs', JSON.stringify(state.logs));
    },
  },
  actions: {
    initApp() {
      const logs = JSON.parse(localStorage.getItem('logs'));
      if (logs) {
        this.commit('UPDATE_LOGS', logs);
      }
    },
  },
  getters: {
    logsSortByDate(state) {
      return state.logs.sort((a, b) => b.date - a.date);
    },
  },
  modules: {},
});
