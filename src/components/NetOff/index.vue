<template>
  <div class="netOff" @click.once="checktanchuceng">
    <div class="top" :class="{ overlay: overlay }"></div>
    <div class="logo">
      <div class="avatar">
        <img src="/images/netOff/QaLXP.jpeg" :class="{ Rotation: isRotation }" @click="playMusic" />
      </div>
    </div>
    <div class="container css-jump">
      <span>断</span><span>网</span> <span>了</span><span>.</span> <span>.</span><span>.</span>
    </div>
    <div class="box ">
      <button class="button button--antiman " @click="onRefresh">
        <span>点击刷新</span>
      </button>
    </div>
    <div class="music">
      <audio loop="loop" id="music" autoplay>
        <source src="music/yycz.mp3" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'NotNetwork',
  data() {
    return {
      isRotation: false,
      overlay: true,
    };
  },
  watch: {},
  created() {
    this.onRefresh();
  },
  methods: {
    checktanchuceng() {
      const audio = document.getElementById('music');
      this.overlay = false;
      audio.play(); // 播放
      this.isRotation = true;
    },
    onRefresh() {
      //获取回跳的redirect地址
      const redirect = this.$route.query.redirect;
      if (window.navigator.onLine) {
        //如果redirect存在说明当前用户是进入某页面后未登陆自动跳转到登陆页面来的，所以登陆完成后得再次回跳到该地址
        if (redirect && redirect !== '/netoff') {
          this.$router.push(redirect);
        } else {
          //否则跳转到默认的页面，首页或者其他页面
          this.$router.push('/');
        }
      }
    },
    playMusic() {
      const audio = document.getElementById('music');
      if (audio.paused) {
        audio.play(); // 播放
        this.isRotation = true;
      } else {
        this.isRotation = false;
        audio.pause(); // 暂停
      }
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}
.netOff {
  /*
   grid-template-rows: 指定行数
   grid-template-columns: 指定列数
 */
  /* 声明一个容器 */
  display: grid;
  /*优先垂直方向排列*/
  grid-auto-flow: column;
  grid-template-rows: 1fr 1fr 1fr 1fr 2fr;
  grid-template-areas: 't' 'l' 'c' 'b ' 'f ';
  width: 100%;
  height: 100vh;
  background: url('/images/netOff/bg.jpg') no-repeat center center;
  background-size: cover;
}
.top {
  grid-area: t;
}
.logo {
  grid-area: l;
  justify-self: center;
}
.avatar {
  width: 8rem;
  height: 8rem;
  border-radius: 4rem;
  border: 2px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s;
}
.avatar img {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 4rem;
}
.avatar:hover {
  transform: scale(1.5);
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.3);
}
.container {
  grid-area: c;
  justify-self: center;
  align-self: center;
  font-size: 30px;
  color: #17a2b8;
}
.music {
  grid-area: f;
  background: rgba(255, 255, 255, 0.3);
}
.box {
  grid-area: b;
  justify-self: center;
  border-radius: 40px;
}

.button {
  outline: none; /* 解除点击黑边 */
  width: 170px;
  font-weight: 600;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 50px;
  transition: all 0.15s ease-in-out;
  color: #fff;
  padding: 1rem;
}
.button:hover {
  box-shadow: 0 0 10px 0 #00d7c3 inset, 0 0 20px 2px #00d7c3;
  border: 2px solid #00d7c3;
  background: linear-gradient(to right, #8041f28f, #3095ed85);
}
/* 跳动文字 */
.css-jump span {
  position: relative;
  top: 20px;
  display: inline-block;
  animation: bounce 0.3s ease infinite alternate;
  font-family: ‘Titan One’, cursive;
  font-size: 3rem;
  color: #fff;
  text-shadow: 0 1px 0 #409eff, 0 2px 0 #409eff, 0 3px 0 #409eff, 0 4px 0 #409eff, 0 5px 0 #409eff, 0 6px 0 transparent, 0 7px 0 transparent, 0 8px 0 transparent,
    0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
}

.css-jump span:nth-child(2) {
  animation-delay: 0.1s;
}

.css-jump span:nth-child(3) {
  animation-delay: 0.2s;
}

.css-jump span:nth-child(4) {
  animation-delay: 0.3s;
}

.css-jump span:nth-child(5) {
  animation-delay: 0.4s;
}

.css-jump span:nth-child(6) {
  animation-delay: 0.5s;
}

.css-jump span:nth-child(7) {
  animation-delay: 0.6s;
}
@keyframes bounce {
  100% {
    top: -20px;
    text-shadow: 0 1px 0 #409eff, 0 2px 0 #409eff, 0 3px 0 #409eff, 0 4px 0 #409eff, 0 5px 0 #409eff, 0 6px 0 #409eff, 0 7px 0 #ccc, 0 8px 0 #409eff, 0 9px 0 #409eff,
      0 50px 25px rgba(0, 0, 0, 0.2);
  }
}
/* 头像循环转圈 */
.Rotation {
  animation: rotate 3s linear infinite;
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}
@-o-keyframes rotate {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>