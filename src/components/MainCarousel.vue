<template>
  <v-carousel
    cycle
    :height="$vuetify.breakpoint.smAndDown ? '300' : '600'"
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
          <v-btn text class="display-3" :to="i % 2 ? '/about' : '/courses'">{{ slide }}</v-btn>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "MainCarousel",
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
