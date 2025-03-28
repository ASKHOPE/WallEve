import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PageView from '../views/PageView.vue';
import AboutView from '../views/AboutView.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    props: { pageTitle: 'Home Feed', query: 'Nature' } // Example query
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  }
  // Catch-all route for 404 - Optional
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
