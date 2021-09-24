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

              <div class="product__counter form__counter">
                <button type="button" aria-label="Убрать один товар" @click="deleteItem()"
                :disabled="amount === 0">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="amount" name="count">

                <button type="button" aria-label="Добавить один товар" @click="addItem()">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

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
import { mapActions } from 'vuex';
import formatNumber from '@/helpers/numberFormat';

export default {
  props: ['item'],
  computed: {
    formatPrice() {
      return formatNumber(this.item.amount * this.item.product.price);
    },
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateProductAmount({ productId: this.item.productId, amount: value });
      },

    },
  },
  methods: {
    ...mapActions({ deleteProduct: 'deleteProductFromCart', updateProductAmount: 'updateProductAmountInCart' }),
    addItem() {
      this.updateProductAmount({ productId: this.item.productId, amount: this.amount + 1 });
    },
    deleteItem() {
      this.updateProductAmount({ productId: this.item.productId, amount: this.amount - 1 });
    },
  },
};
</script>

<style scoped>
  button {
    cursor: pointer;
  }
</style>
