function animate(obj, target, callback) {
  // console.log(callback); callback = function(){}调用的时候callback()
  // 先清除以前的定时器，只保留当前的一个定时器执行
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    // 步长值写到定时器的里面
    // 把我们步长值改为整数 不要出现小数的问题
    // var step = Math.ceil((target - obj.offsetLeft) / 10);
    var step = (target - obj.offsetLeft) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.offsetLeft == target) {
      // 停止动画 本质是停止定时器
      clearInterval(obj.timer);
      // 回调函数写到定时器结束里面
      if (callback) {
        //调用函数
        callback();
      }
    }
    // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
    obj.style.left = obj.offsetLeft + step + "px";
  }, 15);
}
var span = document.querySelector("span");
var btn500 = document.querySelector(".btn500");
var btn800 = document.querySelector(".btn800");

btn500.addEventListener("click", function () {
  // 调用函数
  animate(span, 500);
});
btn800.addEventListener("click", function () {
  // 调用函数
  animate(span, 800, function () {
    //   alert("你好吗");
    span.style.backgroundColor = "red";
  });
});
// 匀速动画 就是 盒子是当前的位置 +  固定的值 10
// 缓动动画就是  盒子当前的位置 + 变化的值(目标值 - 现在的位置) / 10）
