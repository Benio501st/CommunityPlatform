import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreatePost from  '../views/CreatePost.vue';
import BlogPost from  '../views/BlogPost.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: () => import('../views/CreatePost.vue')
    },
    {
      path: '/blog-post/:id',
      name: 'blog-post',
      component: () => import('../views/BlogPost.vue'),
      params: true
    },
    {
      path: '/user-page/:id',
      name: 'user-page',
      component: () => import('../views/UserView.vue'),
      params: true
    },
  ]
})

export default router
