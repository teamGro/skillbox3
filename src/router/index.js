import { createWebHashHistory, createRouter } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';

const history = createWebHashHistory();
const routes = [
  {
    name: 'main',
    path: '/',
    component: MainPage,
  },
  {
    name: 'product',
    path: '/product/:id',
    component: ProductPage,
  },
  {
    name: 'cart',
    path: '/cart',
    component: CartPage,
  },
  {
    name: 'notFound',
    path: '/:notFound(.*)',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history,
  routes,
});

export default router;
