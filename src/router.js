import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Review from '@/components/Review';
import Logout from '@/components/Logout';
import Login from '@/components/Login';

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresUser: true,
      },
    },
    {
      path: '/review',
      name: 'review',
      component: Review,
      meta: {
        requiresUser: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresUser)) {
    if(!localStorage.getItem('dealer20user')) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath },
      });
    }
  }
  next();
});

Vue.use(Router);

export default router;
