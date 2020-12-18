<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
<style >
html::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
html::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}
html::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #0ae;
  background-image: -webkit-gradient(linear, 0 0, 0 100%, color-stop(0.5, rgba(255, 255, 255, 0.2)), color-stop(0.5, transparent), to(transparent));
}

.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>
