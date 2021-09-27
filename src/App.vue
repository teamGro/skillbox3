<template>
  <div>
    <header-element></header-element>

    <router-view/>

    <footer-element></footer-element>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import HeaderElement from '@/components/HeaderElement.vue';
import FooterElement from '@/components/FooterElement.vue';

export default {
  components: { HeaderElement, FooterElement },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }

    this.loadCart();
  },
};
</script>
