<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ productsCount }} товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-model:price-from="filterPriceFrom"
        v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId"
        v-model:product-color="filterColorId"
        v-model:page="page"
      />
      <section class="catalog">
        <div  class='sk-wave' v-if="loadingProducts">
          <div class='sk-rect sk-rect-1'></div>
          <div class='sk-rect sk-rect-2'></div>
          <div class='sk-rect sk-rect-3'></div>
          <div class='sk-rect sk-rect-4'></div>
          <div class='sk-rect sk-rect-5'></div>
        </div>

        <div v-else-if="loadingProductsFail">
          Произошла ошибка
          <button @click="loadProducts">Попробовать ещё раз</button>
        </div>

        <ProductList v-else v-bind:products="products">
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
      filterColorId: 0,

      productsData: null,

      loadingProducts: false,
      loadingProductsFail: false,
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

      if (this.filterColorId) {
        const localArr = [];
        filteredProducts.forEach((product) => {
          if (product.colors.includes(this.filterColorId)) {
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
    filterColorId() {
      this.loadProducts();
    },
  },
  methods: {
    loadProducts() {
      this.loadingProducts = true;
      this.loadingProductsFail = false;

      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColorId,
          },
        })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.loadingProductsFail = true; })
          .then(() => { this.loadingProducts = false; });
      }, 2000);
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style>
  .sk-wave {
    display: flex;
    justify-content: space-between;
    width: 6em;
    height: 4em;
    margin: auto;
    text-align: center;
    font-size: 1em;
  }

  .sk-wave .sk-rect {
    background-color: #337ab7;
    height: 100%;
    width: 0.5em;
    display: inline-block;
    animation: sk-wave-stretch-delay 1.2s infinite ease-in-out;
  }

  .sk-wave .sk-rect-1 {
    animation-delay: -1.2s;
  }

  .sk-wave .sk-rect-2 {
    animation-delay: -1.1s;
  }

  .sk-wave .sk-rect-3 {
    animation-delay: -1s;
  }

  .sk-wave .sk-rect-4 {
    animation-delay: -0.9s;
  }

  .sk-wave .sk-rect-5 {
    animation-delay: -0.8s;
  }

  @keyframes sk-wave-stretch-delay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
</style>
