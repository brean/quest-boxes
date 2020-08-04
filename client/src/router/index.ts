import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Overview from '../views/Overview.vue';
import NewQuest from '../views/NewQuest.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Overview',
    component: Overview,
  },
  {
    path: '/new',
    name: 'NewQuest',
    component: NewQuest,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
