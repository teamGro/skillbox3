<template>
  <teleport v-if="open" to="#teleport-target">
    <div class="modal" @click="outsideDoClose">
      <div class="modal__body" ref="content">
        <button class="modal__close-btn" @click="doClose">X</button>
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
let openCount = 0;
let atLeastOpen = false;

export default {
  props: {
    open: {
      type: Boolean,
    },
  },
  methods: {
    outsideDoClose($event) {
      if ($event.target !== this.$refs.content) {
        this.doClose();
      }
    },
    doClose() {
      this.$emit('update:open', false);
    },
    checkBlackoutState() {
      if (!openCount) {
        atLeastOpen = false;
        document.body.style.overflow = null;
        document.body.style.paddingRight = null;
      } else if (!atLeastOpen && openCount === 1) {
        atLeastOpen = true;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
      }
    },
  },
  watch: {
    open: {
      handler(isOpen) {
        if (isOpen) {
          openCount += 1;
        } else {
          openCount -= 1;
        }

        this.checkBlackoutState();
      },
    },
  },
  created() {
    if (this.open) {
      openCount += 1;
      this.checkBlackoutState();
    }
  },
};
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

    background-color: rgba(0, 0, 0, .5);
    z-index: 100;
    /* opacity: .5; */
  }

  .modal__body {
    transform: translateY(5%);

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
