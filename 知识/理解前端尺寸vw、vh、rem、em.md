## em
* em是一个相对长度单位。相对于当前对象内文本的字体尺寸，如当前对行内文本的字体尺寸未被人设置，则相对于浏览器的默认字体尺寸。
* em的值并不是固定的
* em会继承父级元素的字体大小

## rem
* rem全名root em，简写rem，故其也是一个相对长度单位，但只相对于根元素，可以简单的通过更改根元素大小，从而调整所有字体大小。
* 只相对于根元素（html）
通过修改根元素可成比例的调整页面字体大小
其适配方案通过js脚本设置像素点来实现
其与em的基本用法是一致的，唯独不一致的是，所有元素都是相对于根元素，而不是父级元素，减少了我们的计算成本

## 总结：
* 用rem，不用em，尺寸清晰，易于维护
* 由于rem是root em，故其与em兼容性是一致的
* 均是基于像素点适配

## 移动端使用方案
* 在移动端适配方案中，使用rem时，通常与scss、less、postcss等预编译器相结合，通过定义一些函数，或者使用一些插件、使我们在开发时，依旧使用px，即设计师给我们的设计稿像素点，通过预编译期将其编译成rem单位。从而实现适配

## vw、vh
* vw（Viewport Width）
* vh(Viewport Height)
* 是基于视图窗口的单位，是css3的一部分，基于视图窗口的单位，除了vw、vh还有vmin、vmax。

* vw:1vw 等于视口宽度的1%
* Vh:1vh 等于视口高度的1%
* vmin: 选取 vw 和 vh 中最小的那个,即在手机竖屏时，1vmin=1vw
* vmax:选取 vw 和 vh 中最大的那个 ,即在手机竖屏时，1vmax=1vh
  
``Note: IE9 uses vm instead of vmin. It does not support vmax.``

* 由于使用vw、vh依赖于视图窗口，故当屏幕分辨率变大或者缩小，尺寸会进行相应的放大或者缩小，当页面足够大，或者足够小时，尺寸会变得很大或者很小，从而导致用户体验差，当然谁会用那么大或者那么小的设备呢？大多数情况下，其实可以忽略不计的，如果你是一个最求完美用户体验的人，可通过rem，对根元素设置最大最小值，配合body加上最大宽度和最小宽度
```js
// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vw_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function rem($px) {
     @return ($px / $vw_fontsize ) * 1rem;
}

// 根元素大小使用 vw 单位
$vw_design: 750;
html {
    font-size: ($vw_fontsize / ($vw_design / 2)) * 100vw; 
    // 同时，通过Media Queries 限制根元素最大最小值
    @media screen and (max-width: 320px) {
        font-size: 64px;
    }
    @media screen and (min-width: 540px) {
        font-size: 108px;
    }
}
```
```css
// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
    max-width: 540px;
    min-width: 320px;
}
```
## 移动端使用方案
* 在移动端适配方案中，我们可以通过与less、scss、postcss等预编译期相结合，通过定义一些函数或者使用一些插件，根据设计稿，定一个基准尺寸，根据这个尺寸，计算出相对应的vh、vw元素块大小。从而做到自适应适配。