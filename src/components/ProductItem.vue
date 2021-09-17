<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img v-bind:src="product.image" v-bind:alt="product.title"
      @click.prevent="$emit('goToPage', 'product', {id: product.id})"/>
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>
    <span class="catalog__price"> {{ formatPrice }} ₽ </span>

    <ul class="colors colors--black">
      <ProductColor v-for="color, key in product.colors" v-bind:color="color" v-bind:key="key"/>
    </ul>
  </li>
</template>

<script>
import ProductColor from './ProductColor.vue';
import formatNumber from '@/helpers/numberFormat';

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
  computed: {
    formatPrice() {
      return formatNumber(this.product.price);
    },
  },
};
</script>
