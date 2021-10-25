<template>
  <teleport
    v-if="open"
    to="#teleport-target"
  >
    <div
      class="modal"
      :style="{top: modalTopCoords + 'px'}"
      @click="outsideDoClose"
    >
      <div
        class="modal__body"
        ref="contentElement"
      >
        <button
          class="modal__close-btn"
          @click="doClose"
        >X</button>
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
import {
  defineComponent, ref, watch,
} from 'vue';
import useModal from '@/hooks/useModal';

export default defineComponent({
  props: {
    open: {
      type: Boolean,
    },
  },

  setup(props, { emit: $emit }) {
    const contentElement = ref(null);
    const modalTopCoords = ref(0);
    const { doOpen, doClose } = useModal();

    const doCloseModal = () => {
      $emit('update:open', false);
      doClose();
    };

    const outsideDoClose = ($event) => {
      if ($event.target !== contentElement.value && $event.target.contains(contentElement.value)) {
        doCloseModal();
      }
    };

    function getTopCoords() {
      return window.scrollY;
    }

    watch(
      () => props.open,
      (isOpen) => {
        if (!isOpen) {
          doClose();
        } else {
          modalTopCoords.value = getTopCoords();
          doOpen();
        }
      },
      { immediate: true },
    );

    return {
      outsideDoClose,
      doClose: doCloseModal,
      modalTopCoords,
    };
  },
});
</script>

<style>
.modal {
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  overflow-y: auto;
  padding: 5% 0;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  /* opacity: .5; */
}

.modal__body {
  /* transform: translateY(5%); */
  position: relative;

  width: 70%;
  margin: auto;

  padding: 15px 20px;
  background-color: #fff;
}

.modal__close-btn {
  position: absolute;
  top: -15px;
  right: -15px;

  width: 30px;
  height: 30px;
}
</style>
