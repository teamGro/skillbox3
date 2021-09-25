<template>
   <base-form-field :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      :placeholder="placeholder"
      v-model="dataValue">
    </textarea>
  </base-form-field>
</template>

<script>
import formMixin from '@/mixins/formMixin';

export default {
  mixins: [formMixin],
};
</script>
