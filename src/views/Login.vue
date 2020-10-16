<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="11" sm="6" lg="4" align="center" justify="center">
        <v-card v-if="formType === LOGIN_FORM_TYPE" :elevation="$vuetify.breakpoint.smAndDown ? 0 : 4"  :class="$vuetify.breakpoint.smAndDown ? '': 'login-card'">
          <h1>Welcome Back</h1>
            <v-text-field label="Email" v-model.trim="loginForm.email" :error-messages="emailErrors"  @input="$v.loginForm.email.$touch()" @blur="$v.loginForm.email.$touch()"></v-text-field>
            <v-text-field label="Password" type="password" v-model.trim="loginForm.password" :error-messages="passwordErrors"  @input="$v.loginForm.password.$touch()" @blur="$v.loginForm.password.$touch()" @keydown.enter="login"></v-text-field>
          <v-btn @click="login" color="primary">Log In</v-btn>

          <div class="extras">
            <a :style="{ marginRight: '1rem' }" @click="toggleForm(PASSWORD_RESET_FORM_TYPE)">Forgot Password</a>
            <a @click="toggleForm(SIGNUP_FORM_TYPE)">Create an Account</a>
          </div>
        </v-card>
        <v-card v-else-if="formType === SIGNUP_FORM_TYPE" class="login-card">
          <h1>Get Started</h1>
          <v-text-field label="First Name" v-model.trim="signupForm.firstName" :error-messages="firstNameErrors" @input="$v.signupForm.firstName.$touch()" @blur="$v.signupForm.firstName.$touch()"></v-text-field>
          <v-text-field label="Last Name" v-model.trim="signupForm.lastName" :error-messages="lastNameErrors"  @input="$v.signupForm.lastName.$touch()" @blur="$v.signupForm.lastName.$touch()"></v-text-field>
          <v-text-field label="Email" v-model.trim="signupForm.email" :error-messages="emailErrors"  @input="$v.signupForm.email.$touch()" @blur="$v.signupForm.email.$touch()"></v-text-field>
          <v-text-field label="Password" type="password" v-model.trim="signupForm.password" :error-messages="passwordErrors"  @input="$v.signupForm.password.$touch()" @blur="$v.signupForm.password.$touch()"></v-text-field>
          <v-text-field label="Confirm Password" type="password" v-model.trim="signupForm.passwordConfirm" :error-messages="passwordConfirmErrors"  @input="$v.signupForm.passwordConfirm.$touch()" @blur="$v.signupForm.passwordConfirm.$touch()"></v-text-field>
          <v-btn @click="signup" color="primary">Sign Up</v-btn>
          <div class="extras">
            <a @click="toggleForm(LOGIN_FORM_TYPE)">Back to Log In</a>
          </div>
        </v-card>
        <v-card v-else class="login-card">
          <h1>Password Reset</h1>
          <v-text-field label="Email" v-model.trim="passwordReset.email" :error-messages="emailErrors"  @input="$v.passwordReset.email.$touch()" @blur="$v.passwordReset.email.$touch()"></v-text-field>
          <v-btn @click="sendResetEmail" color="primary">Reset</v-btn>
          <div class="extras">
            <a @click="toggleForm(LOGIN_FORM_TYPE)">Back to Log In</a>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">{{snackbarMessage}}</v-snackbar>
  </v-container>
</template>

<script>
import { auth, usersCollection } from '../firebaseConfig.js';
import { validationMixin } from 'vuelidate';
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

const LOGIN_FORM_TYPE = 'login';
const SIGNUP_FORM_TYPE = 'signup';
const PASSWORD_RESET_FORM_TYPE = 'passwordReset';

export default {
  mixins: [validationMixin],
  created() {
    this.LOGIN_FORM_TYPE = LOGIN_FORM_TYPE;
    this.SIGNUP_FORM_TYPE = SIGNUP_FORM_TYPE;
    this.PASSWORD_RESET_FORM_TYPE = PASSWORD_RESET_FORM_TYPE;
  },
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
        passwordConfirm: ''
      },
      passwordReset: {
        email: '',
      },
      formType: 'login',
      snackbar: false,
      snackbarMessage: '',
      loginError: false,
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
      let emailField;
      if (this.formType === LOGIN_FORM_TYPE) {
        emailField = this.$v.loginForm.email;
      }
      if (this.formType === SIGNUP_FORM_TYPE) {
        emailField = this.$v.signupForm.email;
      }
      if (this.formType === PASSWORD_RESET_FORM_TYPE) {
        emailField = this.$v.passwordReset.email;
      }

      if (!emailField.$dirty) return errors
      !emailField.required && errors.push('An email is required!')
      !emailField.email && errors.push('A valid email is required!')
      return errors
    },
    passwordErrors () {
      const errors = []
      let passwordField;
      if (this.formType === LOGIN_FORM_TYPE) {
        passwordField = this.$v.loginForm.password;
      }
      if (this.formType === SIGNUP_FORM_TYPE) {
        passwordField = this.$v.signupForm.password;
      }
      if (this.formType === PASSWORD_RESET_FORM_TYPE) {
        passwordField = this.$v.passwordReset.password;
      }

      this.loginError && errors.push('Email/Password was not correct')
      if (!passwordField.$dirty) {
        return errors
      }
      !passwordField.required && errors.push('A password is required!')
      if (!this.formType) {
        !passwordField.minLength && errors.push('Password must be at least 8 characters long!')
        !passwordField.containsUppercase && errors.push('Password must contain an upper case letter!')
        !passwordField.containsLowercase && errors.push('Password must contain a lower case letter!')
        !passwordField.containsNumber && errors.push('Password must contain a number!')
        !passwordField.containsSpecial && errors.push('Password must contain one of the following characters: #?!@$%^&*-')
      }
      return errors
    },
    passwordConfirmErrors () {
      const errors = []
      const passwordConfirmField = this.$v.signupForm.passwordConfirm;
      if (!passwordConfirmField.$dirty) return errors
      !passwordConfirmField.required && errors.push('Please confirm your password')
      !passwordConfirmField.sameAsPassword && errors.push('Passwords do not match')
      return errors
    },
  },
  validations() {
    // TODO form type swtich
    if (this.formType === LOGIN_FORM_TYPE) {
      return {
        loginForm: {
          email: {
            required,
            email,
          },
          password: {
            required,
          },
        }
      }
    }
    if (this.formType === SIGNUP_FORM_TYPE) {
      return {
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
          passwordConfirm: {
            required,
            sameAsPassword: sameAs('password')
          }
        }
      }
    }
    if (this.formType === PASSWORD_RESET_FORM_TYPE) {
      return {
        passwordReset: {
          email: {
            required,
            email,
          },
        }
      }
    }
    return {};
  },
  methods: {
    toggleForm(type) {
      this.formType = type;
    },
    login() {
      this.loginError = false;
      auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
        this.$store.commit('setCurrentUser', user.user)
        this.$store.dispatch('fetchUserProfile')
        if (this.$router.currentRoute.query.redirect) {
          this.$router.push(this.$router.currentRoute.query.redirect);
        } else {
          this.$router.push('/')
        }
      }).catch(err => {
        console.log(err)
        this.loginForm.password = '';
        this.loginError = true;
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
    sendResetEmail() {
      auth.sendPasswordResetEmail(this.passwordReset.email).then(() => {
        this.snackbar = true;
        this.snackbarMessage = 'Password reset email sent!';
        this.formType = LOGIN_FORM_TYPE;
      }).catch(function(error) {
        console.log(error);
        // An error happened.
      });
    }
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
