# 1.列表显示
* `v-for`指令
* 1.用于展示列表数据

* 2.语法:`v-for="(item, index) in xxx" :key="yyy"`
* 3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）
* 数组: `(item, index)`
* 对象:  `(value, key)`
* 字符串：`(char, index)`
* 数字：`(number, index)`
# 2.KEY的原理
* 1.虚拟DOM中`key`的作用:
* key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
* 2.对比规则:

* 1.旧虚拟DOM中找到了与新虚拟DOM相同的key：
  * 若虚拟DOM中内容没变, 直接使用之前的真实DOM
  * 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
* 2.旧虚拟DOM中未找到与新虚拟DOM相同的key创建新的真实DOM，随后渲染到到页面。
* 3.用`index`作为`key`可能会引发的问题:

  * 1.若对数据进行：逆序添加、逆序删除等破坏顺序操作: 会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低
  
  * 2.如果结构中还包含输入类的DOM： 会产生错误DOM更新 ==> 界面有问题
* 4.开发中如何选择`key`:
* 1.最好使用每条数据的唯一标识作为`key`, 比如id、手机号、身份证号、学号等唯一值。
* 2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用`index`作为`key`是没有问题的。
# 3.Vue监视数据的原理
* 1.vue会监视`data`中所有层次的数据。
* 2.如何检测对象中的数据?
  
**通过setter实现监视，且要在new Vue时就传入要监测的数据。**

`① 对象中后追加的属性，Vue默认不做响应式处理`

`② 如需给后添加的属性做响应式，请使用如下API：Vue.set(target，propertyName/index，value) 或 vm.$set(target，propertyName/index，value)`
* 3.如何检测数组中的数据?通过包裹数组更新元素的方法实现,本质就是做了两件事:
   * 1.调用原生对应的方法对数组进行更新
   * 2.重新解析模板,进而更新页面
* 4.在Vue修稿数组中的某个元素一定要用如下方法:
* 1.使用这些API: `push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`
* 2.`Vue.set()` 或 `vm.$set()`s

**特别注意：** Vue.set() 和 vm.$set() 不能给 vm 或 vm 的根数据对象 添加属性！！！
```js
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>总结数据监视</title>
  <style>
    button {
      margin-top: 10px;
    }
  </style>
  <!-- 引入Vue -->
  <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
  <!--

    -->
  <!-- 准备好一个容器-->
  <div id="root">
    <h1>学生信息</h1>
    <button @click="student.age++">年龄+1岁</button> <br />
    <button @click="addSex">添加性别属性，默认值：男</button> <br />
    <button @click="student.sex = '未知' ">修改性别</button> <br />
    <button @click="addFriend">在列表首位添加一个朋友</button> <br />
    <button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br />
    <button @click="addHobby">添加一个爱好</button> <br />
    <button @click="updateHobby">修改第一个爱好为：开车</button> <br />
    <button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br />
    <h3>姓名：{{student.name}}</h3>
    <h3>年龄：{{student.age}}</h3>
    <h3 v-if="student.sex">性别：{{student.sex}}</h3>
    <h3>爱好：</h3>
    <ul>
      <li v-for="(h,index) in student.hobby" :key="index">
        {{h}}
      </li>
    </ul>
    <h3>朋友们：</h3>
    <ul>
      <li v-for="(f,index) in student.friends" :key="index">
        {{f.name}}--{{f.age}}
      </li>
    </ul>
  </div>
</body>

<script type="text/javascript">
  Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

  const vm = new Vue({
    el: '#root',
    data: {
      student: {
        name: 'tom',
        age: 18,
        hobby: ['抽烟', '喝酒', '烫头'],
        friends: [{
            name: 'jerry',
            age: 35
          },
          {
            name: 'tony',
            age: 36
          }
        ]
      }
    },
    methods: {
      addSex() {
        // Vue.set(this.student,'sex','男')
        this.$set(this.student, 'sex', '男')
      },
      addFriend() {
        this.student.friends.unshift({
          name: 'jack',
          age: 70
        })
      },
      updateFirstFriendName() {
        this.student.friends[0].name = '张三'
      },
      addHobby() {
        this.student.hobby.push('学习')
      },
      updateHobby() {
        // this.student.hobby.splice(0,1,'开车')
        // Vue.set(this.student.hobby,0,'开车')
        this.$set(this.student.hobby, 0, '开车')
      },
      removeSmoke() {
        this.student.hobby = this.student.hobby.filter((h) => {
          return h !== '抽烟'
        })
      }
    }
  })
</script>

</html>
```
# 4.数组更新检测
* Vue重写了数组中的一系列改变数组内部数据的方法(先调用原生,再更新界面)
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b00184c5443b4f8d981fb822d80066d3~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)
```js
this.persons[index] = newP;
//并没有改变persons本身，数组内部发生了变化，但是没有调用变异方法，vue不会更新界面
```
* 也可以替换item
* 相比之下，也有非变更方法，例如 filter()、concat() 和 slice()。它们不会变更原始数组，而总是返回一个新数组。当使用非变更方法时，可以用新数组替换旧数组。
```js
let fpersons = persons.filter(
  p => p.name.includes(searchName)
)
```
```html
<body>
  <div id="demo">
    <h2>测试：v-for遍历数组</h2>
    <ul>
      <li v-for="(p, index) in persons" :key="index">
        {{index}}---{{p.name}}---{{p.age}}
        <button @click="deleteP(index)">删除</button>
        <button @click="updateP(index, {name:'Cat', age: 20})">更新</button>
      </li>
    </ul>

    <h2>测试：v-for遍历对象</h2>
    <ul>
      <li v-for="(value, key) in persons[1]" :key="key">
        {{value}}---{{key}}
      </li>
    </ul>

  </div>

  <script src="../js/vue.js"></script>
  <script>
    // Vue本身只是监视了persons的改变，没有监视数组内部数据的改变
    // Vue 重写了数组中的一系列改变数组内部数据的方法（先调用原生，再更新界面）
    new Vue({
      el: '#demo',
      data: {
        persons: [{
            name: 'Tom',
            age: 18
          },
          {
            name: 'Jack',
            age: 19
          },
          {
            name: 'Marry',
            age: 16
          },
          {
            name: 'Rose',
            age: 12
          },
        ]
      },
      methods: {
        deleteP(index) {
          // 删除persons中指定idnex的p（有数据绑定）
          this.persons.splice(index, 1);
        },
        updateP(index, newP) {
          // this.persons[index] = newP; //数据（数组内部）变了，界面没有变化（没有数据绑定）
          //并没有改变persons本身，数组内部发生了变化，但是没有调用变异方法，vue不会更新界面
          // this.persons = []  //界面有变化，改变了persons
          this.persons.splice(index, 1, newP);
        }
      }
    })
  </script>
</body>
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2547c14f20d84f8ab5124403c8dda069~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)
# 5.过滤与排序
* 过滤操作
* 可以使用watch也可以使用计算属性,使用计算属性更加简单方便一点
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>列表过滤</title>
  <script type="text/javascript" src="../js/vue.js"></script>
</head>

<body>
  <!-- 准备好一个容器-->
  <div id="root">
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWord">
    <ul>
      <li v-for="(p,index) of filPerons" :key="index">
        {{p.name}}-{{p.age}}-{{p.sex}}
      </li>
    </ul>
  </div>

  <script type="text/javascript">
    Vue.config.productionTip = false

    //用watch实现
    //#region 
    /* new Vue({
      el:'#root',
      data:{
        keyWord:'',
        persons:[
          {id:'001',name:'马冬梅',age:19,sex:'女'},
          {id:'002',name:'周冬雨',age:20,sex:'女'},
          {id:'003',name:'周杰伦',age:21,sex:'男'},
          {id:'004',name:'温兆伦',age:22,sex:'男'}
        ],
        filPerons:[]
      },
      watch:{
        keyWord:{
          immediate:true,
          handler(val){
            this.filPerons = this.persons.filter((p)=>{
              return p.name.indexOf(val) !== -1
            })
          }
        }
      }
    }) */
    //#endregion

    //用computed实现
    new Vue({
      el: '#root',
      data: {
        keyWord: '',
        persons: [{
            id: '001',
            name: '马冬梅',
            age: 19,
            sex: '女'
          },
          {
            id: '002',
            name: '周冬雨',
            age: 20,
            sex: '女'
          },
          {
            id: '003',
            name: '周杰伦',
            age: 21,
            sex: '男'
          },
          {
            id: '004',
            name: '温兆伦',
            age: 22,
            sex: '男'
          }
        ]
      },
      computed: {
        filPerons() {
          return this.persons.filter((p) => {
            return p.name.indexOf(this.keyWord) !== -1
          })
        }
      }
    })
  </script>

</html>
```
# 排序操作
```js
computed:{
  filPerons(){
    const arr = this.persons.filter((p)=>{
      return p.name.indexOf(this.keyWord) !== -1
    })
    //判断一下是否需要排序
    if(this.sortType){
      arr.sort((p1,p2)=>{
        return this.sortType === 1 ? p2.age-p1.age : p1.age-p2.age
      })
    }
    return arr
  }
}
```
# 例子
```html
<body>
  <div id="test">
    <input type="text" v-model="searchName">
    <ul>
      <li v-for="(p, index) in filterPersons" :key="index">
        {{index}}---{{p.name}}---{{p.age}}
      </li>
    </ul>
    <button @click="setOrderType(1)">年龄升序</button>
    <button @click="setOrderType(2)">年龄降序</button>
    <button @click="setOrderType(0)">还原顺序</button>
  </div>

  <script src="../js/vue.js"></script>

  <script>
    new Vue({
      el: '#test',
      data: {
        searchName: '',
        orderType: 0, //0代表原本， 1代表升序， 2代表降序
        persons: [{
            name: 'Tom',
            age: 10
          },
          {
            name: 'Jack',
            age: 16
          },
          {
            name: 'Rose',
            age: 12
          },
          {
            name: 'Aka',
            age: 18
          }
        ]
      },
      computed: {
        filterPersons() {
          // 1. 取出相关数据
          const {
            searchName,
            persons,
            orderType
          } = this; // 解构赋值

          let fPersons;

          // 2. 对persons进行过滤
          fPersons = persons.filter(p => p.name.indexOf(searchName) !== -1);

          // 3. 排序
          if (orderType !== 0) {
            fPersons.sort(function (p1, p2) { // 返回负数p1在前，返回正数p2在前
              if (orderType === 2) {
                return p2.age - p1.age; // 降序
              } else {
                return p1.age - p2.age; // 升序
              }
            })
          }
          return fPersons;
        }
      },
      methods: {
        setOrderType(orderType) {
          this.orderType = orderType;
        }
      }
    })
  </script>
</body>
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b738000369ee4b88bb1aafd216064946~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)