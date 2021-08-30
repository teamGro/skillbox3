<template>
<li
      class="product-item"
      v-for="(product, index) in products"
      v-bind:key="index"
    >
    <div class="product-image-wrapper">
      <img
        v-bind:src="product.image"
        v-bind:alt="product.title"
        class="product-image"
      />
    </div>
      <h3 class="product-title">{{ product.title }}</h3>
      <span class="product-price">{{ product.price }} P</span>
    </li>
</template>

<script>
export default {
  props: ['products'],
};
</script>
