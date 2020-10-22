<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="course-card" :elevation="hover ? 4 : 2">
      <v-container fluid pa-0>
        <v-layout column justify-space-between ma-0>
          <v-card-title v-if="!isEditing">
            <div class="headline">{{course.name}}</div>
            <div class="course-times">{{`${course.startTime} - ${course.endTime}`}}</div>
            <div class="course-dates">{{`${course.startDate} - ${course.endDate}`}}</div>
          </v-card-title>
          <v-card-title v-else>
            <v-text-field label="CourseName" v-model.trim="name"></v-text-field>
            <div class="course-dates">{{`${startDate} - ${endDate}`}}</div>
            <v-date-picker v-model="startDate"></v-date-picker>
            <v-date-picker v-model="endDate"></v-date-picker>
          </v-card-title>
          <v-card-text>{{course.description}}</v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn v-if="shouldUserHaveAccess(['admin'])" @click="isEditing ? saveCourse() : isEditing = !isEditing" text color="blue">{{isEditing ? 'Save' : 'Edit'}}</v-btn>
            <v-btn text :to="'/courses/' + course.id" color="blue">Details</v-btn>
            <v-btn text :to="'/register?courseId=' + course.id" color="green">Register</v-btn>
          </v-card-actions>
        </v-layout>
      </v-container>
    </v-card>
  </v-hover>
</template>

<script>
import { shouldUserHaveAccess } from '../utils';
export default {
  name: "CourseCard",
  props: {
    course: Object,
  },
  data() {
    const { startDate, endDate, startTime, endTime } = this.course;
    return {
      isEditing: false,
      ...this.course,
      startDate,
      endDate,
      startTime,
      endTime,
    }
  },
  methods: {
    shouldUserHaveAccess,
    async saveCourse() {
      const { name, description, order, startDate = '', endDate = '', startTime = '', endTime = '' } = this;
      await this.$store.dispatch('saveCourse', {
        id: this.course.id,
        course: {
          name,
          description,
          order,
          startDate,
          endDate,
          startTime,
          endTime,
        }
      })
      this.isEditing = false;
    },
  }
};
</script>

<style lang="scss" scoped>
  .course-card {
    display: inline-block;
    margin: 10px;
    height: 90%;
    width: 90%;

    .v-card__title {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
