<template>
  <div class="page">
    <h1 class="pageTitle">Register</h1>
    <div class="pageContent">
      <v-text-field label="First Name" v-model="firstName" :error-messages="firstNameErrors" @input="$v.firstName.$touch()" @blur="$v.firstName.$touch()"></v-text-field>
      <v-text-field label="Last Name" v-model="lastName" :error-messages="lastNameErrors"  @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()"></v-text-field>
      <v-select :items="courseOptions" v-model="selectedCourse" label="Course"/>
      <v-btn color="primary" @click="submitRegistration" :loading="isSubmitting">Submit</v-btn>
    </div>
    <v-snackbar v-model="showSuccess" color="success">Submitted Successfully!</v-snackbar>
    <v-snackbar v-model="showFailure" color="error">Failed to submit! Please try again later</v-snackbar>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators'
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
        const json = {
          firstName: this.firstName,
          lastName: this.lastName,
          course: this.selectedCourse,
        }
        console.log(json);
        this.isSubmitting = true
        setTimeout(() => {
          const success = this.isSubmitting
          if (success) {
            this.showSuccess = true;
            this.showFailure = false;
            this.$v.$reset()
            this.firstName = ''
            this.lastName = ''
          } else {
            this.showFailure = true;
            this.showSuccess = false;
          }
          this.isSubmitting = false;
        }, 1000)
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
      return this.$store.state.courses.map(c => c.name);
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

