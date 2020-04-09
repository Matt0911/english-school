<template>
  <div class="pageContent">
    <h1 class="pageTitle">Courses</h1>
    <CourseList />
  </div>
</template>

<script>
import CourseList from '@/components/CourseList.vue';

export default {
  name: "courses",
  components: {
    CourseList
  }
};
</script>
