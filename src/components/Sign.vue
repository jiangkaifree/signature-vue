<template>
  <div class="sign-wrap">
    <div class="boardBox" ref="boardBox" @touchmove.prevent>
      <canvas
        ref="canvas"
        :width="cWidth"
        :height="cHeight"
        id="canvas"
        @touchstart="mStart"
        @touchmove="mMove"
        @touchend="mEnd"
      ></canvas>
    </div>
    <div class="footer-bar">
      <div class="reset" @click="clearcanvas">重写</div>
      <div class="use" @click="getcanvas">使用</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sign",
  components: {},
  data() {
    return {
      cWidth: 1000,
      cHeight: 1000,
      ctx: null,
      point: {
        x: 0,
        y: 0,
      },
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d"); // 二维绘图
    this.ctx.strokeStyle = "#000"; // 颜色
  },
  methods: {
    // 触摸(开始)
    mStart(e) {
      let x = e.touches[0].clientX - e.target.offsetLeft,
        y = e.touches[0].clientY - e.target.offsetTop; // 获取触摸点在画板（canvas）的坐标
      this.point.x = x;
      this.point.y = y;
      this.ctx.beginPath();
      this.ctx.lineWidth = 7; // 线条宽度
      this.moving = true;
    },
    // 滑动中...
    mMove(e) {
      if (this.moving) {
        let x = e.touches[0].clientX - e.target.offsetLeft,
          y = e.touches[0].clientY - e.target.offsetTop; // 获取触摸点在画板（canvas）的坐标
        this.ctx.moveTo(this.point.x, this.point.y); // 把路径移动到画布中的指定点，不创建线条(起始点)
        this.ctx.lineTo(x, y); // 添加一个新点，然后创建从该点到画布中最后指定点的线条，不创建线条
        this.ctx.stroke(); // 绘制
        (this.point.x = x), (this.point.y = y); // 重置点坐标为上一个坐标
      }
    },
    // 滑动结束
    mEnd() {
      if (this.moving) {
        this.ctx.closePath(); // 停止绘制
        this.moving = false; // 关闭绘制开关
      }
    },

    //清除画布
    clearcanvas() {
      var ctx = document.getElementById("canvas").getContext("2d");
      //  c.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // this.$myMsg.notify({
      //   content: "画板已清空，请重新签名",
      //   type: "success",
      // });
    },

    // 判断画布内容是否为空
    isCanvasEmpty(canvas) {
      var blank = document.createElement("canvas"); //系统获取一个空canvas对象
      blank.width = canvas.width;
      blank.height = canvas.height;
      return canvas.toDataURL() == blank.toDataURL(); //比较值相等则为空
    },

    //获取绘画图片
    getcanvas() {
      //绘画转图片
      // let canvas =  document.getElementById("canvas").toDataURL("image/png");
      let canvas = document.getElementById("canvas");
      if (this.isCanvasEmpty(canvas)) {
        // alert("请绘制签名后再上传！");
        this.$myMsg.notify({
          content: "请绘制签名后再上传！",
          type: "error",
          //time: 5500
        });
        return;
      }
    //   this.convertCanvasToImage();
    console.log(this.$refs.canvas.toDataURL("image/png"))
    // 获取图片数据
    this.basedata = this.$refs.canvas.toDataURL("image/png")
    this.updataImg()
    },

    //上传图片
    async updataImg() {
     
      //此处为发送请求给后台获取图片路径
      let data = {
        code: "hand_sign/hand_img_upload",
        data: JSON.stringify({
          verifyId: "18668011733",
          handImg: this.basedata,
        }),
      };
      await this.$Axios.post("hand_sign/hand_img_upload", data).then((res) => {
        console.log(res);
        this.$myMsg.notify({
          content: "签名成功",
          type: "success",
          //time: 5500
        });
      });
    },
    

    // base64转Blob （有需要选择）
    base64ToBlob(base64Data) {
      let arr = base64Data.split(","),
        fileType = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        l = bstr.length,
        u8Arr = new Uint8Array(l);

      while (l--) {
        u8Arr[l] = bstr.charCodeAt(l);
      }
      return new Blob([u8Arr], {
        type: fileType,
      });
    },
  },
};
</script>
<style lang="css">
.boardBox {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#canvas {
  background-color: #fff;
}
.footer-bar {
  background-color: #f6fafd;
}
.footer-bar div {
  padding: 0.6rem 1.5rem;
}
.footer-bar div.reset {
  color: #333;
}
.footer-bar div.use {
  background-color: #20a0ff;
  color: #fff;
}
/*竖屏*/
@media only screen and (orientation: portrait) {
  .sign-wrap {
    display: flex;
    align-items: center;
  }
  .footer-bar {
    position: fixed;
    right: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 4rem 0;
    background-color: #f6fafd;
  }
  .footer-bar div {
    /* margin: .5rem; */
    transform: rotate(-90deg);
  }
}

/*横屏*/
@media only screen and (orientation: landscape) {
  .footer-bar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 0 0.4rem; */
    padding: 0 4rem;
    box-sizing: border-box;
  }
  .footer-bar div {
    margin: 0.8rem 0;
  }
}
</style>
