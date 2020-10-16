import Vue from "vue";
import Router from "vue-router";
import firebase from 'firebase';
import Home from "./views/Home.vue";


Vue.use(Router);

const router = new Router({
  mode: 'history',
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
      component: () => import("./views/Login.vue")
    },
    {
      path: "/register",
      name: "registration",
      component: () => import("./views/Registration.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/userProfile",
      name: "userProfile",
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "*",
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === from.fullPath) {
    console.log('same path', to)
    next(false);
    return;
  }
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
      next({ name: 'login', query: { redirect: to.path}});
  } else if (requiresAuth && currentUser) {
      next();
  } else {
      next();
  }
})

export default router;