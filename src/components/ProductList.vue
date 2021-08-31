<template>
  <ul class="catalog__list">
    <ProductItem v-bind:products="products"></ProductItem>
  </ul>
</template>

<script>
import ProductItem from "./ProductItem.vue";

export default {
  props: ["products"],
  components: {
    ProductItem,
  },
};
</script>
