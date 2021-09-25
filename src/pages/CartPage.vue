<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div v-if="products ? false : true" class='sk-wave'>
          <div class='sk-rect sk-rect-1'></div>
          <div class='sk-rect sk-rect-2'></div>
          <div class='sk-rect sk-rect-3'></div>
          <div class='sk-rect sk-rect-4'></div>
          <div class='sk-rect sk-rect-5'></div>
        </div>

          <ul class="cart__list" v-else>
            <cart-item v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ formatTotalPrice }} ₽</span>
          </p>

          <router-link
            class="cart__button button button--primery"
            type="submit"
            tag="button"
            :to="{name: 'order'}">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import formatNumber from '@/helpers/numberFormat';

export default {
  components: { CartItem },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
    formatTotalPrice() {
      return formatNumber(this.totalPrice);
    },
  },
  methods: {
  },
};
</script>
