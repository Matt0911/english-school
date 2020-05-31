<template>
  <div class="home">
    <MainCarousel />
    <img alt="Vue logo" src="../assets/logo.png" />
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
