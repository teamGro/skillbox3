<template>
  <li class="colors__item">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            v-bind:value="color.id"
          />
          <span class="colors__value" v-bind:style="{'background-color': color.code}"> </span>
        </label>
      </li>
</template>

<script>
export default {
  props: ['color'],
};
</script>
