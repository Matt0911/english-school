<template>
  <v-container fluid class="courseListContainer">
    <v-layout row wrap>
      <v-flex v-for="course in courses" :key="course.id" xs12 sm12 md6 lg4>
        <CourseCard  :id="course.id" :name="course.name" :description="course.description"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CourseCard from "@/components/CourseCard.vue";
import courses from "@/data/courses.js";
export default {
  name: "CourseList",
  data: () => ({
    courses,
  }),
  components: {
    CourseCard,
  }
}
</script>
