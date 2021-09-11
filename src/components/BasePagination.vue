<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        v-bind:class='{"pagination__link--disabled": page == 1}'
        aria-label="Предыдущая страница"
        v-on:click.prevent="paginate(prevPage(page))"
      >
        <svg
          width="8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li
      class="pagination__item"
      v-for="pageNumber in pages"
      v-bind:key="pageNumber"
    >
      <a
        href='#'
        class="pagination__link"
        v-bind:class="{'pagination__link--current': pageNumber === page}"
        v-on:click.prevent="paginate(pageNumber)"
      >
        {{pageNumber}}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        v-bind:class='{"pagination__link--disabled": page == pages}'
        href="#"
        aria-label="Следующая страница"
        v-on:click.prevent="paginate(nextPage(page))"
      >
        <svg
          width="8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  emits: ['update:page'],
  methods: {
    nextPage() {
      this.currentPage = this.page + 1;
      return this.currentPage;
    },
    prevPage() {
      this.currentPage = this.page - 1;
      return this.currentPage;
    },
    paginate(page) {
      this.$emit('update:page', page);
    },
  },
};
</script>

<style>
.pagination__item:hover {
  cursor: pointer;
}
</style>
