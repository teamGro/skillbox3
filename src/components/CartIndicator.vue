<template>
  <router-link class="header__cart" :to="{ name: 'cart' }">
    <div class='sk-circle-bounce' v-if="$store.state.cartProducts ? false : true">
      <div class='sk-child sk-circle-1'></div>
      <div class='sk-child sk-circle-2'></div>
      <div class='sk-child sk-circle-3'></div>
      <div class='sk-child sk-circle-4'></div>
      <div class='sk-child sk-circle-5'></div>
      <div class='sk-child sk-circle-6'></div>
      <div class='sk-child sk-circle-7'></div>
      <div class='sk-child sk-circle-8'></div>
      <div class='sk-child sk-circle-9'></div>
      <div class='sk-child sk-circle-10'></div>
      <div class='sk-child sk-circle-11'></div>
      <div class='sk-child sk-circle-12'></div>
    </div>

      <div>
        <svg width="30" height="21" fill="currentColor">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">
          {{ total }}
          </span>
      </div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ total: 'cartTotalProducts' }),
  },
};
</script>

<style scoped>
.sk-circle-bounce {
  width: 2em;
  height: 2em;
  position: relative;
  margin: auto;
}

.sk-circle-bounce .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.sk-circle-bounce .sk-child:before {
  content: "";
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #337ab7;
  border-radius: 100%;
  animation: sk-circle-bounce-delay 1.2s infinite ease-in-out both;
}

.sk-circle-bounce .sk-circle-2 {
  transform: rotate(30deg);
}

.sk-circle-bounce .sk-circle-3 {
  transform: rotate(60deg);
}

.sk-circle-bounce .sk-circle-4 {
  transform: rotate(90deg);
}

.sk-circle-bounce .sk-circle-5 {
  transform: rotate(120deg);
}
.sk-circle-bounce .sk-circle-6 {
  transform: rotate(150deg);
}

.sk-circle-bounce .sk-circle-7 {
  transform: rotate(180deg);
}
.sk-circle-bounce .sk-circle-8 {
  transform: rotate(210deg);
}

.sk-circle-bounce .sk-circle-9 {
  transform: rotate(240deg);
}

.sk-circle-bounce .sk-circle-10 {
  transform: rotate(270deg);
}

.sk-circle-bounce .sk-circle-11 {
  transform: rotate(300deg);
}

.sk-circle-bounce .sk-circle-12 {
  transform: rotate(330deg);
}

.sk-circle-bounce .sk-circle-2:before {
  animation-delay: -1.1s;
}

.sk-circle-bounce .sk-circle-3:before {
  animation-delay: -1s;
}

.sk-circle-bounce .sk-circle-4:before {
  animation-delay: -0.9s;
}

.sk-circle-bounce .sk-circle-5:before {
  animation-delay: -0.8s;
}

.sk-circle-bounce .sk-circle-6:before {
  animation-delay: -0.7s;
}

.sk-circle-bounce .sk-circle-7:before {
  animation-delay: -0.6s;
}

.sk-circle-bounce .sk-circle-8:before {
  animation-delay: -0.5s;
}

.sk-circle-bounce .sk-circle-9:before {
  animation-delay: -0.4s;
}

.sk-circle-bounce .sk-circle-10:before {
  animation-delay: -0.3s;
}

.sk-circle-bounce .sk-circle-11:before {
  animation-delay: -0.2s;
}

.sk-circle-bounce .sk-circle-12:before {
  animation-delay: -0.1s;
}

@keyframes sk-circle-bounce-delay {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
