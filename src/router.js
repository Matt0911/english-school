import Vue from "vue";
import Router from "vue-router";
import store from './store';
import { shouldUserHaveAccess } from './utils';

Vue.use(Router);

export const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
  },
  {
    path: "/forbidden",
    name: "forbidden",
    component: () => import(/* webpackChunkName: "forbidden" */ "./views/Forbidden.vue")
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
      allowedRoles: ['student', 'teacher', 'admin']
    }
  },
  {
    path: "/teacherCenter",
    name: "teacherCenter",
    component: () => import(/* webpackChunkName: "teacherCenter" */ "./views/TeacherCenter.vue"),
    meta: {
      requiresAuth: true,
      allowedRoles: ['teacher', 'admin']
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
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // if (to.fullPath === from.fullPath) {
  //   console.log('same path', to)
  //   next(false);
  //   return;
  // }
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const { currentUser } = store.state;
  const canAccess = to.matched.some(x => !x.meta.allowedRoles) || to.matched.some(x => shouldUserHaveAccess(x.meta.allowedRoles));

  if (requiresAuth && !currentUser) {
    next({ name: 'login', query: { redirect: to.path}});
  } else if (requiresAuth && currentUser && !canAccess) {
    next('forbidden');
  } else {
    next();
  }
})

export default router;