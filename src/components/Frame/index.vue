<template>
  <iframe class="container-frame" :src="src" frameborder="0" />
</template>

<script>
export default {
  name: 'container-frame',
  props: {
    src: {
      type: String,
      required: false,
      default: 'https://d2.pub/zh/doc/admin',
    },
  },
};
</script>

<style lang="scss" scoped>
.container-frame {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
}
</style>
