<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img v-bind:src="product.image" v-bind:alt="product.title" />
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>
    <span class="catalog__price"> {{ product.price }} ₽ </span>

    <ul class="colors colors--black">
      <ProductColor v-for="color, key in product.colors" v-bind:color="color" v-bind:key="key"/>
    </ul>
  </li>
</template>

<script>
import ProductColor from './ProductColor.vue';

export default {
  components: {
    ProductColor,
  },
  data() {
    return {
      color: '#73b6ea',
    };
  },
  props: ['product'],
};
</script>
