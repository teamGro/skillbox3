<template>
  <base-form-field :title="title" :error="error">
    <input
      class="form__input"
      v-model="dataValue"
      :type="type"
      :placeholder="placeholder">
  </base-form-field>
</template>

<script>
import formMixin from '@/mixins/formMixin';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formMixin],
};
</script>
