import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
// import PageView from '../views/PageView.vue';
import AboutView from '../views/AboutView.vue';

// Routes to other pages from main/home page
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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
