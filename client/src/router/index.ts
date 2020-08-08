import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Overview from '../views/Overview.vue';
import NewQuest from '../views/NewQuest.vue';
import QuestEditor from '../views/QuestEditor.vue';

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
  {
    path: '/editor/:questId',
    name: 'QuestEditor',
    props: route => ({ questId: route.params.questId }),
    component: QuestEditor,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
