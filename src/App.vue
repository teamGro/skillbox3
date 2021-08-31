<template>
  <section class="catalog">
    <ProductList v-bind:products="products"></ProductList>

    <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a
          class="
            pagination__link pagination__link--arrow pagination__link--disabled
          "
          aria-label="Предыдущая страница"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--current"> 1 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 2 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 3 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 4 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> ... </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 10 </a>
      </li>
      <li class="pagination__item">
        <a
          class="pagination__link pagination__link--arrow"
          href="#"
          aria-label="Следующая страница"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import products from "./data/products";
import ProductList from "./components/ProductList.vue";

export default {
  components: {
    ProductList,
  },
  name: "App",
  data() {
    return {
      products,
    };
  },
};
</script>

<style>
.product-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  list-style: none;
}

.product-item {
  width: calc(100% / 3 - 15px);
  margin-bottom: 15px;
}

.product-item:not(:nth-child(3n)) {
  margin-right: 15px;
}

.product-image-wrapper {
  display: flex;
  align-items: center;
}

.product-image {
  width: 100%;
  max-height: 250px;
  object-fit: contain;
}

.product-title {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
