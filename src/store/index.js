import Vue from 'vue'
import Vuex from 'vuex'
import {fetch} from '../utils/index'
import api from '../utils/api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pathmsg: [],
    adminMsg: {}
  },
  mutations: {
    'CHANGE_PATHMSG': function (state, pathmsg) {
      state.pathmsg = pathmsg
    },
    'CHANGE_ADMIN_MSG' (state, adminMsg) {
      state.adminMsg = adminMsg
    }
  },
  actions: {
    getPathMsg (context, pathmsg) {
      context.commit('CHANGE_PATHMSG', pathmsg)
    },
    getAdminMsg (context) {
      fetch.get(api.getAdminMsg).then(res => {
        context.commit('CHANGE_ADMIN_MSG', res.data)
      })
    }
  },
  plugins: [
    createPersistedState({ storage: window.sessionStorage })
  ]
})

export default store
