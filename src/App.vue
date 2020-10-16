<template>
  <v-app>
    <v-app-bar
      app
      :color="$vuetify.breakpoint.smAndDown ? 'primary' : 'white'"
      :dark="$vuetify.breakpoint.smAndDown ? false : false"
      clipped-left
      elevate-on-scroll
    >
      <v-btn fixed class="menu-button" v-if="$vuetify.breakpoint.smAndDown" icon @click.stop="showMenu = !showMenu">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <div :class="{'d-flex': true, 'flex-grow-1':  $vuetify.breakpoint.smAndDown, 'align-center': $vuetify.breakpoint.smAndDown, 'justify-center': true}">
        <router-link to="/" :class="{'title-home': true, 'white--text': $vuetify.breakpoint.smAndDown, 'display-1': true}">
          <v-img src="Title.jpg" max-width="250" :max-height="$vuetify.breakpoint.smAndDown ? '56' : '64'" />
        </router-link>
      </div>
      <div class="nav-button-container" v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn-toggle group>
          <v-btn text to="/courses">Courses</v-btn>
          <v-btn text to="/register">Register</v-btn>
          <v-btn text to="/about">About</v-btn>
        </v-btn-toggle>
      </div>
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
      <v-menu offset-y="" v-if="$vuetify.breakpoint.mdAndUp">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="$store.state.currentUser" to="/userProfile">
            <v-list-item-title>User Profile</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.currentUser" @click="signOut">
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!$store.state.currentUser" to="/login">
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-show="$vuetify.breakpoint.smAndDown" :app="$vuetify.breakpoint.smAndDown" clipped v-model="showMenu" top>
      <v-list
        dense
        nav
      >
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/courses">
          <v-list-item-icon>
            <v-icon>mdi-bookshelf</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Courses</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/register">
          <v-list-item-icon>
            <v-icon>mdi-book-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/userProfile">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>User Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="signOut">
          <v-list-item-content>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { auth } from './firebaseConfig.js';

export default {
  name: 'App',

  data () {
    return {
      showMenu: true,
    }
  },
  methods: {
    signOut () {
      if (auth.currentUser) {
        auth.signOut().then(() => {
          this.$store.commit('setCurrentUser', undefined);
          this.$store.commit('setUserProfile', undefined);
          console.log(this.$router.currentRoute);
          this.$router.push(this.$router.currentRoute);
        }).catch(function(error) {
          console.log(error);
          // An error happened.
        });
      }
    },
  }
};
</script>

<style lang="scss">
html {
  overflow: auto !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;



  .pageContent {
    margin: 10px 20px 10px 20px;
  }

  .baseButton {
    border-radius: 5px;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.title-home {
  text-decoration: none;
}
.v-btn.menu-button {
  padding-left: 0;
  left: 0.5rem;
}
.nav-item {
  text-decoration: none;
  text-align: left;
}
.nav-button-container {
  margin-left: 2rem;
}
.v-navigation-drawer {
  border-right: solid #eee 1px;
}
</style>
