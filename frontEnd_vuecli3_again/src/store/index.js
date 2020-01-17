import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// user:localStorage.getItem("user")
const state = {
  user:JSON.parse(localStorage.getItem("user"))
}

const mutations = {
  SAVE_USERINFO(state,user){
    localStorage.setItem("user",JSON.stringify(user));
    state.user = user;
  }
}

export default new Vuex.Store({
  state,
  mutations
})

// export default new Vuex.Store({
//   state: {
//     // 不需要使用JSON.parse() ???
//     user:JSON.parse(localStorage.getItem("user")),
//     age:1,
//     // user:1
//   },
//   mutations: {
//     SAVE_USERINFO(state,userInfo){
//       localStorage.setItem("user",JSON.stringify(userInfo));
//       state.user = userInfo;
//       // console.log("mutations:" , sessionStorage.getItem("user"))
//       // console.log("state:",state.user);
//     }
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
