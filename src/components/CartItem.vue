<template>
  <li class="cart__item product">
              <div class="product__pic">
                <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
              </div>
              <h3 class="product__title">
                {{ item.product.title }}
              </h3>
              <span class="product__code">
                Артикул: {{ item.productId }}
              </span>

              <product-add-delete-item :item="item"></product-add-delete-item>

              <b class="product__price">
                {{ formatPrice }} ₽
              </b>

              <button class="product__del button-del" type="button"
              @click.prevent="deleteProduct(item.productId)">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
  </li>
</template>

<script>
import { mapMutations } from 'vuex';
import formatNumber from '@/helpers/numberFormat';
import ProductAddDeleteItem from '@/components/ProductAddDeleteItem.vue';

export default {
  props: ['item'],
  components: { ProductAddDeleteItem },
  computed: {
    formatPrice() {
      return formatNumber(this.item.amount * this.item.product.price);
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteProductFromCart' }),
  },
};
</script>

<style scoped>
  button {
    cursor: pointer;
  }
</style>
