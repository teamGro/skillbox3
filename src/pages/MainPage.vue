<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-model:price-from="filterPriceFrom"
        v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId"
        v-model:product-color="filterColor"
      />
      <section class="catalog">
        <ProductList v-bind:products="products"
         @go-to-page="(pageName, pageParams) => $emit('goToPage', pageName, pageParams)">
         </ProductList>
        <BasePagination
          v-bind:per-page="productsPerPage"
          v-bind:count="productsCount"
          v-model:page="page"
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '',
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

      if (this.filterColor) {
        const localArr = [];
        filteredProducts.forEach((product) => {
          if (product.colors.includes(this.filterColor)) {
            localArr.push(product);
          }
        });
        filteredProducts = localArr;
      }

      return filteredProducts;
    },
  },
  methods: {},
};
</script>