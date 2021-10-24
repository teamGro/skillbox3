import {
  ref, getCurrentInstance, computed, watch,
} from 'vue';

const modalsOpenID = ref(new Set());

export default function () {
  const { uid } = getCurrentInstance();
  const isOpen = ref(false);

  function doOpen() {
    isOpen.value = true;
    modalsOpenID.value.add(uid);
  }

  function doClose() {
    isOpen.value = false;
    modalsOpenID.value.delete(uid);
  }

  const isSomeOpen = computed(() => !!modalsOpenID.value.size);

  function checkBlackoutState() {
    if (!isSomeOpen.value) {
      document.body.style.overflow = null;
      document.body.style.paddingRight = null;
    } else if (isSomeOpen.value) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
    }
  }

  watch(isSomeOpen, () => {
    checkBlackoutState();
  });

  return {
    doOpen,
    doClose,

    isOpen,
    isSomeOpen: computed(() => modalsOpenID.value.size),
  };
}
