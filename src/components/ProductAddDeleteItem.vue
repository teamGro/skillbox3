<template>
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
</template>

<script>
export default {
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.commit('updateProductAmount', { productId: this.item.productId, amount: value });
      },

    },
  },
  methods: {
    addItem() {
      this.$store.commit('updateProductAmount', { productId: this.item.productId, amount: this.amount + 1 });
    },
    deleteItem() {
      this.$store.commit('updateProductAmount', { productId: this.item.productId, amount: this.amount - 1 });
    },
  },
};
</script>
