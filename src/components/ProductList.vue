<template>
  <ul class="catalog__list">
    <ProductItem  v-for="product in products" v-bind:product="product"
    v-bind:key='product.id'
    @go-to-page="(pageName, pageParams) => $emit('goToPage', pageName, pageParams)"></ProductItem>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  components: {
    ProductItem,
  },
};
</script>
