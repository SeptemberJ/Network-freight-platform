import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// import router from '../router/index'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  userInfo: {},
  siderIdx: '1-1',
  ImgURL_PREFIX: 'http://120.27.3.205/'
}
// actions
const actions = {
  updateUserInfo ({commit, state}, UserInfo) {
    commit('setUserInfo', UserInfo)
  },
  changeSiderIdx ({commit, state}, SiderIdx) {
    commit('setSiderIdx', SiderIdx)
  }
}

// mutations
const mutations = {
  setUserInfo (state, UserInfo) {
    state.userInfo = UserInfo
  },
  setSiderIdx (state, SiderIdx) {
    state.siderIdx = SiderIdx
  }
}

export default new Vuex.Store({
  state,
  modules: {
  },
  actions,
  mutations,
  plugins: [vuexLocal.plugin]
})
