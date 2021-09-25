import BaseFormField from '@/components/BaseFormField.vue';

const formMixin = {
  components: { BaseFormField },
  props: ['placeholder', 'title', 'error', 'fieldValue'],
  data() {
    return {
      currentValue: this.fieldValue,
    };
  },
  computed: {
    dataValue: {
      get() {
        return this.currentValue;
      },
      set(value) {
        this.$emit('update:fieldValue', value);
      },
    },
  },
};

export default formMixin;
