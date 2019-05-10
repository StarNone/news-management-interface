import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pathmsg: []
  },
  mutations: {
    'CHANGE_PATHMSG': function (state, pathmsg) {
      state.pathmsg = pathmsg
    }
  },
  actions: {
    getPathMsg (context, pathmsg) {
      context.commit('CHANGE_PATHMSG', pathmsg)
    }
  }
})

export default store
