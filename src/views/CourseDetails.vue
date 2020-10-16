<template>
  <div class="page">
    <h1 class="pageTitle">{{course.name}}</h1>
    <div class="pageContent">
      <div>{{course.description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "course-details",
  data: () => ({
      course: {}
  }),
  methods: {
    fetchCourse: function(id) {
      const course = this.$store.state.courses.find(c => c.id === id);
      if (course) {
        this.course = course;
      } else {
        this.$router.push({path: '/'})
      }
    }
  },
  mounted: function() {
    this.fetchCourse(this.$route.params.id);
  },
  watch: {
    '$route.params.id': function(id) {
      this.fetchCourse(id);
    }
  }
};
</script>

<style lang="scss">
.pageContent {
  margin: 0 20px 10px 20px;
}
</style>

