<template>
  <div>
    <header-element></header-element>

    <router-view />

    <footer-element></footer-element>
  </div>
</template>

<script>
import HeaderElement from '@/components/HeaderElement.vue';
import FooterElement from '@/components/FooterElement.vue';

export default {
  components: { HeaderElement, FooterElement },
};
</script>
