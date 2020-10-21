<template>
  <div class="page">
    <h1 class="pageTitle">Register</h1>
    <div class="pageContent">
      <v-text-field label="First Name" v-model="firstName" :error-messages="firstNameErrors" @input="$v.firstName.$touch()" @blur="$v.firstName.$touch()"></v-text-field>
      <v-text-field label="Last Name" v-model="lastName" :error-messages="lastNameErrors"  @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()"></v-text-field>
      <v-select :items="courseOptions" item-text="name" item-value="id" v-model="selectedCourse" label="Course"/>
      <v-btn color="primary" @click="submitRegistration" :loading="isSubmitting">Submit</v-btn>
    </div>
    <v-snackbar v-model="showSuccess" color="success">Submitted Successfully!</v-snackbar>
    <v-snackbar v-model="showFailure" color="error">Failed to submit! Please try again later</v-snackbar>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators'
import { firebase, coursesCollection } from '../firebaseConfig.js';

export default {
  mixins: [validationMixin],
  name: "registration",
  data: () => ({
    firstName: '',
    lastName: '',
    selectedCourse: '',
    isSubmitting: false,
    showSuccess: false,
    showFailure: false,
  }),
  methods: {
    submitRegistration: function() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const registrationInfo = {
          userUID: this.$store.state.currentUser.uid,
          firstName: this.firstName,
          lastName: this.lastName,
        }
        console.log(registrationInfo);
        this.isSubmitting = true
        coursesCollection.doc(this.selectedCourse)
          .update({
            registrations:  firebase.firestore.FieldValue.arrayUnion(registrationInfo)
          })
          .then(() => {
            this.showSuccess = true;
            this.showFailure = false;
            this.$v.$reset()
            this.firstName = ''
            this.lastName = ''
          })
          .catch(err => {
            this.showFailure = true;
            this.showSuccess = false;
            console.error(err)
          })
          .finally(() => {
            this.isSubmitting = false;
          })
      }
    },
    fetchCourse: function(id) {
      const course =this.$store.state.courses.find(c => c.id == id);
      if (course) {
        this.selectedCourse = course.name;
      }
    }
  },
  mounted: function() {
    if (this.$route.query.courseId) {
      this.fetchCourse(this.$route.query.courseId);
    }
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    selectedCourse: {
      required,
    },
  },
  computed: {
    firstNameErrors () {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.required && errors.push('You must enter a first name!')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push('You must enter a last name!')
      return errors
    },
    selectedCourseErrors () {
      const errors = []
      if (!this.$v.selectedCourse.$dirty) return errors
      !this.$v.selectedCourse.required && errors.push('You must select a course!')
      return errors
    },
    courseOptions() {
      return this.$store.state.courses;
    }
  },
};
</script>

<style lang="scss">
.pageContent {
  margin: 0 20px 10px 20px;
}
.v-snack__content {
  justify-content: center;
}
</style>

