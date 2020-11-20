import vue from "vue";
import Toast from "./Toast";

// 创建vue组件实例
const notify = vue.extend(Toast);

//添加通知节点(用来存放通知的元素)
let notifyWrap = document.createElement("div");
notifyWrap.className = "notify-wrap";
notifyWrap.style =
  "position: fixed; right: 0px;left：0; top: 90px; transition-duration: .5s;";
document.body.appendChild(notifyWrap);

let myMsg = {
  /**
   * 通知框
   * @content 提示内容;
   * @type 提示框类型，parameter： success，error，warning
   * @time 显示时长
   */
  notify: ({ content, type, time = 1500 }) => {
    //创建一个存放通知的div
    const notifyDom = new notify({
      el: document.createElement("div"),
      data() {
        return {
          notifyFlag: true, // 是否显示
          time: time, //取消按钮是否显示
          content: content, // 文本内容
          type: type, // 类型
          timer: "",
          timeFlag: false,
        };
      },
      watch: {
        timeFlag() {
          if (this.timeFlag) {
            this.notifyFlag = false;
            window.clearTimeout(this.timer);
          }
        },
      },
      created() {
        this.timer = setTimeout(() => {
          this.timeFlag = true;
        }, this.time);
      },
      beforeDestroy() {
        window.clearTimeout(this.timer);
      },
    });

    //往notifyWrap里面添加通知
    notifyWrap.appendChild(notifyDom.$el);
  },
};

//注册
function register() {
  vue.prototype.$myMsg = myMsg;
}
export default register;

