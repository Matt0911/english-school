<template>
  <div class="pageContent">
    <CoursesCarousel />
    <h1 class="pageTitle">Available Courses</h1>
    <CourseList />
  </div>
</template>

<script>
import CourseList from '@/components/CourseList.vue';
import CoursesCarousel from '@/components/CoursesCarousel.vue';

export default {
  name: "courses",
  components: {
    CourseList,
    CoursesCarousel
  }
};
</script>
