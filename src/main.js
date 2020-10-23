import Vue from 'vue'
import App from './App.vue'
import dayjs from 'dayjs';
import vuetify from './plugins/vuetify';
import router from "./router";
import store from './store.js';
const fb = require('./firebaseConfig.js');


Vue.config.productionTip = false
Vue.filter('formatDate', function(date) {
  if (!date) {
    return date;
  }
  return dayjs(date, 'YYYY-MM-DD').format('MM/DD/YYYY');
});

let app;
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
