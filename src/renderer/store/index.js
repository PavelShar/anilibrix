import Vue from 'vue'
import Vuex from 'vuex'
import Storage from 'electron-store'

import {getInitialState} from '@utils/store/state'
import createPromiseAction from '@plugins/vuex-promise-action'
import {createSharedMutations} from 'vuex-electron'
import createPersistedState from "vuex-persistedstate";

import app from './app'
import release from './release'
import releases from './releases'
import notifications from './notifications'

import __merge from 'lodash/merge'
import __throttle from 'lodash/throttle'

Vue.use(Vuex);

const modules = {
  app,
  release,
  releases,
  notifications
};

// Create storage instance
const storage = new Storage({name: 'anilibrix'});

const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
  modules,
  plugins: [
    createPromiseAction(),
    createPersistedState({
      key: 'anilibrix',
      paths: ['app'],
      storage: {
        getItem: (key) => storage.get(key),
        setItem: (key, value) => storage.set(key, value),
        removeItem: (key) => storage.delete(key),
      },
    }),
    createSharedMutations()
  ],
  strict: debug,
  mutations: {

    /**
     * Reset store
     * Replace it with initial values
     * Preserve account details
     *
     * @return void
     */
    RESET_STORE(s) {

      // Get app persisted states
      const account = s.app.account;
      const watch = s.app.watch;

      // Get initial state
      const state = getInitialState(modules);

      // Replace store
      // Merge initial with persisted
      this.replaceState(__merge(state, {app: {account, watch}}));
    }

  },

  actions: {

    /**
     * RESET STORE
     *
     * @param commit
     * @return {Promise<*>}
     * @constructor
     */
    RESET_STORE: async ({commit}) => await commit('RESET_STORE')
  }

});


/**
 * Set user's id on app startup
 *
 * @return {Promise<any>}
 */
const setUserId = () => store.dispatch('app/account/setUserId');


/**
 * Get store
 *
 * @return {Store<unknown>}
 */
const getStore = () => store;


export default store

export {
  getStore,
  setUserId,
}
