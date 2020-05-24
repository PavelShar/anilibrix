import Vue from 'vue'
import __get from 'lodash/get'

export default {
  namespaced: true,
  state: {
    items: {},
  },

  mutations: {

    /**
     * Set data
     * Use Vue to keep reactivity
     *
     * @param s
     * @param k
     * @param v
     * @return {*}
     */
    set: (s, {k, v}) => Vue.set(s.items, k, v),


    /**
     * Remove data
     *
     * @param s
     * @param k
     */
    remove: (s, k) => Vue.delete(s.items, k),

},


  getters: {

    /**
     * Get data for provided release and episode
     *
     * @param state
     * @return {function({releaseId?: *, episodeId?: *}=): *|null}
     */
    getWatchData: state => ({releaseId = 0, episodeId = 0} = {}) => __get(state, ['items', `${releaseId}:${episodeId}`]) || null,

  },

  actions: {


    /**
     * Set episode watch data
     *
     * @param commit
     * @param rootState
     * @param time
     * @param quality
     * @param releaseId
     * @param episodeId
     * @param percentage
     * @param isSeen
     * @return {Promise<void>}
     */
    setWatchData: async ({commit, getters, dispatch}, {time = 0, quality = null, releaseId = null, episodeId = -1, percentage = 0} = {}) => {
      if (releaseId && episodeId > -1) {

        // Create episode watch data object
        const data = {time, quality, percentage};

        // If isSeen flag is true -> append it to data object
        // This is one-way flag, can't be reset by changing time and percentage
        if (percentage >= 85) data.isSeen = true;

        // Set local storage data
        commit('set', {k: `${releaseId}:${episodeId}`, v: data});

      }
    },


    /**
     * Set watch package data
     *
     * @param dispatch
     * @param getters
     * @param releaseId
     * @param episodes
     * @return {Promise<void>}
     */
    setWatchPackageData: async ({dispatch, getters}, {releaseId = null, episodes = []} = {}) => {
      if (releaseId && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => {

            const episodeId = episode.id;
            const watchData = getters.getWatchData({releaseId, episodeId});

            // Check if episode is not marked as seen
            if (!watchData || watchData.isSeen !== true) {
              dispatch('setWatchData', {releaseId, episodeId, percentage: 100})
            }

          })
        );
      }
    },


    /**
     * Remove watch data
     *
     * @param commit
     * @param getters
     * @param dispatch
     * @param releaseId
     * @param episodeId
     * @return {Promise<void>}
     */
    removeWatchData: async ({commit, getters, dispatch}, {releaseId = null, episodeId = -1} = {}) => {
      if (releaseId && episodeId > -1) commit('remove', `${releaseId}:${episodeId}`);
    },


    /**
     * Remove watch package data
     *
     * @param dispatch
     * @param getters
     * @param releaseId
     * @param episodes
     * @return {Promise<void>}
     */
    removeWatchPackageData: async ({dispatch, getters}, {releaseId = null, episodes = []} = {}) => {
      if (releaseId && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => dispatch('removeWatchData', {releaseId, episodeId: episode.id}))
        );
      }
    },

  },
}
