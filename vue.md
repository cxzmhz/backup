## MVC&MVVM 
  MVVM
  M:model 模型，提供数据
  VM: view-model 相当于控制器 负责调度
  V:view 负责呈现

  好处:低耦合 可重用性

## Vue中体现MVVM
  View : 写在id=app的div中
  View-Model : Vue实例，Vue实例中必须要有一个el属性(告诉Vue解析哪一块内容)
  Model:提供数据(来自服务器)，放在vue实例的data中
### 1. 数据绑定语法
+ 对于所有的数据绑定，vue都提供了完全的 JavaScript 表达式支持，但只能包含单个表达式，其他的都不能生效
```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>
```

### 2. vue指令

+ v-text&v-html
  - v-text 用于呈现文本
  ```html
  <span v-text="message"></span>
  ```
  - v-html 可以解析data中文本数据，如果文本数据中有标签，就会解析为html标签
+ v-on 绑定事件
```html
<button v-on:click="clickme('小红')">点击</button>
//可以简写为@
<button @dblclick="clickme('小cang')">点击</button>
```
+ v-bind 如果我们dom元素中的值不是写死，而是来自模型中的话，就必须绑定
```html
<img v-bind:src="img_url">
//可以简写为
<img :src="img_url">
```
+ v-model 表单输入绑定：在表单控件元素上创建双向数据绑定
```html
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```
+ v-if&v-show 条件渲染 如果v-if值为false，则不会渲染，而v-show会渲染，但不会显示，相当于设置了`display:none;`；
```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
<span v-show="isShow">我看得到吗?</span>
```
+ v-for 列表渲染
```js
<ul>
    <li v-for="(item,index) in persons" :key="index">
        {{index}}---{{item.name}}---{{item.age}}
    </li>
</ul>
```

+ v-bind:class :class与style绑定
```html
<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```

+ 自定义指令：
  - 全局自定指令
  ```js
  // 注册一个全局自定义指令 v-focus
  Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    //inserted为钩子函数，表示元素被插入父节点时调用
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    }
  })
  ```
  - 局部指令
  ```js
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  }
  ```

### 2.1 计算属性：computed
```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
<script>
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
</script>
```

### 3. 组件
+ 页面内的组件：定义和注册组件
```html
<template id="templateId">
    <div>
        用户名3:<input type="text" v-model="username"><br/>
        密码3:<input type="password" v-model="password"><br/>
        <button @click="login">登录3</button><br/>
    </div>
</template>
<script>

    //1.定义和注册异步到位
    /**
    * 组件使用时候的名称
    * 组件内容
    */
    Vue.component('login',{
        template:'#templateId',
        methods:{
            login:function(){
                console.log("...登录了...")
            }
        },
        data:function(){
            return {
                username:'admin',
                password:'123'
            }
        }
    })

    var vm = new Vue({
        el:"#app"
    })
</script>
```
+ 单文件组件
```html
<template>
//一定要有且只能有一个跟元素
	<div>
	</div>
</template>
<style scoped>//通过scoped定义这个样式为这个vue文件组件的私有样式

</style>
<script>
//这个vue组件文件的逻辑代码
</script>
```

### 5. 过滤器
+ 用于过滤数据
  - 私有
  ```js
  Vue.component('newslist',{
      template:'<div><ul><li>{{new1 | toUC("小红")}}</li><li>{{new2}}</li></ul></div>',
      data:function(){
          return {
              new1:"it is time for chuanqiuku",
              new2:"18th CPC Central Committee wraps up 7th plenum"
          }    
      },
      filters:{
          //这个过滤器的职责就是把传递进来的字符串转成大写
          toUC:function(input,name){
              return input.toUpperCase() + name
          }
      }
  })
  ```
  - 公有组件
  ```js
  Vue.filter('toUC',function(input,name){
      return input.toUpperCase() + "***" +name
  })
  ```

### 6. 路由 router

+ 需导入vue-router插件


+ 无参路由
```html
<body>
   <div id="app">
      <router-link to='/xjy'>♥熊金燕♥</router-link>
      <router-link to='/cxz'>♥陈学忠♥</router-link>
      <router-view></router-view>
   </div>
</body>
<script>
   var xjycom = {
      template: '<div><ul><li>sweety,i love you so much</li></ul></div>'
   }
   var cxzcom = {
      template: '<div><ul><li>i love xjy so much</li></ul></div>'
   }
   var router = new VueRouter({
      routes: [
         { path: '/', redirect: '/xjy' },
         { path: '/xjy', component: xjycom },
         { path: '/cxz', component: cxzcom }
      ]
   })
   var vm = new Vue({
      el: '#app',
      router: router
   })
</script>
```
+ 有参路由 在路由后面用冒号加参数名指明路径格式，在实际跳转路径中像普通路径一样将参数传入
```html
<body>
   <div id="app">
      <router-link to='/xjy'>熊金燕</router-link>
      <router-link to='/cxz'>陈学忠</router-link>
      <router-view></router-view>
   </div>
</body>
<script>
   var xjycom = {
      template: '<div><ul><li>sweety,i love you so much</li><li><router-link to="/life/520">in my whole life</router-link></li></ul></div>'
   }
   var cxzcom = {
      template: '<div><ul><li>i love xjy so much</li></ul></div>'
   }
   var lifecom = {
      template: '<div>love you ,too.for {{$route.params.loveId}} years</div>'
   }
   var router = new VueRouter({
      routes: [
         { path: '/', redirect: '/xjy' },
         { path: '/xjy', component: xjycom },
         { path: '/cxz', component: cxzcom },
         { path: '/life/:loveId', component: lifecom }
      ]
   })
   var vm = new Vue({
      el: '#app',
      router: router
   })
</script>
```

### 7. vue-resource 数据请求
+ 需导入vue-resource插件
+ get请求
```js
var vm = new Vue({
   el: '#app',
   methods: {
      getData: function () {
         var url = 'http://127.0.0.1:3000/login?username=zhangsan&password=123';
         this.$http.get(url).then(function (res) {
            console.log(res);
         }, function (err) {
            console.log(err);
         })
      }
   }
})
```
+ post 请求
```js
var vm = new Vue({
   el: '#app',
   methods: {
      postData: function () {
         var url = 'http://127.0.0.1:3000/postLogin';
         this.$http.post(url, { username: 'lisi', password: 'lisi' }, { emulateJSON: true }).then(function (res) {
            console.log(res);
         }, function (err) {
            console.log(err);
         })
      }
   }
})
```
+ jsonp请求
```js
var vm = new Vue({
   el: '#app',
   methods: {
      jsonpData: function () {
         var url = 'http://127.0.0.1:3000/jsonpLogin?username=laowang&password=xiaowang';
         this.$http.jsonp(url).then(function (res) {
            console.log(res);
         }, function (err) {
            console.log(err);
         })
      }
   }
})
```

### 8. 通过ref对dom操作
```js
<textarea name="" id="" ref="txtbox" placeholder="请输入评论的内容" cols="30" rows="5"></textarea>

var content = this.$refs.txtbox.value;
```

## 使用webpack构建一个vue项目
- 使用`import ... from '...'`导入框架，插件，css，包，组件
- 如果插件是vue的插件，则可以通过`vue.use(...)`将插件作为中间件使用
  > 使用`vue.use(...)`其实就是在vue的原型上添加属性和方法
  ```js
  Vue.use(VueResource);//=>Vue.prototype.$http=VueResource;
  ```
- vue存储传递数据的三种方法：
  1. 父子组件
    * 父=>子 ：props
    * 子=>父 ：子组件$emit触发事件，父组件响应事件
  2. 非父子组件
    * 有时候，非父子关系的两个组件之间也需要通信。在简单的场景下，可以使用一个空的 Vue 实例作为事件总线：
    ```js
    var bus = new Vue()
    // 触发组件 A 中的事件
    bus.$emit('id-selected', 1)
    // 在组件 B 创建的钩子中监听事件
    bus.$on('id-selected', function (id) {
      // ...
    })
    ```
  3. vuex
  ```js
  const store = new Vuex.Store({
     state: {
        goodsList: []
     },
     getters: {
        getGoodsList(state) {
           return state.goodsList;
        },
        getGoodsCount(state) {
           var count = 0;
           state.goodsList.forEach(v => {
              count += v.count;
           })
           return count;
        }

     },
     mutations: {
        getMuGoods(state, goodsObj) {
           state.goodsList.push(goodsObj);
        },
        deleteGoods(state, id) {
           state.goodsList = state.goodsList.filter(
              v => {
                 return v.id != id;
              }
           );
        }
     },
     actions: {
        getActionGoods(context, goodsObj) {
           context.commit('getMuGoods', goodsObj);
        }
     }
  })
  ```

