<template>
  <ul class="catalog__list">
    <ProductItem class="catalog__item" :products="products"></ProductItem>
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
