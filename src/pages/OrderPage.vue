<template>
  <main class="content container" v-if="orderLoading">
    <div  class='sk-wave'>
          <div class='sk-rect sk-rect-1'></div>
          <div class='sk-rect sk-rect-2'></div>
          <div class='sk-rect sk-rect-3'></div>
          <div class='sk-rect sk-rect-4'></div>
          <div class='sk-rect sk-rect-5'></div>
    </div>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ $store.getters.cartDetailProducts.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <base-form-field-text
              title="ФИО"
              :error="formError.name"
              type="text"
              name="name"
              placeholder="Введите ваше полное имя"
              v-model:fieldValue="formData.name">
            </base-form-field-text>

            <base-form-field-text
              title="Адрес доставки"
              :error="formError.address"
              type="text"
              name="address"
              placeholder="Введите ваш адрес"
              v-model:fieldValue="formData.address">
            </base-form-field-text>

            <base-form-field-text
              title="Телефон"
              :error="formError.phone"
              type="tel"
              name="phone"
              placeholder="Введите ваш телефон"
              v-model:fieldValue="formData.phone">
            </base-form-field-text>

            <base-form-field-text
              title="Email"
              :error="formError.email"
              type="email"
              name="email"
              placeholder="Введите ваш Email"
              v-model:fieldValue="formData.email">
            </base-form-field-text>

            <base-form-field-textarea
              title="Комментарий к заказу"
              :error="formError.comment"
              name="comment"
              placeholder="Ваши пожелания"
              v-model:fieldValue="formData.comment">
            </base-form-field-textarea>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.productId">
              <h3>{{ item.product.title }}</h3>
              <b>{{ productPrice(item.product.price) }} ₽</b>
              <span>Артикул: {{ item.productId }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого:
              <b>{{ totalAmount }}</b> товара на сумму
              <b>{{ productsTotalPrice }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import BASE_API_URL from '@/config';
import BaseFormFieldText from '@/components/BaseFormTextField.vue';
import BaseFormFieldTextarea from '@/components/BaseFormTextareaField.vue';
import formatNumber from '@/helpers/numberFormat';

export default {
  components: { BaseFormFieldText, BaseFormFieldTextarea },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderLoading: false,
    };
  },
  methods: {
    order() {
      this.formError = {};
      this.orderLoading = true;
      axios.post(`${BASE_API_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      })
        .then((response) => {
          console.log(response);
          this.$store.commit('orderInfo');
          this.$store.commit('resetCart');
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((err) => {
          this.formError = err.response.data.error.request || {};
          this.formErrorMessage = err.response.data.error.message || '';
        })
        .then(() => {
          this.orderLoading = false;
        });
    },
    productPrice(price) {
      return formatNumber(price);
    },
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalAmount: 'cartTotalAmount' }),
    productsTotalPrice() {
      return formatNumber(this.totalPrice + 500);
    },
  },
};
</script>
