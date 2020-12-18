<template>
  <pre v-if="preview">{{formData}}</pre>
</template>

<script>
export default {
  props: ['preview', 'formData'],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {},
};
</script>

<style scoped lang='scss'>
pre {
  font-size: 18px;
  font-weight: bolder;
  background: black;
  color: green;
  outline: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  overflow-x: auto;
}
</style>