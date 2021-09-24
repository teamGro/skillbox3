import axios from 'axios';
import { createStore } from 'vuex';
import API_BASE_URL from '@/config';

const store = createStore({
  state() {
    return {
      cartProducts: [],
      userAccessKey: null,
      cartProductsData: [],
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
    // updateProductAmount(state, { productId, amount }) {
    //   const product = state.cartProducts.find((item) => item.productId === productId);

    //   if (product) {
    //     product.amount = amount;
    //   }
    // },
    updateUserAccessKey(state, userAccessKey) {
      state.userAccessKey = userAccessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => (
        {
          productId: item.product.id,
          amount: item.quantity,

        }
      ));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const currentProduct = state.cartProductsData.find((product) => (
          product.product.id === item.productId
        )).product;

        return {
          ...item,
          product: {
            ...currentProduct,
            image: currentProduct.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (
        item.product.price * item.amount + acc
      ), 0);
    },
    cartTotalProducts(state) {
      return state.cartProducts.length;
    },
  },
  actions: {
    loadCart(context) {
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, { productId, amount }) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    deleteProductFromCart(context, productId) {
      return axios.delete(`${API_BASE_URL}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`,
        {
          data: {
            productId,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => {
        });
    },
    updateProductAmountInCart(context, { productId, amount }) {
      if (amount < 1) {
        return false;
      }

      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },

  },
});

export default store;
