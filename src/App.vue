<template>
  <section class="catalog">
    <ProductList v-bind:products="products"></ProductList>
    <BasePagination v-bind:per-page="productsPerPage"
    v-bind:count="productsCount" v-model="page" />

  </section>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  components: {
    ProductList,
    BasePagination,
  },
  name: 'App',
  data() {
    return {
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    productsCount() {
      return products.length;
    },
  },
};
</script>

<style>
</style>
