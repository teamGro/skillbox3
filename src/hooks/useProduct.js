import axios from 'axios';
import { ref, computed, reactive } from 'vue';
import API_BASE_URL from '@/config';
import formatNumber from '@/helpers/numberFormat';

export default function () {
  const productData = ref(null);
  const category = computed(() => productData.value.category);
  // const formatPrice = computed(() =>
  // formatNumber(productData.value.price * currentAmount.value));

  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false,
  });

  const currentAmount = ref(1);

  const fetchProduct = (productId) => {
    fetchStatus.isLoading = true;
    fetchStatus.isFailed = false;
    axios.get(`${API_BASE_URL}/api/products/${productId}`)
      .then((response) => {
        const product = response.data;
        productData.value = Object.assign(product, {
          formatPrice: formatNumber(product.price * currentAmount.value),
        });
      })
      .catch(() => { fetchStatus.isFailed = true; })
      .then(() => { fetchStatus.isLoading = false; });
  };

  return {
    product: productData,
    category,
    status: fetchStatus,
    currentAmount,

    fetchProduct,
  };
}
