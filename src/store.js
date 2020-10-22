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
        return new Promise((resolve, reject) => {
          fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
            commit('setUserProfile', res.data())
            resolve();
          }).catch(err => {
            console.error(err)
            reject();
          })
        })
      },
      fetchCourses({ commit }) {
        return new Promise((resolve, reject) => {
          fb.coursesCollection.orderBy('order', 'asc').get().then(querySnapshot => {
            const courses = []
            querySnapshot.forEach(doc => {
              courses.push({ id: doc.id, ...doc.data()})
            })
            commit('setCourses', courses)
            resolve()
          }).catch(err => {
            console.error(err)
            reject()
          })
        })
      },
      saveCourse({ commit }, { id, course }) {
        return new Promise((resolve, reject) => {
          fb.coursesCollection.doc(id).set(course).then(() => {
            commit('saveCourse', { id, course })
            resolve()
          }).catch(err => {
            console.error(err)
            reject()
          })
        })
      },
    }, 
    mutations: {
      setCourses(state, courses) {
        state.courses = courses
      },
      saveCourse(state, { id, course }) {
        state.courses = state.courses.map(c => c.id === id ? {...course, id} : c)
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