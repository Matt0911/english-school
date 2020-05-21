<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="course-card" :elevation="hover ? 10 : 2">
      <v-container fluid pa-0>
        <v-layout column justify-space-between ma-0>
          <v-card-title>
            <div class="headline">{{name}}</div>
          </v-card-title>
          <v-card-text>{{description}}</v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn text :to="'/courses/' + id" color="blue">Details</v-btn>
            <v-btn text :to="'/register?courseId=' + id" color="green">Register</v-btn>
          </v-card-actions>
        </v-layout>
      </v-container>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    id: Number,
    name: String,
    description: String
  }
};
</script>

<style lang="scss" scoped>
  .course-card {
    display: inline-block;
    margin: 10px;
    height: 90%;
    width: 90%;
  }
</style>
