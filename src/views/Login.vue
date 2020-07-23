<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="11" sm="6" lg="4" align="center" justify="center">
        <v-card v-if="showLoginForm" :elevation="$vuetify.breakpoint.smAndDown ? 0 : 4"  :class="$vuetify.breakpoint.smAndDown ? '': 'login-card'">
        <h1>Welcome Back</h1>
          <v-text-field label="Email" v-model.trim="loginForm.email" :error-messages="emailErrors"  @input="$v.loginForm.email.$touch()" @blur="$v.loginForm.email.$touch()"></v-text-field>
          <v-text-field label="Password" type="password" v-model.trim="loginForm.password" :error-messages="passwordErrors"  @input="$v.loginForm.password.$touch()" @blur="$v.loginForm.password.$touch()"></v-text-field>
        <v-btn @click="login" color="primary">Log In</v-btn>

        <div class="extras">
          <a :style="{ marginRight: '1rem' }">Forgot Password</a>
          <a @click="toggleForm">Create an Account</a>
        </div>
        </v-card>
        <v-card v-else class="login-card">
          <h1>Get Started</h1>
          <v-text-field label="First Name" v-model.trim="signupForm.firstName" :error-messages="firstNameErrors" @input="$v.signupForm.firstName.$touch()" @blur="$v.signupForm.firstName.$touch()"></v-text-field>
          <v-text-field label="Last Name" v-model.trim="signupForm.lastName" :error-messages="lastNameErrors"  @input="$v.signupForm.lastName.$touch()" @blur="$v.signupForm.lastName.$touch()"></v-text-field>
          <v-text-field label="Email" v-model.trim="signupForm.email" :error-messages="emailErrors"  @input="$v.signupForm.email.$touch()" @blur="$v.signupForm.email.$touch()"></v-text-field>
          <v-text-field label="Password" type="password" v-model.trim="signupForm.password" :error-messages="passwordErrors"  @input="$v.signupForm.password.$touch()" @blur="$v.signupForm.password.$touch()"></v-text-field>
          <v-text-field label="Confirm Password" type="password" v-model.trim="signupForm.password2" :error-messages="password2Errors"  @input="$v.signupForm.password2.$touch()" @blur="$v.signupForm.password2.$touch()"></v-text-field>
          <v-btn @click="signup" color="primary">Sign Up</v-btn>
          <div class="extras">
            <a @click="toggleForm">Back to Log In</a>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth, usersCollection } from '../firebaseConfig.js';
import { validationMixin } from 'vuelidate';
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        firstName: '',
        LastName: '',
        title: '',
        email: '',
        password: '',
        password2: ''
      },
      showLoginForm: true,
    }
  },
  computed: {
    firstNameErrors () {
      const errors = []
      if (!this.$v.signupForm.firstName.$dirty) return errors
      !this.$v.signupForm.firstName.required && errors.push('You must enter a first name!')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.signupForm.lastName.$dirty) return errors
      !this.$v.signupForm.lastName.required && errors.push('You must enter a last name!')
      return errors
    },
    emailErrors () {
      const errors = []
      const emailField = this.$v[this.showLoginForm ? 'loginForm' : 'signupForm'].email;
      if (!emailField.$dirty) return errors
      !emailField.required && errors.push('An email is required!')
      !emailField.email && errors.push('A valid email is required!')
      return errors
    },
    passwordErrors () {
      const errors = []
      const passwordField = this.$v[this.showLoginForm ? 'loginForm' : 'signupForm'].password;
      if (!passwordField.$dirty) return errors
      !passwordField.required && errors.push('A password is required!')
      if (!this.showLoginForm) {
        !passwordField.minLength && errors.push('Password must be at least 8 characters long!')
        !passwordField.containsUppercase && errors.push('Password must contain an upper case letter!')
        !passwordField.containsLowercase && errors.push('Password must contain a lower case letter!')
        !passwordField.containsNumber && errors.push('Password must contain a number!')
        !passwordField.containsSpecial && errors.push('Password must contain one of the following characters: #?!@$%^&*-')
      }
      return errors
    },
    password2Errors () {
      const errors = []
      const password2Field = this.$v.signupForm.password2;
      if (!password2Field.$dirty) return errors
      !password2Field.required && errors.push('Please confirm your password')
      !password2Field.sameAsPassword && errors.push('Passwords do not match')
      return errors
    },
  },
  validations() {
    return this.showLoginForm ? {
      loginForm: {
        email: {
          required,
          email,
        },
        password: {
          required,
        },
      }
    } : {
      signupForm: {
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(8),
          containsUppercase: function(value) {
            return /[A-Z]/.test(value)
          },
          containsLowercase: function(value) {
            return /[a-z]/.test(value)
          },
          containsNumber: function(value) {
            return /[0-9]/.test(value)
          },
          containsSpecial: function(value) {
            return /[#?!@$%^&*-]/.test(value)
          }
        },
        password2: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    login() {
      auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
        this.$store.commit('setCurrentUser', user.user)
        this.$store.dispatch('fetchUserProfile')
        this.$router.push('/userProfile')
      }).catch(err => {
        console.log(err)
      })
    },
    signup() {
      auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password)
        .then(user => new Promise(resolve => {
          this.$store.commit('setCurrentUser', user.user);
          resolve(user.user);
        }))
        .then(user => {
          usersCollection.doc(user.uid).set({
            firstName: this.signupForm.firstName,
            lastName: this.signupForm.lastName,
          }).then(() => {
            this.$store.dispatch('fetchUserProfile');
            this.$router.push('/userProfile');
          })
        })
        .catch(err => {
          console.log(err)
        });
    },
  }
}
</script>

<style lang="scss">
.login-card {
  padding: 2rem;
  margin-top: 2rem;
}

.extras {
  margin-top: 1rem;
}
</style>
