import Vue from "vue";
import Router from "vue-router";
import firebase from 'firebase';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import(/* webpackChunkName: "courses" */ "./views/Courses.vue")
    },
    {
      path: "/courses/:id",
      name: "course-details",
      component: () => import(/* webpackChunkName: "course-details" */ "./views/CourseDetails.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/register",
      name: "registration",
      component: () => import(/* webpackChunkName: "register" */ "./views/Registration.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/userProfile",
      name: "userProfile",
      component: () => import(/* webpackChunkName: "userProfile" */ "./views/Home.vue"),
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
  // if (to.fullPath === from.fullPath) {
  //   console.log('same path', to)
  //   next(false);
  //   return;
  // }
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