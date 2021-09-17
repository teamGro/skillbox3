<template>
  <component :is="getCurrentPage" :pageParams="currentPageParams"
  @goToPage="(pageName, pageParams) => goToPage(pageName, pageParams)"></component>
</template>

<script>
import MainPage from './pages/MainPage.vue';
import ProductPage from './pages/ProductPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  components: { MainPage, ProductPage, NotFoundPage },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  computed: {
    getCurrentPage() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
  methods: {
    goToPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams;
    },
  },
};
</script>

<style>
</style>
