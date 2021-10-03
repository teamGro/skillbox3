<template>
  <li v-for="product in normalizedProducts" v-bind:key='product.id' v-bind="$attrs">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img v-bind:src="product.image" v-bind:alt="product.title"/>
    </router-link>

    <h3 class="catalog__title">
      <a href="#" @click.prevent="openQuickView(product.id)">
        {{ product.title }}
      </a>
    </h3>
    <span class="catalog__price"> {{ product.prettyPrice }} ₽ </span>

    <ul class="colors colors--black">
      <ProductColor v-for="color, key in product.colors" v-bind:color="color" v-bind:key="key"/>
    </ul>
  </li>

  <base-modal v-model:open="isQuickViewOpen">
    <product-quick-view :productId="currentProductId"></product-quick-view>
  </base-modal>
</template>

<script>
import { defineAsyncComponent, h } from 'vue';
import ProductColor from './ProductColor.vue';
import formatNumber from '@/helpers/numberFormat';
import BaseModal from '@/components/BaseModal.vue';

export default {
  components: {
    ProductColor,
    BaseModal,
    ProductQuickView: defineAsyncComponent({
      loader: () => import('@/components/ProductQuickView.vue'),
      delay: 0,
      loadingComponent: () => h('div', 'Загрузка...'),
    }),
  },
  data() {
    return {
      color: '#73b6ea',
      quickView: false,
      currentProductId: null,
    };
  },
  props: ['products'],
  computed: {
    isQuickViewOpen: {
      get() {
        return !!this.currentProductId;
      },
      set(isOpen) {
        if (!isOpen) {
          this.currentProductId = null;
        }
      },
    },
    normalizedProducts() {
      return this.products.map((product) => (
        {
          ...product,
          prettyPrice: formatNumber(product.price),
        }
      ));
    },

  },
  methods: {
    openQuickView(productId) {
      this.currentProductId = productId;
    },

  },
};
</script>
