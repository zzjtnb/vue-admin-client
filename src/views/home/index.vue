<template>
  <div class="dashboard-editor-container">
    <div class="clearfix">
      <div class="info-container">
        <div class="dashboard-text">欢迎使用
        </div>
      </div>
    </div>
    <div>
      <img :src="emptyGif" class="emptyGif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PanThumb from '@/components/PanThumb';
export default {
  name: 'home',
  components: { PanThumb },
  data() {
    return {
      emptyGif: '/images/bg/index.gif',
    };
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'roles']),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.clearfix {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.dashboard {
  &-container {
    margin: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
  }
  &-text {
    font-size: 60px;
    font-weight: 600;
    font-family: '黑体';
    color: #8c888b;
    background: -webkit-linear-gradient(45deg, #4ef3fc, #fbd7c6, #fdefac, #bfb5dd, #4cffbd);
    color: transparent;
    /*设置字体颜色透明*/
    background-clip: text;
    /*背景裁剪为文本形式*/
    animation: ran 10s linear infinite;
    /*动态10s展示*/
  }
}
@keyframes ran {
  from {
    backgroud-position: 0 0;
  }
  to {
    background-position: 2000px 0;
  }
}
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}

.dashboard-editor-container {
  // background-color: #e3e3e3;
  min-height: 100vh;
  padding: 50px 60px 0px;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    text-align: center;
    height: 150px;
    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}
</style>