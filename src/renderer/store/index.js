import Vue from 'vue'
import Vuex from 'vuex'

import {createPersistedState, createSharedMutations} from 'vuex-electron'
import {getInitialState} from '@utils/store'
import createPromiseAction from '@plugins/vuex-promise-action'

import app from './app'
import player from './player'
import search from './search'
import release from './release'
import releases from './releases'
import notifications from './notifications'

Vue.use(Vuex);

const modules = {
  app,
  search,
  player,
  release,
  releases,
  notifications
};

const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
  modules,
  plugins: [
    createPromiseAction(),
    createPersistedState({
      invertIgnored: true,
      ignoredPaths: ['app'],
    }),
    createSharedMutations()
  ],
  strict: debug,
  mutations: {
    RESET_STORE() {
      this.replaceState(getInitialState(modules))
    }
  }
});

export default store
