<template>
  <v-app>
    // <div id="app">
    //   <div id="nav">
    //     <router-link to="/">Home</router-link> |
    //     <router-link to="/courses">Courses</router-link> |
    //     <router-link to="/about">About</router-link>
    //   </div>
    //   <router-view />
    // </div>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

 <script>
// import Vue from 'vue';
// import Vuetify from 'vuetify/lib';
// // import 'vuetify/src/styles/main.sass';
// // import VueMaterial from 'vue-material'
// // import 'vue-material/dist/vue-material.min.css'
// // import 'vue-material/dist/theme/default.css'
// Vue.use(Vuetify, {
//   iconFont: 'md',
// });
// export default {
//   name: "app"
// }
 </script>

 <style lang="scss">
// @import '../node_modules/vuetify/dist/vuetify.min';

// body, html {
//   @extend .grey;
//   @extend .lighten-4;
//   padding: 0;
//   margin: 0;
//   width: 100%;
//   min-height: 100%; // add this rule
// }

// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;


//   .pageTitle {
//     @extend .display-3;
//     @extend .font-weight-bold;
//     @extend .cyan--text;
//     @extend .text--darken-1;
//   }

//   .pageContent {
//     margin: 0 20px 10px 20px;
//   }

//   .baseButton {
//     border-radius: 5px;
//   }
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>

