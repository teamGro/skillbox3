<template>
  <div class="form__counter">
                <button type="button" @click="updateItemQty(deleteItem())"
                :disabled="currentAmount === 0">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="updateAmount" name="count">

                <button type="button" @click="updateItemQty(addItem())">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
  </div>
</template>

<script>
export default {
  props: ['amount'],
  data() {
    return {
      currentAmount: this.amount,
    };
  },
  computed: {
    updateAmount: {
      get() {
        return this.currentAmount;
      },
      set(value) {
        this.$emit('update:amount', value);
      },
    },
  },
  methods: {
    addItem() {
      this.currentAmount = this.amount + 1;
      return this.currentAmount;
    },
    deleteItem() {
      this.currentAmount = this.amount - 1;
      return this.currentAmount;
    },
    updateItemQty(qty) {
      this.$emit('update:amount', qty);
    },
  },
};
</script>
