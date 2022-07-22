* 在应用界面中, 某个(些)元素的样式是变化的，`class/style` 绑定就是专门用来实现动态样式效果的技术
# 1.`class`绑定
```js
:class='xxx' // xxx可以是字符串、对象、数组。
```
# 字符串
* 1.表达式是字符串`classA`
* 适用于: `类名不确定,要动态获取`
```js
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>绑定样式</title>
  <style>
    .basic {
      width: 400px;
      height: 100px;
      border: 1px solid black;
    }

    .happy {
      border: 4px solid red;
      ;
      background-color: rgba(255, 255, 0, 0.644);
      background: linear-gradient(30deg, yellow, pink, orange, yellow);
    }

    .sad {
      border: 4px dashed rgb(2, 197, 2);
      background-color: gray;
    }

    .normal {
      background-color: skyblue;
    }

  </style>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.js"></script>
</head>

<body>

  <!-- 准备好一个容器-->
  <div id="root">
    <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
    <div class="basic" :class="mood" @click="changeMood">{{name}}</div>
  </div>
</body>

<script type="text/javascript">
  Vue.config.productionTip = false

  const vm = new Vue({
    el: '#root',
    data: {
      name: 'YK菌',
      mood: 'normal'
    },
    methods: {
      changeMood() {
        const arr = ['happy', 'sad', 'normal']
        const index = Math.floor(Math.random() * 3)
        this.mood = arr[index]
      }
    },
  })
</script>

</html>
```
# 对象
2.表达式是对象:`{classA:isA,classB:isB}`
* 适应于:`要绑定多个样式,个数不确定,名字也不确定`
```js
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>绑定样式</title>
  <style>
    .basic {
      width: 400px;
      height: 100px;
      border: 1px solid black;
    }

    .yk1 {
      background-color: yellowgreen;
    }

    .yk2 {
      font-size: 30px;
      text-shadow: 2px 2px 10px red;
    }

    .yk3 {
      border-radius: 20px;
    }
  </style>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.js"></script>
</head>

<body>

  <!-- 准备好一个容器-->
  <div id="root">

    <!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
    <div class="basic" :class="classArr">{{name}}</div> <br /><br />

  </div>
</body>

<script type="text/javascript">
  Vue.config.productionTip = false

  const vm = new Vue({
    el: '#root',
    data: {
      name: 'YK菌',
      classArr: ['yk1', 'yk2', 'yk3']
    },
  })
</script>

</html>
```
# 数组
3.表达式是数组:`['classA','classB']`
适用于：`要绑定多个样式，个数确定，名字也确定，但不确定用不用`
```js
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>绑定样式</title>
  <style>
    .basic {
      width: 400px;
      height: 100px;
      border: 1px solid black;
    }

    .yk1 {
      background-color: yellowgreen;
    }

    .yk2 {
      font-size: 30px;
      text-shadow: 2px 2px 10px red;
    }

    .yk3 {
      border-radius: 20px;
    }
  </style>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.js"></script>
</head>

<body>

  <!-- 准备好一个容器-->
  <div id="root">

    <!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
    <div class="basic" :class="classObj">{{name}}</div>

  </div>
</body>

<script type="text/javascript">
  Vue.config.productionTip = false

  const vm = new Vue({
    el: '#root',
    data: {
      name: 'YK菌',
      classObj: {
        yk1: true,
        yk2: false,
        yk3: true
      }
    }
  })
</script>

</html>
```
# 2.`style`绑定
```js
:style="{ color: activeColor, fontSize: fontSize + 'px' }"  
```
其中`activeColor/fontSize`是data属性
```js
:style="{fontSize: xxx}"其中xxx是动态值。
:style="[a,b]"其中a、b是样式对象。
```
# 对象
```js
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>绑定样式</title>
  <style>
    .basic {
      width: 400px;
      height: 100px;
      border: 1px solid black;
    }
  </style>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.js"></script>
</head>

<body>

  <!-- 准备好一个容器-->
  <div id="root">

    <!-- 绑定style样式--对象写法 -->
    <div class="basic" :style="styleObj, styleObj2">{{name}}</div>

  </div>
</body>

<script type="text/javascript">
  Vue.config.productionTip = false

  const vm = new Vue({
    el: '#root',
    data: {
      name: 'YK菌',
      styleObj: {
        fontSize: '40px',
        color: 'red',
      },
      styleObj2: {
        backgroundColor: 'orange'
      },
    },
  })
</script>

</html>
```
# 数组
```js
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>绑定样式</title>
  <style>
    .basic {
      width: 400px;
      height: 100px;
      border: 1px solid black;
    }
  </style>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.js"></script>
</head>

<body>

  <!-- 准备好一个容器-->
  <div id="root">

    <!-- 绑定style样式--数组写法 -->
    <div class="basic" :style="styleArr">{{name}}</div>

  </div>
</body>

<script type="text/javascript">
  Vue.config.productionTip = false

  const vm = new Vue({
    el: '#root',
    data: {
      name: 'YK菌',
      styleArr: [{
          fontSize: '40px',
          color: 'blue',
        },
        {
          backgroundColor: 'gray'
        }
      ]
    },
  })
</script>

</html>
```