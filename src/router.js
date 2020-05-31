import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("./views/Courses.vue")
    },
    {
      path: "/courses/:id",
      name: "course-details",
      component: () => import("./views/CourseDetails.vue")
    },
    {
      path: "/login",
      name: "login",
      component: Home // TODO: create login screen
    },
    {
      path: "/register",
      name: "registration",
      component: () => import("./views/Registration.vue")
    },
    {
      path: "/userProfile",
      name: "userProfile",
      component: Home
    }
  ]
});
