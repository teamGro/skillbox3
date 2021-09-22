import { createStore } from 'vuex';
import products from '@/data/products';

const store = createStore({
  state() {
    return {
      cartProducts: [
        {
          productId: 2,
          amount: 2,
        },
      ],
    };
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const product = state.cartProducts.find((item) => item.productId === productId);

      if (product) {
        product.amount += amount;
      } else {
        state.cartProducts.push({ productId, amount });
      }
    },
    updateProductAmount(state, { productId, amount }) {
      const product = state.cartProducts.find((item) => item.productId === productId);

      if (product) {
        product.amount = amount;
      }
    },
    deleteProductFromCart(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => (
        {
          ...item,
          product: products.find((product) => product.id === item.productId),
        }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (
        item.product.price * item.amount + acc
      ), 0);
    },
  },
});

export default store;
