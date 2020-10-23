<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="course-card" :elevation="hover ? 4 : 2">
      <v-container fluid pa-0>
        <v-layout column justify-space-between ma-0>
          <v-card-title v-if="!isEditing">
            <div class="headline">{{course.name}}</div>
            <div class="course-times">{{`${course.startTime} - ${course.endTime}`}}</div>
            <div class="course-dates"><span>{{course.startDate | formatDate}}</span>-<span>{{course.endDate | formatDate}}</span></div>
          </v-card-title>
          <v-card-title v-else>
            <v-text-field label="CourseName" v-model.trim="name"></v-text-field>
            <div class="course-dates">{{`${startDate} - ${endDate}`}}</div>
            <TimePickerModal :time="startTime" label="Start Time" v-on:time-changed="startTime = $event"></TimePickerModal>
            <TimePickerModal :time="endTime" label="End Time" v-on:time-changed="endTime = $event"></TimePickerModal>
            <DatePickerModal :date="startDate" label="Start Date" v-on:date-changed="startDate = $event"></DatePickerModal>
            <DatePickerModal :date="endDate" label="End Date" v-on:date-changed="endDate = $event"></DatePickerModal>
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
import DatePickerModal from '@/components/DatePickerModal.vue';
import TimePickerModal from '@/components/TimePickerModal.vue';
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
  },
  components: {
    DatePickerModal,
    TimePickerModal,
  }
};
</script>

<style lang="scss" scoped>
  .course-card {
    margin: 0.5rem;
    height: calc(100% - 1rem);

    .container {
      height: 100%;
      .layout {
        height: 100%;
      }
    }

    .v-card__title {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
