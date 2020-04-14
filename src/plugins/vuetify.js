import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme:{
    themes: {
      light: {
        primary: '#f44336',
        secondary: '#2196f3',
        accent: '#03a9f4',
        error: '#ff5722',
        warning: '#ff9800',
        info: '#00bcd4',
        success: '#4caf50'
      }
    }
  } 
});
