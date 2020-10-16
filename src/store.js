import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      courses: [],
      currentUser: null,
      userProfile: {}
    },
    actions: {
      fetchUserProfile({ commit, state }) {
        fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
          commit('setUserProfile', res.data())
        }).catch(err => {
          console.log(err)
        })
      },
      fetchCourses({ commit }) {
        fb.coursesCollection.orderBy('order', 'asc').get().then(querySnapshot => {
          const courses = []
          querySnapshot.forEach(doc => {
            courses.push({ id: doc.id, ...doc.data()})
          })
          commit('setCourses', courses)
        })
      }
    }, 
    mutations: {
      setCourses(state, val) {
        state.courses = val
      },
      setCurrentUser(state, val) {
        state.currentUser = val
      },
      setUserProfile(state, val) {
        state.userProfile = val
      }
    },
    plugins: [createPersistedState()],
})