<template>
  <v-carousel
    cycle
    :height="$vuetify.breakpoint.smAndDown ? '400' : '700'"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(img, i) in images"
      :key="i"
      :src="img"
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "MainCarousel",
  data () {
    return {
      images: ['students.jpg', 'teacher.jpg', 'fun.jpg', 'convo.jpg'],
    }
  },
};
</script>

<style lang="scss" scoped>
  // .course-card {
  //   display: inline-block;
  //   margin: 10px;
  //   height: 90%;
  //   width: 90%;
  // }
</style>
