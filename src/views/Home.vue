<template>
  <div class="home">
    <MainCarousel />
  </div>
</template>

<script>
// @ is an alias to /src
import MainCarousel from '@/components/MainCarousel.vue';

export default {
  name: "home",
  components: {
    MainCarousel
  }
};
</script>
