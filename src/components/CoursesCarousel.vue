<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">{{ slide }}</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "CoursesCarousel",
  data () {
    return {
      slides: ['Cool pic to show something', 'A different pic', 'Maybe something else?', 'People having fun learning', 'SMILES! :)'],
      colors: ['orange', 'blue', 'grey', 'purple', 'green'],
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
