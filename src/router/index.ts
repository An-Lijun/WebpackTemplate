
import {
  createRouter, createWebHashHistory
} from 'vue-router';

const routes = [
  {
    path: '/hello',
    name: 'home',
    component: () => import('../hello.vue')
  },
  {
    path: '/hello1',
    name: 'home1',
    component: () => import('../helloT.vue')
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;