<template>
  <transition name="slide-fade">
    <div  v-if="notifyFlag">
      <div class="notify success" v-if="type == 'success'">
        <div class="tip">
          <span>成功</span>
        </div>
        <div class="content">{{ content }}</div>
      </div>
      <div class="notify error" v-else-if="type == 'error'">
        <div class="tip">
          <span>错误</span>
        </div>
        <div class="content">{{ content }}</div>
      </div>
      <div class="notify warning" v-else-if="type == 'warning'">
        <div class="tip">
          <span>警告</span>
        </div>
        <div class="content">{{ content }}</div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  /* transform: translateX(10px); */
  opacity: 0;
}
.notify-wrap {
  /* background-color: #1AFA29; */
}
/* .my-notify{
  margin: 10px;
  width: 350px;
} */
.notify {
  position: fixed;
  /* transform: translateX(); */

  /* padding-left: 10px; */
  width: 320px;
  height: 70px;
  border-radius: 4px;
  background-color: rgb(255, 244, 224);
  box-shadow: -5px 5px 12px 0 rgba(204, 204, 204, 0.8);
}

/* 横屏 */
@media only screen and (orientation: landscape) {
  .notify {
    transform: rotate(0deg);
    right: 0;
    left: 0;
    top: 2%;
    bottom: 0;
    margin: 0 auto;
  animation: show cubic-bezier(0.18, 0.89, 0.32, 1.28) 0.4s;

  }
}

/* 竖屏 */
@media only screen and (orientation: portrait) {
  .notify {
    top: 75%;
    transform: rotate(-90deg);
    transform-origin: 0 -10%;
    animation: verticalScreen cubic-bezier(0.18, 0.89, 0.32, 1.28) 0.4s;
  }
}
.success {
  border-left: 10px solid #90caf9;
  background-color: #20a0ff;
}
.error {
  border-left: 10px solid #f44336;
  background-color: #ef9a9a;
}
.warning {
  border-left: 10px solid #ff5722;
  background-color: #ffab91;
}
.notify .tip {
  height: 30px;
  margin-bottom: 5px;
  margin-left: 5px;
  line-height: 30px;
}
.notify .tip span {
  line-height: 30px;
  font-size: 17px;
  font-weight: 600;
}
.notify .content {
  /* width: 320px; */
  /* height: 30px; */
  margin-left: 5px;

  font-size: 15px;
}
@keyframes show {
  0% {
    top: -350px;
  }
  100% {
    top: 10px;
  }
}
@keyframes verticalScreen {
  0% {
    left: -100px;
  }
  100% {
    left: 8%;
  }
}
</style>
