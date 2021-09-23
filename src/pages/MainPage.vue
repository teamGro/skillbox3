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
        v-model:page="page"
      />
      <section class="catalog">
        <ProductList v-bind:products="products">
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
import axios from 'axios';
import API_BASE_URL from '@/config';
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

      productsData: null,
    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items.map((product) => (
        {
          ...product,
          image: product.image.file.url,
        }
      )) : [];
    },
    productsCount() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    filteredProducts() {
      let filteredProducts = this.products;
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
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
  },
  methods: {
    loadProducts() {
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
          .then((response) => { this.productsData = response.data; });
      }, 0);
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
