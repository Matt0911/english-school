<template>
  <div id="login">
    <section>
      <div class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>

          <label for="email1">Email</label>
          <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />

          <label for="password1">Password</label>
          <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />

          <button @click="login" class="button">Log In</button>

          <div class="extras">
            <a>Forgot Password</a>
            <a @click="toggleForm">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>

          <label for="name">Name</label>
          <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name" />

          <label for="title">Title</label>
          <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />

          <label for="email2">Email</label>
          <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />

          <label for="password2">Password</label>
          <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />

          <button @click="signup" class="button">Sign Up</button>

          <div class="extras">
            <a @click="toggleForm">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  import firebase from 'firebase';
  const fb = require('../firebaseConfig.js');
  export default {
    data() {
      return {
        loginForm: {
          email: '',
          password: ''
        },
        signupForm: {
          name: '',
          title: '',
          email: '',
          password: ''
        },
        showLoginForm: true,
      }
    },
    methods: {
      toggleForm() {
        this.showLoginForm = !this.showLoginForm;
      },
      login() {
        firebase.auth().signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchUserProfile')
          this.$router.push('/userProfile')
        }).catch(err => {
          console.log(err)
        })
      },
      signup() {
        firebase.auth().createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password)
          .then(user => new Promise(resolve => {
            this.$store.commit('setCurrentUser', user.user);
            resolve(user);
          }))
          .then(user => {
            fb.setUserInfo(user.user.uid, () => {
              this.$store.dispatch('fetchUserProfile');
              this.$router.push('/userProfile');
            });
          })
          .catch(err => {
            console.log(err)
          });
      },
      addToDB(data, name, title) {
        firebase.firestore().collection('other').doc(data.user.uid).set({
          name,
          title,
        }).then(() => {
          this.$store.dispatch('fetchUserProfile');
          this.$router.push('/userProfile');
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>