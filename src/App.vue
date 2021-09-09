<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"/>
      <section class="catalog">
        <ProductList v-bind:products="products"></ProductList>
        <BasePagination
          v-bind:per-page="productsPerPage"
          v-bind:count="productsCount"
          v-on:update:paginate="page = $event"
          v-bind:page="page"
          v-on:paginate1="paginate2($event)"
          v-on:paginateBack="paginateBack()"
          v-on:paginateForward="paginateForward()"
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  name: 'App',
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 1,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    productsCount() {
      return this.filteredProducts.length;
    },
    filteredProducts() {
      let filteredProducts = products;
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts
          .filter((product) => product.categoryId === this.filterCategoryId);
      }

      return filteredProducts;
    },
  },
  methods: {
    paginate2(page) {
      this.page = page;
    },
    paginateBack() {
      if (this.page === 1) return;
      this.page -= 1;
    },
    paginateForward() {
      if (this.page === Math.ceil(this.productsCount / this.productsPerPage)) {
        return;
      }
      this.page += 1;
    },
  },
};
</script>

<style>
</style>
