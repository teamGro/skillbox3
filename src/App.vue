<template>
 <ProductList v-bind:products="products"></ProductList>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';

export default {
  components: {
    ProductList,
  },
  name: 'App',
  data() {
    return {
      products,
    };
  },
};
</script>

<style>
.product-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  list-style: none;
}

.product-item {
  width: calc(100% / 3 - 15px);
  margin-bottom: 15px;
}

.product-item:not(:nth-child(3n)) {
  margin-right: 15px;
}

.product-image-wrapper {
  display: flex;
  align-items: center;
}

.product-image {
  width:100%;
  max-height: 250px;
  object-fit: contain;
}

.product-title {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
